
import React from 'react';
import { motion } from 'framer-motion';

const Candle: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center">
      <div className="candle-flame w-3 h-4 -mb-1" />
      <div className="w-2 h-10 bg-pastel-pink rounded-sm" style={{ boxShadow: 'inset -2px 0 2px rgba(0,0,0,0.1)' }} />
    </div>
  );
};

export default Candle;
