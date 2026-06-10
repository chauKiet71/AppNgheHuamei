export interface ListeningTrack {
  id: string;
  title: string;
  subtitle: string;
  mode: string;
  text: string;
  pinyin: string;
  vietnamese: string;
  prompt: string;
  options: string[];
  answerIndex: number;
  keyword: string;
  audioUrl?: string;
  audioFileName?: string;
}

export interface ListeningLesson {
  id: string;
  title: string;
  description: string;
  level: string;
  goal: string;
  tracks: ListeningTrack[];
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
