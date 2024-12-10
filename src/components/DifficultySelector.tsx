import React from 'react';
import { motion } from 'framer-motion';
import { useQuizStore } from '../store/quizStore';
import { Trophy, Book, Lightbulb } from 'lucide-react';

const difficulties = [
  {
    level: 'easy',
    label: 'Beginner',
    description: 'Start your journey',
    icon: Lightbulb,
    color: 'bg-emerald-500 hover:bg-emerald-600',
    iconColor: 'text-emerald-100'
  },
  {
    level: 'medium',
    label: 'Scholar',
    description: 'Test your knowledge',
    icon: Book,
    color: 'bg-yellow-500 hover:bg-yellow-600',
    iconColor: 'text-yellow-100'
  },
  {
    level: 'hard',
    label: 'Expert',
    description: 'Master the challenge',
    icon: Trophy,
    color: 'bg-red-500 hover:bg-red-600',
    iconColor: 'text-red-100'
  }
] as const;

export const DifficultySelector: React.FC = () => {
  const { setDifficulty } = useQuizStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-6xl mx-auto px-4"
    >
      <h2 className="text-2xl font-bold text-center mb-8 text-amber-100">
        Choose Your Challenge Level
      </h2>
      <div className="flex flex-col md:flex-row gap-6">
        {difficulties.map(({ level, label, description, icon: Icon, color, iconColor }) => (
          <motion.button
            key={level}
            onClick={() => setDifficulty(level)}
            className={`${color} rounded-xl p-4 md:p-10 text-white shadow-lg transform transition-all duration-300 hover:scale-105 flex-1`}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex flex-row md:flex-col items-center text-center space-x-3 md:space-x-0 md:space-y-6">
              <div className={`p-4 rounded-full ${iconColor} bg-opacity-20`}>
                <Icon size={40} />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-2">{label}</h3>
                <p className="text-sm md:text-base opacity-90 hidden md:block">{description}</p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};