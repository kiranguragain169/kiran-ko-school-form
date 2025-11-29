export interface StudentInput {
  firstName: string;
  lastName: string;
  birthDate: string; // YYYY-MM-DD
  major: string;
  gpa: number;
  bio: string;
}

export interface AIEnhancement {
  archetype: string;
  careerSuggestions: string[];
  studyTips: string[];
  summary: string;
}

export interface Student extends StudentInput {
  id: string;
  age: number; // Derived from birthDate
  createdAt: number;
  aiAnalysis?: AIEnhancement;
}

export enum AppStatus {
  IDLE = 'IDLE',
  PROCESSING = 'PROCESSING',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
}