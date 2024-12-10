import React from 'react';
import { motion } from 'framer-motion';

export const Footer: React.FC = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="text-center py-4 mt-auto"
    >
      <p className="text-amber-200/80 text-sm">
        © 2024 Lisanegebriel Abay Kebedew. All Rights Reserved.
      </p>
    </motion.footer>
  );
};