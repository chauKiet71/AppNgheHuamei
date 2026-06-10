import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database.service';
import { listeningTopics } from './listening.data';
import { ListeningLesson, ListeningLevel, ListeningSection, ListeningTopic, ListeningTrack } from './listening.types';

type TopicInput = Partial<Omit<ListeningTopic, 'levels' | 'sections'>> & {
  levels?: ListeningLevel[];
  sections?: ListeningSection[];
};
type LevelInput = Partial<Omit<ListeningLevel, 'sections'>> & { sections?: ListeningSection[] };
type SectionInput = Partial<Omit<ListeningSection, 'lessons'>> & { lessons?: ListeningLesson[] };
type LessonInput = Partial<Omit<ListeningLesson, 'tracks'>> & { tracks?: ListeningTrack[] };
type TrackInput = Partial<ListeningTrack>;
type TopicRow = { id: string; data: ListeningTopic };

@Injectable()
export class ListeningService {
  private seeded = false;

  constructor(private readonly database: DatabaseService) {}

  async getTopics(): Promise<ListeningTopic[]> {
    return this.loadTopics();
  }

  async getTopic(topicId: string): Promise<ListeningTopic> {
    const topic = (await this.loadTopics()).find((item) => item.id === topicId);
    if (!topic) {
      throw new NotFoundException('Topic not found');
    }
    return topic;
  }

  async getSection(topicId: string, sectionId: string): Promise<ListeningSection> {
    const topic = await this.getTopic(topicId);
    return this.findSectionInTopic(topic, sectionId);
  }

  async getLevel(topicId: string, levelId: string): Promise<ListeningLevel> {
    const topic = await this.getTopic(topicId);
    return this.findLevel(topic, levelId);
  }

  async getLesson(topicId: string, sectionId: string, lessonId: string): Promise<ListeningLesson> {
    const section = await this.getSection(topicId, sectionId);
    const lesson = section.lessons.find((item) => item.id === lessonId);
    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }
    return lesson;
  }

  async createTopic(input: TopicInput): Promise<ListeningTopic> {
    const topic: ListeningTopic = {
      id: this.uniqueId(input.id || input.title || 'topic'),
      title: input.title || 'Chủ đề mới',
      subtitle: input.subtitle || 'Lộ trình nghe',
      description: input.description || 'Mô tả chủ đề nghe.',
      icon: input.icon || 'book',
      levels: input.levels || [
        {
          id: this.uniqueId('level'),
          title: 'HSK3',
          description: 'Cấp độ luyện nghe',
          sections: input.sections || [],
        },
      ],
    };
    const topics = await this.loadTopics();
    topics.unshift(topic);
    await this.saveAllTopics(topics);
    return topic;
  }

  async updateTopic(topicId: string, input: TopicInput): Promise<ListeningTopic> {
    const topics = await this.loadTopics();
    const topic = this.findTopic(topics, topicId);
    Object.assign(topic, this.clean(input, ['levels', 'sections']));
    await this.saveTopic(topic, topics.indexOf(topic));
    return topic;
  }

  async createLevel(topicId: string, input: LevelInput): Promise<ListeningLevel> {
    const topics = await this.loadTopics();
    const topic = this.findTopic(topics, topicId);
    const level: ListeningLevel = {
      id: this.uniqueId(input.id || input.title || 'level'),
      title: input.title || 'Cấp độ mới',
      description: input.description || 'Mô tả cấp độ.',
      sections: input.sections || [],
    };
    topic.levels = topic.levels || [];
    topic.levels.unshift(level);
    await this.saveTopic(topic, topics.indexOf(topic));
    return level;
  }

  async updateLevel(topicId: string, levelId: string, input: LevelInput): Promise<ListeningLevel> {
    const topics = await this.loadTopics();
    const topic = this.findTopic(topics, topicId);
    const level = this.findLevel(topic, levelId);
    Object.assign(level, this.clean(input, ['sections']));
    await this.saveTopic(topic, topics.indexOf(topic));
    return level;
  }

  async deleteLevel(topicId: string, levelId: string): Promise<{ deleted: true }> {
    const topics = await this.loadTopics();
    const topic = this.findTopic(topics, topicId);
    const index = (topic.levels || []).findIndex((item) => item.id === levelId);
    if (index < 0) {
      throw new NotFoundException('Level not found');
    }
    topic.levels?.splice(index, 1);
    await this.saveTopic(topic, topics.indexOf(topic));
    return { deleted: true };
  }

  async deleteTopic(topicId: string): Promise<{ deleted: true }> {
    const topics = await this.loadTopics();
    const index = topics.findIndex((item) => item.id === topicId);
    if (index < 0) {
      throw new NotFoundException('Topic not found');
    }
    topics.splice(index, 1);
    await this.deleteTopicById(topicId);
    await this.saveAllTopics(topics);
    return { deleted: true };
  }

  async createSection(topicId: string, input: SectionInput, levelId?: string): Promise<ListeningSection> {
    const topics = await this.loadTopics();
    const topic = this.findTopic(topics, topicId);
    const level = levelId ? this.findLevel(topic, levelId) : this.ensureFirstLevel(topic);
    const section: ListeningSection = {
      id: this.uniqueId(input.id || input.title || 'section'),
      title: input.title || 'Lộ trình mới',
      description: input.description || 'Mô tả lộ trình.',
      icon: input.icon || 'book',
      lessons: input.lessons || [],
    };
    level.sections.unshift(section);
    await this.saveTopic(topic, topics.indexOf(topic));
    return section;
  }

  async updateSection(topicId: string, sectionId: string, input: SectionInput): Promise<ListeningSection> {
    const topics = await this.loadTopics();
    const topic = this.findTopic(topics, topicId);
    const section = this.findSectionInTopic(topic, sectionId);
    Object.assign(section, this.clean(input, ['lessons']));
    await this.saveTopic(topic, topics.indexOf(topic));
    return section;
  }

  async deleteSection(topicId: string, sectionId: string): Promise<{ deleted: true }> {
    const topics = await this.loadTopics();
    const topic = this.findTopic(topics, topicId);
    for (const level of topic.levels || []) {
      const index = level.sections.findIndex((item) => item.id === sectionId);
      if (index >= 0) {
        level.sections.splice(index, 1);
        await this.saveTopic(topic, topics.indexOf(topic));
        return { deleted: true };
      }
    }
    throw new NotFoundException('Section not found');
  }

  async createLesson(topicId: string, sectionId: string, input: LessonInput): Promise<ListeningLesson> {
    const topics = await this.loadTopics();
    const topic = this.findTopic(topics, topicId);
    const section = this.findSectionInTopic(topic, sectionId);
    const lesson: ListeningLesson = {
      id: this.uniqueId(input.id || input.title || 'lesson'),
      title: input.title || 'Bộ đề mới',
      description: input.description || 'Mô tả bộ đề.',
      level: input.level || 'HSK3',
      goal: input.goal || 'Luyện nghe',
      tracks: input.tracks || [],
    };
    section.lessons.unshift(lesson);
    await this.saveTopic(topic, topics.indexOf(topic));
    return lesson;
  }

  async updateLesson(topicId: string, sectionId: string, lessonId: string, input: LessonInput): Promise<ListeningLesson> {
    const topics = await this.loadTopics();
    const topic = this.findTopic(topics, topicId);
    const lesson = this.findLesson(this.findSectionInTopic(topic, sectionId), lessonId);
    Object.assign(lesson, this.clean(input, ['tracks']));
    await this.saveTopic(topic, topics.indexOf(topic));
    return lesson;
  }

  async deleteLesson(topicId: string, sectionId: string, lessonId: string): Promise<{ deleted: true }> {
    const topics = await this.loadTopics();
    const topic = this.findTopic(topics, topicId);
    const section = this.findSectionInTopic(topic, sectionId);
    const index = section.lessons.findIndex((item) => item.id === lessonId);
    if (index < 0) {
      throw new NotFoundException('Lesson not found');
    }
    section.lessons.splice(index, 1);
    await this.saveTopic(topic, topics.indexOf(topic));
    return { deleted: true };
  }

  async createTrack(topicId: string, sectionId: string, lessonId: string, input: TrackInput): Promise<ListeningTrack> {
    const topics = await this.loadTopics();
    const topic = this.findTopic(topics, topicId);
    const lesson = this.findLesson(this.findSectionInTopic(topic, sectionId), lessonId);
    const track = this.normalizeTrack(input);
    lesson.tracks.push(track);
    await this.saveTopic(topic, topics.indexOf(topic));
    return track;
  }

  async updateTrack(
    topicId: string,
    sectionId: string,
    lessonId: string,
    trackId: string,
    input: TrackInput,
  ): Promise<ListeningTrack> {
    const topics = await this.loadTopics();
    const topic = this.findTopic(topics, topicId);
    const track = this.findTrack(this.findLesson(this.findSectionInTopic(topic, sectionId), lessonId), trackId);
    Object.assign(track, this.clean(input));
    this.validateTrack(track);
    await this.saveTopic(topic, topics.indexOf(topic));
    return track;
  }

  async deleteTrack(topicId: string, sectionId: string, lessonId: string, trackId: string): Promise<{ deleted: true }> {
    const topics = await this.loadTopics();
    const topic = this.findTopic(topics, topicId);
    const lesson = this.findLesson(this.findSectionInTopic(topic, sectionId), lessonId);
    const index = lesson.tracks.findIndex((item) => item.id === trackId);
    if (index < 0) {
      throw new NotFoundException('Question not found');
    }
    lesson.tracks.splice(index, 1);
    await this.saveTopic(topic, topics.indexOf(topic));
    return { deleted: true };
  }

  async attachTrackAudio(
    topicId: string,
    sectionId: string,
    lessonId: string,
    trackId: string,
    audio: { fileName: string; url: string },
  ): Promise<ListeningTrack> {
    const topics = await this.loadTopics();
    const topic = this.findTopic(topics, topicId);
    const track = this.findTrack(this.findLesson(this.findSectionInTopic(topic, sectionId), lessonId), trackId);
    track.audioFileName = audio.fileName;
    track.audioUrl = audio.url;
    await this.saveTopic(topic, topics.indexOf(topic));
    return track;
  }

  private async loadTopics(): Promise<ListeningTopic[]> {
    if (!this.database.enabled) {
      return listeningTopics.map((topic) => this.normalizeTopic(topic));
    }

    await this.seedIfNeeded();
    const rows = await this.database.query<TopicRow>('select id, data from listening_topics order by position asc, created_at asc');
    return rows.map((row) => this.normalizeTopic(row.data));
  }

  private async seedIfNeeded(): Promise<void> {
    if (this.seeded || !this.database.enabled) {
      return;
    }

    const [{ count }] = await this.database.query<{ count: string }>('select count(*) from listening_topics');
    if (Number(count) === 0) {
      await this.saveAllTopics(listeningTopics);
    }
    this.seeded = true;
  }

  private async saveAllTopics(topics: ListeningTopic[]): Promise<void> {
    if (!this.database.enabled) {
      listeningTopics.splice(0, listeningTopics.length, ...topics);
      return;
    }

    await Promise.all(topics.map((topic, index) => this.saveTopic(topic, index)));
  }

  private async saveTopic(topic: ListeningTopic, position: number): Promise<void> {
    const normalizedTopic = this.normalizeTopic(topic);
    if (!this.database.enabled) {
      return;
    }

    await this.database.query(
      `
      insert into listening_topics (id, position, data, updated_at)
      values ($1, $2, $3::jsonb, now())
      on conflict (id)
      do update set position = excluded.position, data = excluded.data, updated_at = now()
      `,
      [normalizedTopic.id, position, JSON.stringify(normalizedTopic)],
    );
  }

  private async deleteTopicById(topicId: string): Promise<void> {
    if (!this.database.enabled) {
      return;
    }

    await this.database.query('delete from listening_topics where id = $1', [topicId]);
  }

  private normalizeTrack(input: TrackInput): ListeningTrack {
    const track: ListeningTrack = {
      id: this.uniqueId(input.id || input.title || 'question'),
      title: input.title || 'Câu hỏi mới',
      subtitle: input.subtitle || 'Câu nghe',
      mode: input.mode || 'Chọn nghĩa',
      text: input.text || '你好。',
      pinyin: input.pinyin || 'ni hao.',
      vietnamese: input.vietnamese || 'Xin chào.',
      prompt: input.prompt || 'Người nói muốn diễn đạt điều gì?',
      options: input.options?.length ? input.options : ['Đáp án A', 'Đáp án B', 'Đáp án C', 'Đáp án D'],
      answerIndex: input.answerIndex ?? 0,
      keyword: input.keyword || '你好',
      audioUrl: input.audioUrl,
      audioFileName: input.audioFileName,
    };
    this.validateTrack(track);
    return track;
  }

  private validateTrack(track: ListeningTrack): void {
    if (!track.options.length) {
      throw new BadRequestException('Question options are required');
    }
    if (track.answerIndex < 0 || track.answerIndex >= track.options.length) {
      throw new BadRequestException('answerIndex is out of option range');
    }
  }

  private normalizeTopic(topic: ListeningTopic): ListeningTopic {
    if (topic.levels?.length) {
      return {
        ...topic,
        levels: topic.levels.map((level) => ({
          ...level,
          sections: level.sections || [],
        })),
        sections: undefined,
      };
    }

    const fallbackTitle = topic.id === 'hsk' ? 'HSK3' : 'Cơ bản';
    return {
      ...topic,
      levels: [
        {
          id: `${topic.id}-default-level`,
          title: fallbackTitle,
          description: topic.subtitle || 'Cấp độ luyện nghe',
          sections: topic.sections || [],
        },
      ],
      sections: undefined,
    };
  }

  private findTopic(topics: ListeningTopic[], topicId: string): ListeningTopic {
    const topic = topics.find((item) => item.id === topicId);
    if (!topic) {
      throw new NotFoundException('Topic not found');
    }
    return topic;
  }

  private findLevel(topic: ListeningTopic, levelId: string): ListeningLevel {
    const level = (topic.levels || []).find((item) => item.id === levelId);
    if (!level) {
      throw new NotFoundException('Level not found');
    }
    return level;
  }

  private ensureFirstLevel(topic: ListeningTopic): ListeningLevel {
    topic.levels = topic.levels?.length ? topic.levels : this.normalizeTopic(topic).levels;
    if (!topic.levels?.length) {
      throw new NotFoundException('Level not found');
    }
    return topic.levels[0];
  }

  private findSectionInTopic(topic: ListeningTopic, sectionId: string): ListeningSection {
    for (const level of topic.levels || []) {
      const section = level.sections.find((item) => item.id === sectionId);
      if (section) {
        return section;
      }
    }
    throw new NotFoundException('Section not found');
  }

  private findLesson(section: ListeningSection, lessonId: string): ListeningLesson {
    const lesson = section.lessons.find((item) => item.id === lessonId);
    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }
    return lesson;
  }

  private findTrack(lesson: ListeningLesson, trackId: string): ListeningTrack {
    const track = lesson.tracks.find((item) => item.id === trackId);
    if (!track) {
      throw new NotFoundException('Question not found');
    }
    return track;
  }

  private uniqueId(seed: string): string {
    const slug = seed
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 36);
    return `${slug || 'item'}-${Date.now().toString(36)}`;
  }

  private clean<T extends Record<string, unknown>>(input: T, blocked: string[] = []): Partial<T> {
    return Object.fromEntries(
      Object.entries(input).filter(([, value]) => value !== undefined).filter(([key]) => !blocked.includes(key)),
    ) as Partial<T>;
  }
}
