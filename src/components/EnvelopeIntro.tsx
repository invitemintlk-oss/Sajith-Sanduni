import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface EnvelopeIntroProps {
  onOpen: () => void;
}

/** Full-screen burgundy envelope shown first; tapping it opens the invitation. */
export function EnvelopeIntro({ onOpen }: EnvelopeIntroProps) {
  const [opening, setOpening] = useState(false);
  const [visible, setVisible] = useState(true);

  // Keep the page from scrolling underneath the envelope
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const open = () => {
    if (opening) return;
    setOpening(true);
    window.setTimeout(() => setVisible(false), 1100);
  };

  return (
    <AnimatePresence onExitComplete={onOpen}>
      {visible && (
        <motion.div
          key="envelope-intro"
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-brand-blush cursor-pointer select-none overflow-hidden"
          onClick={open}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Blush floral backdrop */}
          <img
            src="/envelope-bg.webp"
            alt=""
            className="absolute inset-0 w-full h-full max-w-none object-cover pointer-events-none select-none"
            style={{ height: '100%', objectPosition: 'center' }}
            draggable={false}
          />

          <motion.img
            src="/envelope-cutout.webp"
            alt="Burgundy envelope with floral wax seal"
            className="relative w-[min(82vw,560px)] max-h-[60svh] object-contain drop-shadow-[0_20px_30px_rgba(70,15,30,0.35)]"
            draggable={false}
            initial={{ opacity: 0, scale: 0.94, y: 10 }}
            animate={
              opening
                ? { opacity: 0, scale: 1.25, y: -20, filter: 'blur(4px)' }
                : { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }
            }
            transition={opening ? { duration: 1.1, ease: [0.4, 0, 0.2, 1] } : { duration: 1.2, ease: 'easeOut' }}
          />

          <AnimatePresence>
            {!opening && (
              <motion.div
                className="absolute bottom-[12%] sm:bottom-14 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <motion.span
                  className="block whitespace-nowrap bg-[#6e1a2e]/85 backdrop-blur-md px-8 py-4 pl-[calc(2rem+0.4em)] rounded-full border border-[#e8c9a8]/40 shadow-[0_8px_24px_rgba(70,15,30,0.3)] text-[11px] font-sans uppercase tracking-[0.4em] text-[#f7e7cf] font-medium"
                  animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                >
                  Tap to open
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
