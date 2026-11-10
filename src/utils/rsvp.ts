/**
 * Google Apps Script Web App URL for RSVPs (see google-apps-script/SETUP.md).
 * Paste the URL from Deploy > New deployment here.
 */
export const RSVP_SCRIPT_URL: string =
  'https://script.google.com/macros/s/AKfycbwFdroR0ysfNq8Kp2jAtbJsejueYY6YjPothiN3sEwEZkKsdVZE08jh1hCs0GXv2c76/exec';

export const isRsvpConfigured = () => /^https:\/\/script\.google\.com\/macros\/s\/.+\/exec$/.test(RSVP_SCRIPT_URL);

export interface RsvpPayload {
  fullName: string;
  attendance: 'yes' | 'no';
  guests: string;
  invitedAs: string;
}

/** Send one RSVP to the sheet. */
export async function sendRsvp(data: RsvpPayload): Promise<void> {
  if (!isRsvpConfigured()) {
    throw new Error('RSVP sheet is not connected yet.');
  }

  // URL-encoded body keeps this a "simple" request, so Apps Script reads it via e.parameter
  const body = new URLSearchParams({
    fullName: data.fullName.trim(),
    attendance: data.attendance,
    guests: data.attendance === 'yes' ? data.guests : '0',
    invitedAs: data.invitedAs,
    pageUrl: window.location.href,
  });

  // Apps Script does not send CORS headers, so the response is opaque; a network failure still throws
  await fetch(RSVP_SCRIPT_URL, { method: 'POST', mode: 'no-cors', body });
}
