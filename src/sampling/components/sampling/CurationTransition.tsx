import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiveBottleSampleSet } from './FiveBottleSampleSet';
import { useReducedMotion } from '../../hooks/useLocalStorage';

const MESSAGES = [
  'Reading your brand brief',
  'Balancing scent families and brand fit',
  'Selecting five focused fragrance directions',
];

interface CurationTransitionProps {
  onComplete: () => void;
}

export const CurationTransition = ({ onComplete }: CurationTransitionProps) => {
  const reducedMotion = useReducedMotion();
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const msgInterval = window.setInterval(() => {
      setMessageIndex((i) => Math.min(i + 1, MESSAGES.length - 1));
    }, 900);

    const completeTimer = window.setTimeout(onComplete, reducedMotion ? 1500 : 3200);

    return () => {
      window.clearInterval(msgInterval);
      window.clearTimeout(completeTimer);
    };
  }, [onComplete, reducedMotion]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      {reducedMotion ? (
        <div className="w-full max-w-xs">
          <div className="h-2 overflow-hidden rounded-full bg-[#EADFD3]">
            <motion.div
              className="h-full bg-[#FF600A]"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.2 }}
            />
          </div>
          <p className="mt-4 text-lg font-semibold text-[#2B1809]">{MESSAGES[messageIndex]}</p>
        </div>
      ) : (
        <>
          <motion.div
            className="mb-8 w-full"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <FiveBottleSampleSet size="lg" />
          </motion.div>
          <AnimatePresence mode="wait">
            <motion.p
              key={messageIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="text-xl font-semibold text-[#2B1809]"
            >
              {MESSAGES[messageIndex]}
            </motion.p>
          </AnimatePresence>
        </>
      )}
    </div>
  );
};
