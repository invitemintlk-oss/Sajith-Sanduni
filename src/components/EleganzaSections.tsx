import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Phone, MapPin } from 'lucide-react';
import { COUPLE } from '../utils/guest';

/** Wedding details shown in the invitation sections. */
export const WEDDING = {
  groomParents: 'Mr. & Mrs. MZF Mohamed',
  brideParents: 'Mr. & Mrs. Fernando',
  month: 'December',
  weekday: 'Saturday',
  day: '19',
  daySuffix: 'th',
  year: '2026',
  /** Leave empty until the venue is confirmed. */
  venue: 'Vogo Grand Hotel',
  venueAddress: 'Dubai',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Vogo+Grand+Hotel+Dubai',
  time: 'From 6.00 PM to 1.00 AM',
  rsvpPhones: ['056 628 9951', '055 374 5595'],
} as const;

export const BURGUNDY = '#6A1E33';
export const BLUSH = '#FFF3F5';
/** Champagne gold accent that pairs with the burgundy. */
export const GOLD = '#C9A46A';

const EASE = [0.22, 1, 0.36, 1] as const;
/** Width / height of the curtain countdown background (675 x 1200). */
const CURTAIN_RATIO = 675 / 1200;

/** Deep burgundy velvet background. */
export const VELVET: React.CSSProperties = {
  background:
    'radial-gradient(ellipse at 50% 0%, #8c2a46 0%, #6A1E33 45%, #4a1222 100%)',
};

/** Champagne-gold gradient text for use on burgundy. */
export const GOLD_TEXT: React.CSSProperties = {
  backgroundImage: 'linear-gradient(135deg, #b98d4f 0%, #ecd3a4 40%, #fff1d6 52%, #c9a46a 70%, #a77a3f 100%)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
  padding: '0.12em 0.25em',
  margin: '-0.12em -0.25em',
};

const Reveal: React.FC<{ delay?: number; className?: string; children: React.ReactNode }> = ({
  delay = 0,
  className,
  children,
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 1, delay, ease: EASE }}
  >
    {children}
  </motion.div>
);

/** Botanical sprig divider. */
export const Sprig: React.FC<{ className?: string; color?: string; bloom?: string }> = ({
  className = 'w-40',
  color = BURGUNDY,
  bloom = '#f6c9d3',
}) => (
  <svg viewBox="0 0 200 40" className={`${className} h-auto mx-auto`} fill="none" stroke={color} aria-hidden="true">
    <path d="M8 20 C45 20 70 13 90 20 M192 20 C155 20 130 13 110 20" strokeWidth="0.9" strokeOpacity="0.8" />
    {[
      [36, 17, -30],
      [56, 14, -25],
      [74, 15, -20],
      [44, 23, 25],
      [64, 23, 25],
    ].map(([x, y, r], i) => (
      <g key={i}>
        <ellipse cx={x} cy={y} rx="6" ry="2.2" transform={`rotate(${r} ${x} ${y})`} fill={color} fillOpacity="0.25" strokeWidth="0.6" />
        <ellipse cx={200 - x} cy={y} rx="6" ry="2.2" transform={`rotate(${-r} ${200 - x} ${y})`} fill={color} fillOpacity="0.25" strokeWidth="0.6" />
      </g>
    ))}
    {[0, 72, 144, 216, 288].map((a) => (
      <ellipse key={a} cx="100" cy="14" rx="2.6" ry="5.5" transform={`rotate(${a} 100 20)`} fill={bloom} strokeWidth="0.7" />
    ))}
    <circle cx="100" cy="20" r="2.2" fill={GOLD} stroke="none" />
  </svg>
);

/** Embroidered-style corner flourish. */
const Corner: React.FC<{ className: string; color?: string }> = ({ className, color = GOLD }) => (
  <svg viewBox="0 0 80 80" className={`absolute w-14 h-14 sm:w-20 sm:h-20 pointer-events-none ${className}`} fill="none" stroke={color} aria-hidden="true">
    <path d="M6 74 V30 C6 16 16 6 30 6 H74" strokeWidth="1.1" />
    <path d="M14 60 C14 34 34 14 60 14" strokeWidth="0.6" strokeOpacity="0.6" />
    <ellipse cx="24" cy="24" rx="7" ry="2.6" transform="rotate(-45 24 24)" fill="#f6c9d3" strokeWidth="0.6" />
    <ellipse cx="38" cy="15" rx="5" ry="2" transform="rotate(-15 38 15)" fill={color} fillOpacity="0.35" strokeWidth="0.6" />
    <ellipse cx="15" cy="38" rx="5" ry="2" transform="rotate(-75 15 38)" fill={color} fillOpacity="0.35" strokeWidth="0.6" />
    <circle cx="6" cy="6" r="2.6" fill={color} stroke="none" />
  </svg>
);

const Eyebrow: React.FC<{ children: React.ReactNode; light?: boolean }> = ({ children, light }) => (
  <p
    className={`font-['Cinzel',_serif] text-[10px] sm:text-xs tracking-[0.45em] pl-[0.45em] uppercase ${
      light ? 'text-[#ecd3a4]' : 'text-[#a8405f]'
    }`}
  >
    {children}
  </p>
);

const Serif: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <p className={`font-['Cormorant_Garamond',_serif] ${className}`}>{children}</p>
);

/** Families, guest blessing and the couple's names. */
export const InvitationSection: React.FC<{ guestName?: string }> = ({ guestName }) => (
  <section className="px-4 py-20 sm:py-28">
    <Reveal>
      <div className="relative mx-auto w-full max-w-xl rounded-t-[12rem] sm:rounded-t-[16rem] p-[3px] bg-gradient-to-b from-[#ecd3a4] via-[#C9A46A] to-[#a77a3f] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.75)]">
        <div className="relative overflow-hidden rounded-t-[12rem] sm:rounded-t-[16rem] bg-[#3f0f1d]/90 backdrop-blur-sm">
          {/* Burgundy arch header */}
          <div className="relative pt-16 pb-10 px-8 text-center text-[#FFF3F5]" style={VELVET}>
            <div className="absolute inset-3 rounded-t-[11rem] sm:rounded-t-[15rem] border border-[#C9A46A]/50 pointer-events-none" />
            <Eyebrow light>With joy in our hearts</Eyebrow>
            <p className="mt-3 font-['Pinyon_Script',_cursive] text-5xl sm:text-6xl leading-tight" style={GOLD_TEXT}>
              Save The Date
            </p>
            <Sprig className="w-36 mt-4" color="#ecd3a4" />
          </div>
          {/* Scalloped edge */}
          <svg viewBox="0 0 400 16" preserveAspectRatio="none" className="block w-full h-4 -mt-px" aria-hidden="true">
            <defs>
              <linearGradient id="scallop" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#5a1729" />
                <stop offset="1" stopColor="#4a1222" />
              </linearGradient>
            </defs>
            <path d={`M0 0 H400 V2 ${Array.from({ length: 20 }, (_, i) => `Q${i * 20 + 10} 16 ${i * 20} 2`).reverse().join(' ')} Z`} fill="url(#scallop)" />
          </svg>

          <div className="relative px-8 pt-10 pb-16 sm:px-16 text-center text-[#fde3ea]">
            <div className="absolute inset-3 top-0 border-x border-b border-[#C9A46A]/35 pointer-events-none" />
            <Corner className="bottom-4 left-4 -scale-y-100" />
            <Corner className="bottom-4 right-4 -scale-100" />

            <Reveal delay={0.1}>
              <Eyebrow light>Loving son of</Eyebrow>
              <Serif className="mt-2 text-2xl sm:text-3xl font-semibold text-[#FFF3F5]">{WEDDING.groomParents}</Serif>
            </Reveal>

            <Reveal delay={0.2} className="my-6 flex items-center justify-center gap-4">
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#C9A46A]" />
              <Serif className="italic text-xl sm:text-2xl text-[#f2bccb]">together with</Serif>
              <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#C9A46A]" />
            </Reveal>

            <Reveal delay={0.3}>
              <Eyebrow light>Loving daughter of</Eyebrow>
              <Serif className="mt-2 text-2xl sm:text-3xl font-semibold text-[#FFF3F5]">{WEDDING.brideParents}</Serif>
            </Reveal>

            <Reveal delay={0.4} className="mt-10">
              <Serif className="italic text-lg sm:text-xl text-[#f2bccb]">request the blessing of</Serif>
              <div className="relative mx-auto mt-4 max-w-sm rounded-full px-6 py-4 text-[#FFF3F5] shadow-[0_0_0_1.5px_#C9A46A,0_12px_30px_-12px_rgba(0,0,0,0.8)]" style={VELVET}>
                <div className="absolute inset-1 rounded-full border border-[#C9A46A]/60 pointer-events-none" />
                <Serif className="text-2xl sm:text-3xl font-semibold tracking-wide">
                  <span style={GOLD_TEXT}>{guestName || 'Our Beloved Guests'}</span>
                </Serif>
              </div>
              <Serif className="mt-6 italic text-lg sm:text-xl text-[#f2bccb] leading-snug">
                to celebrate the marriage of
                <br />
                their loving children
              </Serif>
            </Reveal>

            {/* Couple illustration on a soft rose halo */}
            <Reveal delay={0.45} className="relative mx-auto mt-8 w-[min(62vw,15rem)]">
              <div className="absolute inset-x-[-12%] bottom-[2%] top-[18%] rounded-t-full bg-gradient-to-b from-[#fde3ea] to-[#f2bccb] border-2 border-[#C9A46A] shadow-[inset_0_0_30px_rgba(106,30,51,0.25)]" />
              <img
                src="/couple-illustration.webp"
                alt="Illustration of the bride and groom"
                loading="lazy"
                className="relative w-full h-auto select-none drop-shadow-[0_18px_20px_rgba(60,10,25,0.35)]"
                draggable={false}
              />
              <div className="relative -mt-1 h-px w-[124%] -ml-[12%] bg-gradient-to-r from-transparent via-[#C9A46A] to-transparent" />
            </Reveal>

            <Reveal delay={0.5} className="mt-6">
              <p className="font-['Pinyon_Script',_cursive] text-6xl sm:text-7xl leading-tight">
                <span style={GOLD_TEXT}>{COUPLE.groom}</span>
              </p>
              <p className="font-['Pinyon_Script',_cursive] text-4xl leading-none my-1">
                <span className="font-['Cormorant_Garamond',_serif] italic text-[#f2bccb] text-3xl">&amp;</span>
              </p>
              <p className="font-['Pinyon_Script',_cursive] text-6xl sm:text-7xl leading-tight">
                <span style={GOLD_TEXT}>{COUPLE.bride}</span>
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </Reveal>
  </section>
);

/** Date, venue and time on burgundy velvet. */
export const DateSection: React.FC = () => (
  <section className="relative px-4 py-20 sm:py-28 text-[#FFF3F5] overflow-hidden bg-[#2e0a15]/55">
    <div className="absolute inset-4 sm:inset-8 border border-[#C9A46A]/40 pointer-events-none" />
    <div className="absolute inset-6 sm:inset-10 border border-[#C9A46A]/20 pointer-events-none" />
    <Corner className="top-4 left-4 sm:top-8 sm:left-8" />
    <Corner className="top-4 right-4 sm:top-8 sm:right-8 -scale-x-100" />
    <Corner className="bottom-4 left-4 sm:bottom-8 sm:left-8 -scale-y-100" />
    <Corner className="bottom-4 right-4 sm:bottom-8 sm:right-8 -scale-100" />

    <Reveal className="relative text-center">
      <Eyebrow light>The Wedding Day</Eyebrow>
      <Sprig className="w-32 mt-4 mb-8" color="#ecd3a4" />

      <p className="font-['Cinzel',_serif] text-2xl sm:text-3xl tracking-[0.35em] pl-[0.35em] uppercase">
        <span style={GOLD_TEXT}>{WEDDING.month}</span>
      </p>

      <div className="mt-6 flex items-center justify-center gap-3 sm:gap-8">
        <span className="w-24 sm:w-32 border-y border-[#C9A46A]/60 py-2 font-['Cinzel',_serif] text-xs sm:text-sm tracking-[0.3em] pl-[0.3em] uppercase text-[#fde3ea]">
          {WEDDING.weekday}
        </span>
        <span className="relative flex h-28 w-28 sm:h-36 sm:w-36 items-center justify-center rounded-full bg-[#FFF3F5] shadow-[0_0_0_3px_#6A1E33,0_0_0_5px_#C9A46A,0_20px_40px_-10px_rgba(0,0,0,0.5)]">
          <span className="font-['Cormorant_Garamond',_serif] text-6xl sm:text-7xl leading-none font-semibold text-[#6A1E33]">
            {WEDDING.day}
            <sup className="text-xl align-super ml-0.5 text-[#a8405f]">{WEDDING.daySuffix}</sup>
          </span>
        </span>
        <span className="w-24 sm:w-32 border-y border-[#C9A46A]/60 py-2 font-['Cinzel',_serif] text-xs sm:text-sm tracking-[0.3em] pl-[0.3em] text-[#fde3ea]">
          {WEDDING.year}
        </span>
      </div>

      <Reveal delay={0.2} className="mt-12">
        <Serif className="italic text-xl text-[#f6c9d3]">at</Serif>
        <Serif className="mt-2 text-2xl sm:text-3xl font-semibold">
          <span style={GOLD_TEXT}>{WEDDING.venue || 'Venue details to follow'}</span>
        </Serif>
        {WEDDING.venueAddress && (
          <Serif className="mt-1 font-['Cinzel',_serif] text-sm tracking-[0.35em] pl-[0.35em] uppercase text-[#f6c9d3]">
            {WEDDING.venueAddress}
          </Serif>
        )}

        {/* Hotel photo in a gold frame */}
        <div className="relative mx-auto mt-8 w-full max-w-2xl rounded-t-[2.5rem] rounded-b-lg p-[3px] bg-gradient-to-b from-[#ecd3a4] via-[#C9A46A] to-[#a77a3f] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]">
          <div className="rounded-t-[2.35rem] rounded-b-md p-1.5 bg-[#4a1222]">
            <img
              src="/venue-hotel.webp"
              alt={`${WEDDING.venue}, ${WEDDING.venueAddress}`}
              loading="lazy"
              className="block w-full aspect-[1280/695] object-cover rounded-t-[2.1rem] rounded-b select-none"
              draggable={false}
            />
          </div>
        </div>

        <a
          href={WEDDING.mapUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#FFF3F5] px-6 py-2.5 font-['Cinzel',_serif] text-[11px] tracking-[0.25em] uppercase text-[#6A1E33] shadow-[0_0_0_1.5px_#C9A46A,0_10px_25px_-10px_rgba(0,0,0,0.6)] hover:bg-white transition-colors"
        >
          <MapPin className="w-4 h-4" strokeWidth={1.6} />
          View on Map
        </a>
      </Reveal>

      <Reveal delay={0.3} className="mt-10">
        <span className="inline-block rounded-full bg-gradient-to-r from-[#b98d4f] via-[#ecd3a4] to-[#b98d4f] p-px">
          <span className="block rounded-full bg-[#5a1729] px-7 py-3 pl-[calc(1.75rem+0.25em)] font-['Cinzel',_serif] text-xs sm:text-sm tracking-[0.25em] uppercase text-[#fde3ea]">
            {WEDDING.time}
          </span>
        </span>
      </Reveal>
    </Reveal>
  </section>
);

/** Live countdown, each unit in a burgundy medallion. */
export const CountdownSection: React.FC<{ targetDate: Date }> = ({ targetDate }) => {
  const calc = () => {
    const diff = Math.max(0, targetDate.getTime() - Date.now());
    return {
      Days: Math.floor(diff / 86400000),
      Hours: Math.floor((diff / 3600000) % 24),
      Minutes: Math.floor((diff / 60000) % 60),
      Seconds: Math.floor((diff / 1000) % 60),
    };
  };
  const [left, setLeft] = useState(calc);

  useEffect(() => {
    const t = window.setInterval(() => setLeft(calc()), 1000);
    return () => window.clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetDate]);

  return (
    <section className="relative h-screen h-[100svh] overflow-hidden bg-[#2e0a15]">
      {/* Blurred fill for screens wider than the picture */}
      <img
        src="/bg-curtain.webp"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 w-full max-w-none object-cover scale-110 blur-2xl opacity-60 pointer-events-none select-none"
        style={{ height: '100%' }}
        draggable={false}
      />
      <div
        className="absolute left-1/2 top-0 h-full -translate-x-1/2 [container-type:inline-size]"
        style={{ width: `calc(100svh * ${CURTAIN_RATIO})` }}
      >
        <img
          src="/bg-curtain.webp"
          alt=""
          loading="lazy"
          className="absolute inset-0 w-full max-w-none object-cover select-none"
          style={{ height: '100%' }}
          draggable={false}
        />

        {/* Inside the ornate oval */}
        <div className="absolute left-1/2 top-[44.5%] -translate-x-1/2 -translate-y-1/2 w-[48%] text-center">
          <Reveal>
            <p className="font-['Cinzel',_serif] text-[max(8px,2.1cqw)] tracking-[0.35em] pl-[0.35em] uppercase text-[#ecd3a4]">
              Counting down
            </p>
            <p className="font-['Pinyon_Script',_cursive] text-[6.3cqw] leading-tight mt-[1cqw]">
              <span style={GOLD_TEXT}>Until We Say I Do</span>
            </p>
            <Sprig className="w-[60%] mt-[1cqw] mb-[4cqw]" color="#ecd3a4" />
            <div className="grid grid-cols-2 gap-y-[4cqw]">
              {Object.entries(left).map(([label, value], i) => (
                <div
                  key={label}
                  className={`flex flex-col items-center ${i % 2 === 0 ? 'border-r border-[#C9A46A]/40' : ''}`}
                >
                  <span className="font-['Cormorant_Garamond',_serif] text-[10cqw] font-semibold tabular-nums leading-none">
                    <span style={GOLD_TEXT}>{String(value).padStart(2, '0')}</span>
                  </span>
                  <span className="mt-[1cqw] font-['Cinzel',_serif] text-[max(8px,2cqw)] tracking-[0.2em] pl-[0.2em] uppercase text-[#f2bccb]">
                    {label}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-[4cqw] font-['Cinzel',_serif] text-[max(8px,2.1cqw)] tracking-[0.3em] pl-[0.3em] text-[#ecd3a4]">
              {WEDDING.day} . 12 . {WEDDING.year}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

/** RSVP phone numbers on burgundy, tap to call. */
export const RsvpContacts: React.FC = () => (
  <Reveal className="text-center px-4 text-[#FFF3F5]">
    <Eyebrow light>Kindly reply</Eyebrow>
    <p className="font-['Pinyon_Script',_cursive] text-6xl sm:text-7xl mt-2 leading-tight">
      <span style={GOLD_TEXT}>RSVP</span>
    </p>
    <Sprig className="w-32 mt-3 mb-6" color="#ecd3a4" />
    <Serif className="italic text-lg sm:text-xl text-[#f6c9d3] mb-6">Please confirm your attendance</Serif>
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
      {WEDDING.rsvpPhones.map((phone) => (
        <a
          key={phone}
          href={`tel:${phone.replace(/\s/g, '')}`}
          className="inline-flex rounded-full bg-gradient-to-r from-[#b98d4f] via-[#ecd3a4] to-[#b98d4f] p-px shadow-[0_10px_25px_-10px_rgba(0,0,0,0.6)] hover:brightness-110 transition"
        >
          <span className="inline-flex items-center gap-3 rounded-full bg-[#FFF3F5] px-7 py-3 text-[#6A1E33] font-['Cormorant_Garamond',_serif] text-xl font-semibold tracking-wider">
            <Phone className="w-4 h-4" strokeWidth={1.6} />
            {phone}
          </span>
        </a>
      ))}
    </div>
  </Reveal>
);
