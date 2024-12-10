import { useMemo } from 'react';
import { useQuizStore } from '../store/quizStore';

export const useQuizProgress = () => {
  const { currentQuestion, selectedQuestions, userAnswers } = useQuizStore();
  
  const currentQuestionData = selectedQuestions[currentQuestion];
  const totalQuestions = selectedQuestions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const calculateScore = () => {
    return Object.entries(userAnswers).reduce((score, [questionId, answer]) => {
      const question = selectedQuestions.find(q => q.id === parseInt(questionId));
      return score + (question?.correctAnswer === answer ? 1 : 0);
    }, 0);
  };

  return {
    currentQuestionData,
    totalQuestions,
    progress,
    calculateScore,
    selectedQuestions,
  };
};