import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeStore } from '../store/themeStore';
import { Question } from '../types/quiz';

interface QuizCardProps {
  question: Question;
  onAnswer: (answer: string) => void;
}

export const QuizCard: React.FC<QuizCardProps> = ({ question, onAnswer }) => {
  const { isDarkMode } = useThemeStore();

  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const optionVariants = {
    initial: { opacity: 0, x: -20 },
    animate: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1 }
    }),
    hover: {
      scale: 1.02,
      backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.9)',
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl"
      >
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xl md:text-2xl font-semibold mb-6 text-white"
        >
          {question.question}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {question.options.map((option, index) => (
            <motion.button
              key={option}
              variants={optionVariants}
              custom={index}
              initial="initial"
              animate="animate"
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
              onClick={() => onAnswer(option)}
              className="p-4 text-left rounded-lg bg-white/5 text-white hover:text-black transition-colors"
            >
              {option}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};