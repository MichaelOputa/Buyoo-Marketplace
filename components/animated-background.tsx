'use client';

import { motion } from 'framer-motion';

interface AnimatedBackgroundProps {
  variant?: 'default' | 'soft' | 'navy';
  className?: string;
}

export function AnimatedBackground({
  variant = 'default',
  className = '',
}: AnimatedBackgroundProps) {
  const baseColor =
    variant === 'navy' ? 'bg-navy' : variant === 'soft' ? 'bg-muted/30' : 'bg-white dark:bg-navy';

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${baseColor} ${className}`}>
      <motion.div
        className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-primary/20 blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-20 top-1/3 h-80 w-80 rounded-full bg-secondary/20 blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-primary/15 blur-3xl"
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -20, 10, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.03] dark:opacity-[0.05]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}
