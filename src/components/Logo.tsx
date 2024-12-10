import React from 'react';
import { motion } from 'framer-motion';

export const Logo: React.FC = () => {
  const letterVariants = {
    initial: { y: -20, opacity: 0 },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    }),
    hover: {
      scale: 1.1,
      y: -5,
      transition: {
        duration: 0.3,
        yoyo: Infinity
      }
    }
  };

  const underlineVariants = {
    initial: { scaleX: 0 },
    animate: { 
      scaleX: 1,
      transition: {
        delay: 0.8,
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      scaleX: 1.1,
      transition: {
        duration: 0.3
      }
    }
  };

  const letters = "Ligator".split("");

  return (
    <motion.div 
      className="flex flex-col items-center justify-center mb-6"
      whileHover="hover"
    >
      <div className="flex justify-center">
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={letterVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="inline-block font-dancing text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-amber-500 via-yellow-500 to-yellow-300 text-transparent bg-clip-text cursor-pointer"
            style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}
          >
            {letter}
          </motion.span>
        ))}
      </div>
      <motion.div
        variants={underlineVariants}
        initial="initial"
        animate="animate"
        className="h-1 bg-gradient-to-r from-amber-500 via-yellow-500 to-yellow-300 rounded-full mt-2"
        style={{ width: '80%' }}
      />
    </motion.div>
  );
};