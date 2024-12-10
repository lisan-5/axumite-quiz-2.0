import React from 'react';
import { Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export const ContactInfo: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute top-4 right-4 flex items-center text-amber-200/80 text-sm"
    >
      <Mail className="w-4 h-4 mr-2" />
      <span>lisan5abay@gmail.com</span>
    </motion.div>
  );
};