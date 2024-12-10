import { useEffect, useCallback } from 'react';
import { useQuizStore } from '../store/quizStore';

export const useTimer = (onTimeUp: () => void) => {
  const { timeRemaining, setTimeRemaining } = useQuizStore();

  const startTimer = useCallback(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev: number) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 10; // Reset timer for next question
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [setTimeRemaining, onTimeUp]);

  useEffect(() => {
    const cleanup = startTimer();
    return cleanup;
  }, [startTimer]);

  return timeRemaining;
};