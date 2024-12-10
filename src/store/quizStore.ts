import { create } from 'zustand';
import { Difficulty, QuizState, Question } from '../types/quiz';
import { questions } from '../data/questions';

const QUESTIONS_PER_SESSION = 10;
const TIME_PER_QUESTION = 10;

const selectRandomQuestions = (difficulty: Difficulty): Question[] => {
  const filteredQuestions = questions.filter(q => q.difficulty === difficulty);
  const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, QUESTIONS_PER_SESSION);
};

interface QuizStore extends QuizState {
  setAnswer: (questionId: number, answer: string) => void;
  nextQuestion: () => void;
  resetQuiz: () => void;
  completeQuiz: () => void;
  setDifficulty: (difficulty: Difficulty) => void;
  setTimeRemaining: (updater: number | ((prev: number) => number)) => void;
}

export const useQuizStore = create<QuizStore>((set) => ({
  currentQuestion: 0,
  score: 0,
  isCompleted: false,
  userAnswers: {},
  difficulty: null,
  isDarkMode: false,
  timeRemaining: TIME_PER_QUESTION,
  selectedQuestions: [],

  setAnswer: (questionId, answer) =>
    set((state) => ({
      userAnswers: { ...state.userAnswers, [questionId]: answer },
      timeRemaining: TIME_PER_QUESTION,
    })),

  nextQuestion: () =>
    set((state) => ({
      currentQuestion: state.currentQuestion + 1,
      timeRemaining: TIME_PER_QUESTION,
    })),

  completeQuiz: () =>
    set(() => ({
      isCompleted: true,
    })),

  resetQuiz: () =>
    set(() => ({
      currentQuestion: 0,
      score: 0,
      isCompleted: false,
      userAnswers: {},
      difficulty: null,
      timeRemaining: TIME_PER_QUESTION,
      selectedQuestions: [],
    })),

  setDifficulty: (difficulty) =>
    set(() => ({
      difficulty,
      currentQuestion: 0,
      score: 0,
      isCompleted: false,
      userAnswers: {},
      timeRemaining: TIME_PER_QUESTION,
      selectedQuestions: selectRandomQuestions(difficulty),
    })),

  setTimeRemaining: (updater) =>
    set((state) => ({
      timeRemaining: typeof updater === 'function' ? updater(state.timeRemaining) : updater,
    })),
}));