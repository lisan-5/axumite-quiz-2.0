export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  difficulty: Difficulty;
  explanation?: string;
  imageUrl?: string;
}

export interface QuizState {
  currentQuestion: number;
  score: number;
  isCompleted: boolean;
  userAnswers: Record<number, string>;
  difficulty: Difficulty | null;
  isDarkMode: boolean;
  timeRemaining: number;
  selectedQuestions: Question[];
}

export interface UserProgress {
  score: number;
  questionsAnswered: number;
  correctAnswers: number[];
}