import React from 'react';
import { motion } from 'framer-motion';
import { useQuizStore } from '../store/quizStore';
import { Check, X } from 'lucide-react';

interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const { userAnswers, selectedQuestions } = useQuizStore();

  const getSegmentStatus = (index: number) => {
    const question = selectedQuestions[index];
    if (!question) return { color: 'bg-white/20', icon: null };
    
    const answer = userAnswers[question.id];
    if (!answer) return { color: 'bg-white/20', icon: null };
    
    return answer === question.correctAnswer 
      ? { color: 'bg-green-500', icon: Check }
      : { color: 'bg-red-500', icon: X };
  };

  return (
    <div className="w-full mb-6">
      <div className="grid grid-cols-10 gap-2">
        {Array.from({ length: total }).map((_, index) => {
          const { color, icon: Icon } = getSegmentStatus(index);
          return (
            <motion.div
              key={index}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                backgroundColor: index < current ? color : 'rgba(255,255,255,0.2)'
              }}
              transition={{ delay: index * 0.1 }}
              className={`h-2 rounded-full relative ${
                index === current - 1 ? 'animate-pulse' : ''
              }`}
            >
              {Icon && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                >
                  <Icon className="w-4 h-4 text-white" />
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
      <div className="flex justify-between mt-4 text-sm text-white/80">
        <span>Question {current} of {total}</span>
      </div>
    </div>
  );
};