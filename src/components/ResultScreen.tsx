import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Crown, Star, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ResultScreenProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  score,
  totalQuestions,
  onRestart,
}) => {
  useEffect(() => {
    if (score >= 4) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(interval);
          return;
        }

        // Customize confetti based on score
        const particleCount = score === 10 ? 150 : score * 10;
        const spread = score === 10 ? 360 : 180;
        const startVelocity = score === 10 ? 45 : 30;

        confetti({
          particleCount,
          startVelocity,
          spread,
          origin: {
            x: randomInRange(0.1, 0.9),
            y: Math.random() - 0.2,
          },
          colors: score === 10 ? 
            ['#FFD700', '#FFA500', '#FF4500'] : // Gold theme for perfect score
            ['#00ff00', '#0099ff', '#ff3399'], // Regular colors for other passing scores
          shapes: score === 10 ? ['star', 'circle'] : ['circle'],
        });
      }, score === 10 ? 100 : 250); // More frequent confetti for perfect score
    }
  }, [score]);

  const getMessage = () => {
    if (score === 10) return { text: "Perfect Score! You're a Master!", icon: Crown, color: 'text-yellow-500' };
    if (score >= 8) return { text: "Excellent Work! Almost Perfect!", icon: Star, color: 'text-yellow-400' };
    if (score >= 6) return { text: "Great Job! Well Done!", icon: Star, color: 'text-blue-400' };
    if (score >= 4) return { text: "Good Effort! Keep Learning!", icon: Award, color: 'text-green-400' };
    return { text: "Keep Practicing! You'll Get Better!", icon: Award, color: 'text-amber-400' };
  };

  const { text, icon: Icon, color } = getMessage();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-br from-amber-500/20 to-purple-500/20 backdrop-blur-lg rounded-xl p-8 max-w-md w-full mx-auto text-center shadow-2xl border border-white/10"
    >
      <Icon className={`w-16 h-16 mx-auto mb-4 ${color}`} />
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-2xl font-bold mb-4 text-white"
      >
        {text}
      </motion.h2>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
        className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-amber-600 bg-clip-text text-transparent mb-4"
      >
        {score} / {totalQuestions}
      </motion.div>
      <motion.button
        onClick={onRestart}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
      >
        Try Again
      </motion.button>
    </motion.div>
  );
};