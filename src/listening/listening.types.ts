export interface ListeningAudioItem {
  url: string;
  fileName?: string;
  answerIndex?: number;
}

export interface ListeningTrack {
  id: string;
  title: string;
  subtitle: string;
  questionType?: 'trueFalse' | 'image' | 'multiAudio' | 'shortConversation';
  mode: string;
  text: string;
  pinyin: string;
  vietnamese: string;
  prompt: string;
  options: string[];
  optionImages?: string[];
  answerIndex: number;
  keyword: string;
  imageUrl?: string;
  imageAlt?: string;
  audioUrl?: string;
  audioFileName?: string;
  audioItems?: ListeningAudioItem[];
}

export interface ListeningDay {
  id: string;
  title: string;
  description: string;
  tracks: ListeningTrack[];
}

export interface ListeningLesson {
  id: string;
  title: string;
  description: string;
  level: string;
  goal: string;
  days?: ListeningDay[];
  tracks?: ListeningTrack[];
}

export interface ListeningSection {
  id: string;
  title: string;
  description: string;
  icon: string;
  lessons: ListeningLesson[];
}

export interface ListeningLevel {
  id: string;
  title: string;
  description: string;
  sections: ListeningSection[];
}

export interface ListeningTopic {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  levels?: ListeningLevel[];
  sections?: ListeningSection[];
}
