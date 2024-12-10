import React from 'react';
import { motion } from 'framer-motion';
import { useTimer } from '../hooks/useTimer';

interface TimerProps {
  onTimeUp: () => void;
}

export const Timer: React.FC<TimerProps> = ({ onTimeUp }) => {
  const timeRemaining = useTimer(onTimeUp);

  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (circumference * timeRemaining) / 10;

  const timerVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={timerVariants}
      initial="initial"
      animate="animate"
      className="flex justify-center items-center mb-4"
    >
      <div className="relative w-20 h-20">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="5"
          />
          <motion.circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke={timeRemaining <= 3 ? '#ef4444' : '#f59e0b'}
            strokeWidth="5"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ duration: 0.5 }}
          />
        </svg>
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={timeRemaining <= 3 ? {
            scale: [1, 1.2, 1],
            transition: { repeat: Infinity, duration: 0.5 }
          } : {}}
        >
          <span className={`text-2xl font-bold ${
            timeRemaining <= 3 ? 'text-red-500' : 'text-amber-400'
          }`}>
            {timeRemaining}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};