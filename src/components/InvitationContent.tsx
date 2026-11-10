import { useState } from 'react';
import { motion } from 'motion/react';
import { Music, VolumeX } from 'lucide-react';
import { Hero } from './Hero';
import { RSVPForm } from './RSVPForm';
import { FloatingPetals } from './FloatingPetals';
import { DeferredMount } from './DeferredMount';
import { EnvelopeIntro } from './EnvelopeIntro';
import {
  InvitationSection,
  DateSection,
  CountdownSection,
  RsvpContacts,
  Sprig,
  WEDDING,
  GOLD_TEXT,
} from './EleganzaSections';
import { COUPLE } from '../utils/guest';

interface InvitationContentProps {
  active: boolean;
  eventParam: string;
  fullInviteeName: string;
  eventLabel: string;
  weddingDate: Date;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
}

export function InvitationContent({
  active,
  eventParam,
  fullInviteeName,
  eventLabel,
  weddingDate,
  isMusicPlaying,
  onToggleMusic,
}: InvitationContentProps) {
  const [envelopeOpened, setEnvelopeOpened] = useState(false);

  if (!active) return null;

  return (
    <>
      {!envelopeOpened && <EnvelopeIntro onOpen={() => setEnvelopeOpened(true)} />}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative isolate font-sans text-[#FFF3F5] selection:bg-[#C9A46A]/30"
      >
        {/* Floral burgundy velvet stays fixed behind every section */}
        <div className="fixed inset-0 -z-10 bg-[#3f0f1d]" aria-hidden="true">
          <img
            src="/bg-floral.webp"
            alt=""
            className="w-full max-w-none object-cover select-none"
            style={{ height: '100%' }}
            draggable={false}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(30,6,14,0.45)_100%)]" />
        </div>
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          onClick={onToggleMusic}
          data-music-toggle
          aria-label={isMusicPlaying ? 'Pause music' : 'Play music'}
          className="fixed top-6 right-6 z-50 w-12 sm:w-14 h-12 sm:h-14 bg-[#3f0f1d]/80 backdrop-blur-md rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.35)] flex items-center justify-center border border-[#C9A46A]/70 text-[#ecd3a4] hover:scale-105 transition-all duration-300"
        >
          {isMusicPlaying ? <Music className="w-5 h-5 sm:w-6 sm:h-6" /> : <VolumeX className="w-5 h-5 sm:w-6 sm:h-6" />}
        </motion.button>

        <FloatingPetals />

        <Hero event={eventParam} inviteeName={fullInviteeName} autoStart={envelopeOpened} />

        <DeferredMount active={active} delay={100} minHeight="60vh">
          <InvitationSection guestName={fullInviteeName} />
        </DeferredMount>

        <DeferredMount active={active} delay={150} minHeight="50vh">
          <DateSection />
        </DeferredMount>

        <DeferredMount active={active} delay={200} minHeight="40vh">
          <CountdownSection targetDate={weddingDate} />
        </DeferredMount>

        <DeferredMount active={active} delay={300} minHeight="60vh">
          <section className="py-20 sm:py-28 bg-[#2e0a15]/40">
            <RsvpContacts />
            <RSVPForm inviteeName={fullInviteeName} eventName={eventLabel} eventParam={eventParam} />
          </section>
        </DeferredMount>

        <DeferredMount active={active} delay={400}>
          <footer className="py-14 bg-[#2e0a15]/85 border-t border-[#C9A46A]/60 text-center">
            <Sprig className="w-28 mb-5" color="#ecd3a4" />
            <p className="font-['Pinyon_Script',_cursive] text-5xl leading-tight">
              <span style={GOLD_TEXT}>{COUPLE.groom}</span> <span className="font-['Cormorant_Garamond',_serif] italic text-3xl text-[#f2bccb]">&amp;</span> <span style={GOLD_TEXT}>{COUPLE.bride}</span>
            </p>
            <span className="mt-3 block font-['Cinzel',_serif] text-[11px] tracking-[0.4em] pl-[0.4em] text-[#ecd3a4]/80">
              {WEDDING.day} . 12 . {WEDDING.year}
            </span>

            <div className="w-12 h-px bg-[#C9A46A]/40 mx-auto my-6" />

            <p className="text-[9px] sm:text-[10px] font-sans tracking-[0.2em] text-[#f2bccb]/70 uppercase">
              Want a beautiful wedding website like this? <br className="sm:hidden" />Create yours with{' '}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#ecd3a4] font-bold underline decoration-[#C9A46A]/50 underline-offset-4"
                href="https://wa.me/94707819074"
              >
                Invitemint
              </a>
            </p>
          </footer>
        </DeferredMount>
      </motion.div>
    </>
  );
}
