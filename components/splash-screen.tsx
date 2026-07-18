'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogoMark } from '@/components/logo';
import { promoImages } from '@/lib/data';

const SPLASH_KEY = 'buyoo-splash-seen';

export function SplashScreen() {
  // Start as null (unknown) to prevent hydration mismatch.
  // Only after mount do we check sessionStorage.
  const [show, setShow] = useState<boolean | null>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [progress, setProgress] = useState(0);

  // Determine visibility after mount (client-only)
  useEffect(() => {
    const seen = sessionStorage.getItem(SPLASH_KEY);
    if (!seen) {
      sessionStorage.setItem(SPLASH_KEY, 'true');
      setShow(true);
    } else {
      setShow(false);
    }
  }, []);

  // Run timers only when splash is active
  useEffect(() => {
    if (!show) return;

    const imageInterval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % promoImages.length);
    }, 3000);

    const duration = 5500;
    const startTime = Date.now();
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(progressInterval);
        clearInterval(imageInterval);
        setTimeout(() => setShow(false), 400);
      }
    }, 50);

    return () => {
      clearInterval(imageInterval);
      clearInterval(progressInterval);
    };
  }, [show]);

  // Don't render anything until we know (prevents SSR/CSR mismatch)
  if (show === null || !show) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="splash"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.03 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-white dark:bg-[#14213D]"
      >
        {/* Animated blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -left-1/4 top-0 h-[60vh] w-[80vw] rounded-full bg-[#FF7A00]/20 blur-3xl"
            animate={{ x: [0, 80, 0], y: [0, 40, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -right-1/4 bottom-0 h-[60vh] w-[80vw] rounded-full bg-[#34C759]/20 blur-3xl"
            animate={{ x: [0, -80, 0], y: [0, -40, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* Background rotating promo image */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImage}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 0.12, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1 }}
              className="h-[55vh] w-[55vh] overflow-hidden rounded-full"
            >
              <img
                src={promoImages[currentImage].src}
                alt={promoImages[currentImage].label}
                className="h-full w-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Foreground content */}
        <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
          <motion.div
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 120, damping: 14 }}
          >
            <LogoMark className="h-24 w-24 drop-shadow-xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <h1 className="font-display text-5xl font-bold tracking-tight md:text-6xl">
              <span className="text-[#14213D] dark:text-white">Buy</span>
              <span className="text-[#34C759]">oo</span>
            </h1>
            <p className="mt-2 font-sans text-lg text-gray-500 dark:text-gray-300">
              Everything Around You
            </p>
          </motion.div>

          {/* Spinner + progress */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="flex flex-col items-center gap-3"
          >
            {/* Dual-ring spinner */}
            <div className="relative h-12 w-12">
              <div className="absolute inset-0 rounded-full border-4 border-[#FF7A00]/20" />
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#FF7A00]"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute inset-1 rounded-full border-4 border-transparent border-t-[#34C759]"
                animate={{ rotate: -360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              />
            </div>

            {/* Progress bar */}
            <div className="h-1 w-44 overflow-hidden rounded-full bg-gray-200 dark:bg-white/10">
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #FF7A00, #34C759)',
                }}
              />
            </div>

            {/* Category label */}
            <AnimatePresence mode="wait">
              <motion.p
                key={currentImage}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.35 }}
                className="text-xs font-medium uppercase tracking-widest text-gray-400"
              >
                {promoImages[currentImage].label}
              </motion.p>
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
