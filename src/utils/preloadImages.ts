/** Preload image URLs so they are cached before the invitation is shown. */
export function preloadImages(urls: string[]): Promise<void> {
  const unique = [...new Set(urls.filter(Boolean))];

  return Promise.all(
    unique.map(
      (url) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.decoding = 'async';
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = url;
        }),
    ),
  ).then(() => undefined);
}

export const INVITATION_IMAGE_URLS = [
  '/envelope-bg.webp',
  '/envelope-cutout.webp',
  '/hero-card.webp',
  '/couple-illustration.webp',
  '/Screenshot 2026-10-18 035242.png',
] as const;
