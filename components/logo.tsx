'use client';

import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  showText?: boolean;
  showTagline?: boolean;
  textClassName?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizes = {
  sm: { mark: 'h-7 w-7', text: 'text-xl', tagline: 'text-[9px]' },
  md: { mark: 'h-9 w-9', text: 'text-2xl', tagline: 'text-[10px]' },
  lg: { mark: 'h-12 w-12', text: 'text-3xl', tagline: 'text-xs' },
  xl: { mark: 'h-20 w-20', text: 'text-5xl', tagline: 'text-sm' },
};

export function Logo({
  className,
  showText = true,
  showTagline = false,
  textClassName,
  size = 'md',
}: LogoProps) {
  const s = sizes[size];
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <LogoMark className={cn('shrink-0', s.mark)} />
      {showText && (
        <div className="flex flex-col">
          <span className={cn('font-display font-bold leading-none tracking-tight', s.text, textClassName)}>
            <span className="text-[#14213D] dark:text-white">Buy</span>
            <span className="text-[#34C759]">oo</span>
          </span>
          {showTagline && (
            <span className={cn('mt-0.5 font-sans text-gray-500 dark:text-gray-400', s.tagline)}>
              Everything around you
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0', className)}
      aria-label="Buyoo logo"
      role="img"
    >
      <defs>
        {/* Orange-to-green gradient matching the image */}
        <linearGradient id="buyooGrad" x1="80" y1="5" x2="10" y2="105" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF6B00" />
          <stop offset="35%" stopColor="#FFA500" />
          <stop offset="65%" stopColor="#8BC34A" />
          <stop offset="100%" stopColor="#34C759" />
        </linearGradient>
        {/* Soft drop shadow filter */}
        <filter id="shadow" x="-10%" y="-5%" width="120%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#34C759" floodOpacity="0.2" />
        </filter>
      </defs>

      {/* ── B letter mark ── */}
      {/*
        The letter B consists of:
        - A vertical stem on the left
        - Upper bowl (smaller) — becomes the shopping bag bump
        - Lower bowl (larger) — becomes the location pin bump
        All filled with the orange→green gradient
      */}

      {/* Vertical stem */}
      <rect x="12" y="8" width="18" height="94" rx="6" fill="url(#buyooGrad)" filter="url(#shadow)" />

      {/* Upper bowl — the top bump of the B */}
      <path
        d="M29 8 Q30 8 42 8 Q68 8 68 30 Q68 52 42 52 Q30 52 29 52 Z"
        fill="url(#buyooGrad)"
        filter="url(#shadow)"
      />

      {/* Lower bowl — the bottom bump of the B (slightly larger) */}
      <path
        d="M29 52 Q30 52 45 52 Q76 52 76 75 Q76 98 45 98 Q30 98 29 98 Z"
        fill="url(#buyooGrad)"
        filter="url(#shadow)"
      />

      {/* ── Shopping bag icon in upper bump ── */}
      {/* Bag body */}
      <rect x="37" y="22" width="20" height="18" rx="2.5" fill="white" />
      {/* Bag handle */}
      <path
        d="M42 22 Q42 17 47 17 Q52 17 52 22"
        stroke="white"
        strokeWidth="2.8"
        strokeLinecap="round"
        fill="none"
      />
      {/* Bag handle loops (two circles suggestion) */}
      <circle cx="42.5" cy="22" r="1.2" fill="url(#buyooGrad)" />
      <circle cx="51.5" cy="22" r="1.2" fill="url(#buyooGrad)" />

      {/* ── Location / map pin icon in lower bump ── */}
      {/* Pin head */}
      <circle cx="47" cy="70" r="10" fill="white" />
      {/* Pin tail */}
      <path
        d="M41 76 Q47 90 47 90 Q47 90 53 76"
        fill="white"
      />
      {/* Pin inner dot */}
      <circle cx="47" cy="70" r="4" fill="url(#buyooGrad)" />
    </svg>
  );
}

/** Full lockup SVG (mark + wordmark + tagline) — useful for splash / OG images */
export function LogoFull({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 380 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('w-full', className)}
      aria-label="Buyoo — Everything around you"
      role="img"
    >
      <defs>
        <linearGradient id="buyooGradFull" x1="80" y1="5" x2="10" y2="105" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF6B00" />
          <stop offset="35%" stopColor="#FFA500" />
          <stop offset="65%" stopColor="#8BC34A" />
          <stop offset="100%" stopColor="#34C759" />
        </linearGradient>
        <filter id="shadowFull" x="-10%" y="-5%" width="120%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#34C759" floodOpacity="0.2" />
        </filter>
      </defs>

      {/* Mark */}
      <rect x="12" y="8" width="18" height="94" rx="6" fill="url(#buyooGradFull)" filter="url(#shadowFull)" />
      <path d="M29 8 Q30 8 42 8 Q68 8 68 30 Q68 52 42 52 Q30 52 29 52 Z" fill="url(#buyooGradFull)" filter="url(#shadowFull)" />
      <path d="M29 52 Q30 52 45 52 Q76 52 76 75 Q76 98 45 98 Q30 98 29 98 Z" fill="url(#buyooGradFull)" filter="url(#shadowFull)" />
      <rect x="37" y="22" width="20" height="18" rx="2.5" fill="white" />
      <path d="M42 22 Q42 17 47 17 Q52 17 52 22" stroke="white" strokeWidth="2.8" strokeLinecap="round" fill="none" />
      <circle cx="42.5" cy="22" r="1.2" fill="url(#buyooGradFull)" />
      <circle cx="51.5" cy="22" r="1.2" fill="url(#buyooGradFull)" />
      <circle cx="47" cy="70" r="10" fill="white" />
      <path d="M41 76 Q47 90 47 90 Q47 90 53 76" fill="white" />
      <circle cx="47" cy="70" r="4" fill="url(#buyooGradFull)" />

      {/* Wordmark: "Buy" dark navy, "oo" green */}
      <text x="100" y="68" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="52" fill="#14213D">Buy</text>
      <text x="218" y="68" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="52" fill="#34C759">oo</text>

      {/* Tagline */}
      <text x="101" y="90" fontFamily="system-ui, sans-serif" fontWeight="400" fontSize="16" fill="#888">Everything around you</text>
    </svg>
  );
}
