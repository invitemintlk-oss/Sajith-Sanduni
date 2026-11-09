/** Couple names used across the invitation and the admin message. */
export const COUPLE = {
  bride: 'Sanduni',
  groom: 'Sajith',
} as const;

export const PREFIXES = [
  { key: 'mr', label: 'Mr.' },
  { key: 'mrs', label: 'Mrs.' },
  { key: 'miss', label: 'Miss' },
  { key: 'mrmrs', label: 'Mr. & Mrs.' },
  { key: 'family', label: 'Family' },
  { key: 'dear', label: 'Dear' },
] as const;

export type PrefixKey = (typeof PREFIXES)[number]['key'];

const isPrefixKey = (value: string): value is PrefixKey => PREFIXES.some((p) => p.key === value);

/**
 * Combine prefix and name into the guest's display name.
 * "Dear" is a greeting style, not a title, so it adds nothing here — the greeting supplies it.
 */
export function getDisplayName(prefix: PrefixKey | '', name: string): string {
  const n = name.trim().replace(/\s+/g, ' ');
  if (!n) return '';
  switch (prefix) {
    case 'mr':
      return `Mr. ${n}`;
    case 'mrs':
      return `Mrs. ${n}`;
    case 'miss':
      return `Miss ${n}`;
    case 'mrmrs':
      return `Mr. & Mrs. ${n}`;
    case 'family':
      return `${n} and Family`;
    default:
      return n;
  }
}

export const getGreeting = (displayName: string) => `Dear ${displayName} ❤️`;

/** Personal link: {origin}/{guestName}?p={prefix}. The name is URL-encoded. */
export function buildInviteUrl(origin: string, prefix: PrefixKey | '', name: string): string {
  const n = name.trim().replace(/\s+/g, ' ');
  const query = prefix && prefix !== 'dear' ? `?p=${prefix}` : '';
  return `${origin}/${encodeURIComponent(n)}${query}`;
}

export function buildInviteMessage(displayName: string, url: string): string {
  return `${getGreeting(displayName)}

With joyful hearts, we warmly invite you to celebrate one of the most special days of our lives as we begin our journey together.

Please view our wedding invitation and all the event details through the link below 🌐:

${url}

Your presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.

With love,
❤️ ${COUPLE.groom} & ${COUPLE.bride}`;
}

/**
 * Read the guest from the current URL.
 * Supports /{name}?p={prefix} and the older ?title=&name= links.
 */
export function readGuestFromLocation(loc: Location = window.location): string {
  const params = new URLSearchParams(loc.search);

  // Legacy links: ?title=Mr.&name=Sanjaya
  const legacyName = params.get('name');
  if (legacyName) {
    const title = (params.get('title') || '').trim();
    const legacyPrefix = PREFIXES.find((p) => p.label === title)?.key ?? '';
    return getDisplayName(legacyPrefix, legacyName);
  }

  const segment = loc.pathname.replace(/^\/+|\/+$/g, '');
  // Ignore the home page, nested paths and anything that looks like a file
  if (!segment || segment.includes('/') || segment.includes('.')) return '';

  let name = '';
  try {
    name = decodeURIComponent(segment);
  } catch {
    return '';
  }
  if (name.toLowerCase() === 'admin') return '';

  const p = (params.get('p') || '').toLowerCase();
  return getDisplayName(isPrefixKey(p) ? p : '', name);
}
