import { useState, useRef, useEffect, useCallback } from 'react';
import { Toaster } from 'sonner';

import { InvitationContent } from './components/InvitationContent';
import { Admin } from './components/Admin';
import { INVITATION_IMAGE_URLS, preloadImages } from './utils/preloadImages';
import { readGuestFromLocation } from './utils/guest';

const isAdminRoute = () => window.location.pathname.replace(/\/+$/, '') === '/admin';

export default function App() {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const params = new URLSearchParams(window.location.search);
  const eventParam = params.get('event') || 'both';

  // Personal links: /{guestName}?p={prefix} (older ?title=&name= links still work)
  const fullInviteeName = readGuestFromLocation();

  let eventLabel = 'Our Wedding Celebration';

  const weddingDate = new Date('2026-12-19T18:00:00');

  useEffect(() => {
    if (isAdminRoute()) return;

    preloadImages([...INVITATION_IMAGE_URLS]);
  }, []);

  const ensureAudio = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/Ordinary (Alex Warren) Violin Cover by Violin Valenti.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
      audioRef.current.preload = 'auto';
    }
    return audioRef.current;
  }, []);

  // Autoplay: try immediately; if the browser blocks it, start on the first interaction
  useEffect(() => {
    if (isAdminRoute()) return;

    const audio = ensureAudio();
    const events = ['pointerdown', 'touchstart', 'keydown', 'click'] as const;

    const removeListeners = () => {
      events.forEach((evt) => window.removeEventListener(evt, startOnInteraction));
    };

    const tryPlay = () =>
      audio.play().then(() => {
        setIsMusicPlaying(true);
        removeListeners();
      });

    function startOnInteraction(e: Event) {
      // Let the music button handle its own taps
      if ((e.target as Element | null)?.closest?.('[data-music-toggle]')) return;
      tryPlay().catch(() => {});
    }

    tryPlay().catch(() => {
      events.forEach((evt) => window.addEventListener(evt, startOnInteraction, { passive: true }));
    });

    return removeListeners;
  }, [ensureAudio]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = useCallback(() => {
    const audio = ensureAudio();
    if (!audio.paused) {
      audio.pause();
      setIsMusicPlaying(false);
    } else {
      audio.play().then(() => setIsMusicPlaying(true)).catch(console.error);
    }
  }, [ensureAudio]);

  if (isAdminRoute()) {
    return (
      <>
        <Toaster position="top-center" />
        <Admin />
      </>
    );
  }

  return (
    <>
      <Toaster position="top-center" />

      <InvitationContent
        active={true}
        eventParam={eventParam}
        fullInviteeName={fullInviteeName}
        eventLabel={eventLabel}
        weddingDate={weddingDate}
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={toggleMusic}
      />
    </>
  );
}
