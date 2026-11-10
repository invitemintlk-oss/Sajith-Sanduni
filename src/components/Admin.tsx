import React, { useState } from 'react';
import { Copy, Link as LinkIcon, ArrowLeft, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import {
  PREFIXES,
  type PrefixKey,
  getDisplayName,
  getGreeting,
  buildInviteUrl,
  buildInviteMessage,
} from '../utils/guest';
import { GOLD_TEXT } from '../utils/gold';

const BROWN = '#6A1E33';

async function copyText(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // Fallback for browsers/contexts without the async clipboard API
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand('copy');
    area.remove();
    if (!ok) throw new Error('copy failed');
  }
}

export const Admin: React.FC = () => {
  const [prefix, setPrefix] = useState<PrefixKey>('mr');
  const [guestName, setGuestName] = useState('');
  const [generated, setGenerated] = useState<{ url: string; displayName: string } | null>(null);

  const liveDisplayName = getDisplayName(prefix, guestName);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) {
      toast.error('Please enter a guest name');
      return;
    }
    setGenerated({
      url: buildInviteUrl(window.location.origin, prefix, guestName),
      displayName: liveDisplayName,
    });
    toast.success('Invitation link generated');
  };

  // Editing the inputs makes the previous link stale until it is generated again
  const onPrefixChange = (value: PrefixKey) => {
    setPrefix(value);
    setGenerated(null);
  };
  const onNameChange = (value: string) => {
    setGuestName(value);
    setGenerated(null);
  };

  const copyLink = () =>
    generated &&
    copyText(generated.url)
      .then(() => toast.success('Link copied!'))
      .catch(() => toast.error('Could not copy. Please copy it manually.'));

  const copyMessage = () =>
    generated &&
    copyText(buildInviteMessage(generated.displayName, generated.url))
      .then(() => toast.success('Message copied!'))
      .catch(() => toast.error('Could not copy. Please copy it manually.'));

  const inputClass =
    'w-full bg-white px-5 py-3.5 rounded-xl border border-[#a77a3f]/25 focus:border-[#a77a3f]/60 focus:ring-2 focus:ring-[#a77a3f]/15 outline-none transition font-serif text-lg';
  const labelClass = 'block text-[11px] uppercase tracking-[0.25em] font-semibold mb-2';
  const copyBtnClass =
    'flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-full text-[11px] uppercase tracking-[0.2em] font-semibold transition active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100';

  return (
    <div className="min-h-screen bg-brand-blush py-10 px-4 sm:px-6 font-sans" style={{ color: BROWN }}>
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <a
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#a77a3f]/25 bg-white/70 hover:bg-white text-sm transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Invitation
          </a>
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold opacity-70">Admin</span>
        </div>

        <div className="text-center mb-10">
          <h1 className="font-['Pinyon_Script',_cursive] text-5xl sm:text-6xl leading-none pb-2" style={GOLD_TEXT}>
            Invitation Links
          </h1>
          <p className="mt-3 font-['Cormorant_Garamond',_serif] italic text-lg opacity-80">
            Create a personal homecoming link and WhatsApp message for each guest.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleGenerate}
          className="bg-white/80 rounded-3xl border border-[#a77a3f]/15 shadow-[0_20px_50px_-20px_rgba(106,30,51,0.25)] p-6 sm:p-8 space-y-6"
        >
          <div>
            <label htmlFor="prefix" className={labelClass}>
              Select Prefix
            </label>
            <select
              id="prefix"
              value={prefix}
              onChange={(e) => onPrefixChange(e.target.value as PrefixKey)}
              className={`${inputClass} cursor-pointer`}
            >
              {PREFIXES.map((p) => (
                <option key={p.key} value={p.key}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="guestName" className={labelClass}>
              Guest Name
            </label>
            <input
              id="guestName"
              type="text"
              placeholder="e.g. Sanjaya"
              value={guestName}
              onChange={(e) => onNameChange(e.target.value)}
              className={`${inputClass} placeholder:text-stone-400`}
              autoComplete="off"
            />
          </div>

          {/* Live greeting preview */}
          <div className="rounded-2xl bg-[#FFF3F5] border border-[#a77a3f]/15 px-5 py-4 text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] font-semibold opacity-60 mb-1">Greeting preview</p>
            <p className="font-['Cormorant_Garamond',_serif] text-2xl">
              {liveDisplayName ? getGreeting(liveDisplayName) : <span className="opacity-40 italic">Dear … ❤️</span>}
            </p>
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-full bg-[#6A1E33] hover:bg-[#4a1222] text-[#FFF3F5] text-xs uppercase tracking-[0.3em] font-semibold transition active:scale-[0.98]"
          >
            <LinkIcon className="w-4 h-4" />
            Generate Link
          </button>
        </form>

        {/* Result */}
        <div className="mt-6 bg-white/80 rounded-3xl border border-[#a77a3f]/15 shadow-[0_20px_50px_-20px_rgba(106,30,51,0.25)] p-6 sm:p-8 space-y-5">
          <div>
            <p className={labelClass}>Generated Link</p>
            {generated ? (
              <a
                href={generated.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block break-all rounded-xl bg-[#FFF3F5] border border-[#a77a3f]/20 px-4 py-3 font-mono text-sm text-[#a77a3f] hover:underline"
              >
                {generated.url}
              </a>
            ) : (
              <p className="rounded-xl border-2 border-dashed border-[#a77a3f]/20 px-4 py-3 text-sm italic opacity-60">
                Enter a name and click Generate Link.
              </p>
            )}
          </div>

          {generated && (
            <div>
              <p className={`${labelClass} flex items-center gap-2`}>
                <MessageCircle className="w-3.5 h-3.5" /> Message preview
              </p>
              <div className="whitespace-pre-wrap break-words rounded-xl bg-[#FFF3F5] border border-[#a77a3f]/15 p-4 text-sm leading-relaxed font-serif">
                {buildInviteMessage(generated.displayName, generated.url)}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={copyLink}
              disabled={!generated}
              className={`${copyBtnClass} border border-[#6A1E33]/30 hover:bg-[#6A1E33]/5`}
            >
              <Copy className="w-4 h-4" />
              Copy Link Only
            </button>
            <button
              type="button"
              onClick={copyMessage}
              disabled={!generated}
              className={`${copyBtnClass} bg-[#a77a3f] hover:bg-[#8c6430] text-[#FFF3F5]`}
            >
              <Copy className="w-4 h-4" />
              Copy Full Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
