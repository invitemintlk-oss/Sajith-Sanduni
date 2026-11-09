import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

interface HeroProps {
  event?: string | null;
  inviteeName?: string;
  /** Becomes true once the envelope is opened; the names then animate in. */
  autoStart?: boolean;
}

const EASE = [0.22, 1, 0.36, 1] as const;
const CARD = '/hero-card.webp';
/** Width / height of the hero card image (941 x 1672). */
const CARD_RATIO = 941 / 1672;

// Light champagne-gold text that reads on the burgundy oval.
const CHAMPAGNE_TEXT: React.CSSProperties = {
  backgroundImage: 'linear-gradient(135deg, #f7e7cf 0%, #e9c99a 40%, #fff3df 55%, #d9b07a 100%)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
  padding: '0.12em 0.25em',
  margin: '-0.12em -0.25em',
  filter: 'drop-shadow(0 1px 1px rgba(40,5,15,0.45))',
};

/** Script text revealed left-to-right, as if being handwritten. */
const Written: React.FC<{ delay: number; children: React.ReactNode }> = ({ delay, children }) => (
  <motion.span
    className="inline-block"
    style={CHAMPAGNE_TEXT}
    initial={{ clipPath: 'inset(-25% 105% -25% -10%)', opacity: 0 }}
    animate={{ clipPath: 'inset(-25% -10% -25% -10%)', opacity: 1 }}
    transition={{ duration: 1.4, delay, ease: EASE, opacity: { duration: 0.3, delay } }}
  >
    {children}
  </motion.span>
);

/** Full-screen hero: the blush card with the couple's names inside its burgundy oval. */
export const Hero: React.FC<HeroProps> = ({ autoStart = false }) => (
  <div className="relative h-screen h-[100svh] overflow-hidden bg-brand-blush">
    {/* Blurred fill for screens wider than the card */}
    <img
      src={CARD}
      alt=""
      aria-hidden="true"
      className="absolute inset-0 w-full max-w-none object-cover scale-110 blur-2xl opacity-70 pointer-events-none select-none"
      style={{ height: '100%' }}
      draggable={false}
    />

    {/* The card always fills the screen height; on narrow phones its sides are cropped */}
    <div
      className="absolute left-1/2 top-0 h-full -translate-x-1/2 [container-type:inline-size]"
      style={{ width: `calc(100svh * ${CARD_RATIO})` }}
    >
      <img
        src={CARD}
        alt=""
        className="absolute inset-0 w-full max-w-none object-cover select-none shadow-[0_0_60px_rgba(106,30,51,0.15)]"
        style={{ height: '100%' }}
        draggable={false}
      />

      {/* Names: centred in the oval, nudged left of the bow */}
      {autoStart && (
        <div
          className="absolute top-[52%] left-[43%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center leading-none font-['Pinyon_Script',_cursive] text-[10.5cqw]"
          aria-label="Sajith and Sanduni"
        >
          <Written delay={0.6}>Sajith</Written>
          <motion.span
            className="font-['Cormorant_Garamond',_serif] italic text-[0.55em] my-[0.15em] text-[#f1d9b8]"
            initial={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, delay: 1.6, ease: EASE }}
          >
            &amp;
          </motion.span>
          <Written delay={1.8}>Sanduni</Written>
        </div>
      )}
    </div>

    {/* Scroll down */}
    {autoStart && (
      <motion.button
        type="button"
        onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-[#6A1E33]"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.4, duration: 0.8, ease: EASE }}
      >
        <span className="rounded-full bg-[#FFF3F5]/80 backdrop-blur-sm border border-[#C9A46A]/60 px-5 py-2 pl-[calc(1.25rem+0.4em)] font-['Cinzel',_serif] text-[10px] sm:text-[11px] tracking-[0.4em] uppercase shadow-[0_8px_20px_-8px_rgba(106,30,51,0.4)]">
          Scroll Down
        </span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5" strokeWidth={1.5} />
        </motion.span>
      </motion.button>
    )}
  </div>
);
