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
  VideoSection,
  Sprig,
  WEDDING,
  VELVET,
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
        className="font-sans text-[#6A1E33] bg-brand-blush selection:bg-[#6A1E33]/20"
      >
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          onClick={onToggleMusic}
          data-music-toggle
          aria-label={isMusicPlaying ? 'Pause music' : 'Play music'}
          className="fixed top-6 right-6 z-50 w-12 sm:w-14 h-12 sm:h-14 bg-[#FFF3F5]/85 backdrop-blur-md rounded-full shadow-[0_8px_30px_rgba(106,30,51,0.18)] flex items-center justify-center border border-[#6A1E33]/25 text-[#6A1E33] hover:scale-105 transition-all duration-300"
        >
          {isMusicPlaying ? <Music className="w-5 h-5 sm:w-6 sm:h-6" /> : <VolumeX className="w-5 h-5 sm:w-6 sm:h-6" />}
        </motion.button>

        <FloatingPetals />

        <Hero event={eventParam} inviteeName={fullInviteeName} autoStart={envelopeOpened} />

        <DeferredMount active={active} delay={100} minHeight="60vh">
          <InvitationSection guestName={fullInviteeName} />
        </DeferredMount>

        <DeferredMount active={active} delay={130} minHeight="80vh">
          <VideoSection />
        </DeferredMount>

        <DeferredMount active={active} delay={150} minHeight="50vh">
          <DateSection />
        </DeferredMount>

        <DeferredMount active={active} delay={200} minHeight="40vh">
          <CountdownSection targetDate={weddingDate} />
        </DeferredMount>

        <DeferredMount active={active} delay={300} minHeight="60vh">
          <section className="py-20 sm:py-28" style={VELVET}>
            <RsvpContacts />
            <RSVPForm inviteeName={fullInviteeName} eventName={eventLabel} eventParam={eventParam} />
          </section>
        </DeferredMount>

        <DeferredMount active={active} delay={400}>
          <footer className="py-14 bg-[#FFF3F5] border-t-2 border-[#C9A46A]/50 text-center">
            <Sprig className="w-28 mb-5" />
            <p className="font-['Pinyon_Script',_cursive] text-5xl leading-tight text-[#6A1E33]">
              {COUPLE.groom} <span style={GOLD_TEXT}>&amp;</span> {COUPLE.bride}
            </p>
            <span className="mt-3 block font-['Cinzel',_serif] text-[11px] tracking-[0.4em] pl-[0.4em] text-[#6A1E33]/70">
              {WEDDING.day} . 12 . {WEDDING.year}
            </span>

            <div className="w-12 h-px bg-[#6A1E33]/25 mx-auto my-6" />

            <p className="text-[9px] sm:text-[10px] font-sans tracking-[0.2em] text-[#6A1E33]/60 uppercase">
              Want a beautiful wedding website like this? <br className="sm:hidden" />Create yours with{' '}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#6A1E33] font-bold underline decoration-[#6A1E33]/40 underline-offset-4"
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
