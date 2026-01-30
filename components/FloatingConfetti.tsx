
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const FloatingConfetti: React.FC = () => {
  const [confetti, setConfetti] = useState<any[]>([]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const colors = ['#F8BBD0', '#FFF3E0', '#E53935', '#F5C16C'];
    // Optimization: Render fewer particles on mobile for performance
    const count = isMobile ? 20 : 40;
    const items = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 10 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 10,
    }));
    setConfetti(items);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
      {confetti.map((c) => (
        <motion.div
          key={c.id}
          className="absolute rounded-full will-change-transform"
          style={{
            left: `${c.x}%`,
            top: `${c.y}%`,
            width: c.size,
            height: c.size,
            backgroundColor: c.color,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: c.duration,
            repeat: Infinity,
            delay: c.delay,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

export default FloatingConfetti;
