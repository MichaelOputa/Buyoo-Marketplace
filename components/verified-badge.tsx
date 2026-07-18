'use client';

import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function VerifiedBadge({ className }: { className?: string }) {
  return (
    <CheckCircle2
      className={cn('h-4 w-4 fill-secondary text-white', className)}
      aria-label="Verified"
    />
  );
}
