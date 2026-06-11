import { BadRequestException, Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { mkdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { DatabaseService } from '../database.service';
import { CreateLearningHistoryInput, LearningHistoryRecord } from './learning-history.types';

type DbLearningHistoryRow = {
  id: string;
  user_id: string;
  topic_id: string | null;
  level_id: string | null;
  section_id: string | null;
  lesson_id: string | null;
  day_id: string;
  topic_title: string | null;
  level_title: string | null;
  section_title: string | null;
  lesson_title: string | null;
  day_title: string | null;
  correct_count: number;
  answered_count: number;
  total_count: number;
  accuracy: number;
  duration_seconds: number;
  completed_at: string;
  created_at: string;
};

@Injectable()
export class LearningHistoryService {
  private readonly historyFile = join(process.cwd(), 'data', 'learning-history.json');

  constructor(private readonly database: DatabaseService) {}

  async list(userId: string): Promise<LearningHistoryRecord[]> {
    if (this.database.enabled) {
      const rows = await this.database.query<DbLearningHistoryRow>(
        `select *
         from learning_history
         where user_id = $1
         order by completed_at desc, created_at desc
         limit 80`,
        [userId],
      );
      return rows.map((row) => this.fromDb(row));
    }

    const records = await this.readLocalHistory();
    return records
      .filter((record) => record.userId === userId)
      .sort((first, second) => new Date(second.completedAt).getTime() - new Date(first.completedAt).getTime())
      .slice(0, 80);
  }

  async create(userId: string, input: CreateLearningHistoryInput): Promise<LearningHistoryRecord> {
    const dayId = this.cleanText(input.dayId);
    if (!dayId) {
      throw new BadRequestException('dayId is required.');
    }

    const answered = this.cleanCount(input.answered);
    const correct = Math.min(this.cleanCount(input.correct), answered);
    const total = Math.max(this.cleanCount(input.total), answered);
    const accuracy = Math.max(0, Math.min(100, Number.isFinite(Number(input.accuracy)) ? Math.round(Number(input.accuracy)) : Math.round((correct / Math.max(1, answered)) * 100)));
    const completedAt = this.validDate(input.completedAt) || new Date().toISOString();

    const record: LearningHistoryRecord = {
      id: this.id(),
      userId,
      topicId: this.cleanText(input.topicId),
      levelId: this.cleanText(input.levelId),
      sectionId: this.cleanText(input.sectionId),
      lessonId: this.cleanText(input.lessonId),
      dayId,
      topicTitle: this.cleanText(input.topicTitle),
      levelTitle: this.cleanText(input.levelTitle),
      sectionTitle: this.cleanText(input.sectionTitle),
      lessonTitle: this.cleanText(input.lessonTitle),
      dayTitle: this.cleanText(input.dayTitle),
      correct,
      answered,
      total,
      accuracy,
      durationSeconds: Math.max(0, Math.round(Number(input.durationSeconds) || 0)),
      completedAt,
      createdAt: new Date().toISOString(),
    };

    if (this.database.enabled) {
      await this.database.query(
        `insert into learning_history (
          id, user_id, topic_id, level_id, section_id, lesson_id, day_id,
          topic_title, level_title, section_title, lesson_title, day_title,
          correct_count, answered_count, total_count, accuracy, duration_seconds, completed_at, created_at
        )
        values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)`,
        [
          record.id,
          record.userId,
          record.topicId || null,
          record.levelId || null,
          record.sectionId || null,
          record.lessonId || null,
          record.dayId,
          record.topicTitle || null,
          record.levelTitle || null,
          record.sectionTitle || null,
          record.lessonTitle || null,
          record.dayTitle || null,
          record.correct,
          record.answered,
          record.total,
          record.accuracy,
          record.durationSeconds,
          record.completedAt,
          record.createdAt,
        ],
      );
      return record;
    }

    const records = await this.readLocalHistory();
    records.unshift(record);
    await this.writeLocalHistory(records.slice(0, 500));
    return record;
  }

  private async readLocalHistory(): Promise<LearningHistoryRecord[]> {
    try {
      const records = JSON.parse(await readFile(this.historyFile, 'utf8')) as LearningHistoryRecord[];
      return Array.isArray(records) ? records : [];
    } catch {
      return [];
    }
  }

  private async writeLocalHistory(records: LearningHistoryRecord[]): Promise<void> {
    await mkdir(join(process.cwd(), 'data'), { recursive: true });
    await writeFile(this.historyFile, JSON.stringify(records, null, 2), 'utf8');
  }

  private fromDb(row: DbLearningHistoryRow): LearningHistoryRecord {
    return {
      id: row.id,
      userId: row.user_id,
      topicId: row.topic_id || undefined,
      levelId: row.level_id || undefined,
      sectionId: row.section_id || undefined,
      lessonId: row.lesson_id || undefined,
      dayId: row.day_id,
      topicTitle: row.topic_title || undefined,
      levelTitle: row.level_title || undefined,
      sectionTitle: row.section_title || undefined,
      lessonTitle: row.lesson_title || undefined,
      dayTitle: row.day_title || undefined,
      correct: Number(row.correct_count) || 0,
      answered: Number(row.answered_count) || 0,
      total: Number(row.total_count) || 0,
      accuracy: Number(row.accuracy) || 0,
      durationSeconds: Number(row.duration_seconds) || 0,
      completedAt: row.completed_at,
      createdAt: row.created_at,
    };
  }

  private cleanText(value: unknown): string {
    return String(value || '').trim().slice(0, 300);
  }

  private cleanCount(value: unknown): number {
    return Math.max(0, Math.round(Number(value) || 0));
  }

  private validDate(value: unknown): string {
    const date = new Date(String(value || ''));
    return Number.isNaN(date.getTime()) ? '' : date.toISOString();
  }

  private id(): string {
    return `history-${Date.now().toString(36)}-${randomBytes(4).toString('hex')}`;
  }
}
