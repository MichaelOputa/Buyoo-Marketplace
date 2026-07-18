'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronLeft, FileText, Cookie, Users, Shield, RefreshCw, Store, Handshake } from 'lucide-react';
import { Logo } from '@/components/logo';
import { cn } from '@/lib/utils';

const policies = [
  { slug: 'privacy-policy', label: 'Privacy Policy', icon: Shield },
  { slug: 'terms-of-service', label: 'Terms of Service', icon: FileText },
  { slug: 'cookie-policy', label: 'Cookie Policy', icon: Cookie },
  { slug: 'community-guidelines', label: 'Community Guidelines', icon: Users },
  { slug: 'data-protection', label: 'Data Protection', icon: Shield },
  { slug: 'refund-policy', label: 'Refund Policy', icon: RefreshCw },
  { slug: 'vendor-agreement', label: 'Vendor Agreement', icon: Store },
  { slug: 'broker-agreement', label: 'Broker Agreement', icon: Handshake },
];

export function PolicyLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const currentSlug = pathname.split('/').pop();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:px-6">
      <Link href="/" className="mb-6 flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground">
        <ChevronLeft className="h-4 w-4" /> Back to Buyoo
      </Link>

      <div className="mb-8">
        <Logo className="mb-4" />
        <h1 className="font-display text-3xl font-bold text-navy dark:text-white">
          Legal & Privacy
        </h1>
        <p className="mt-2 text-muted-foreground">
          Your privacy and trust matter to us. Review our policies below.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        {/* Sidebar */}
        <nav className="lg:sticky lg:top-20 lg:h-fit">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide lg:flex-col lg:gap-1">
            {policies.map((policy) => {
              const isActive = currentSlug === policy.slug;
              return (
                <Link
                  key={policy.slug}
                  href={`/privacy/${policy.slug}`}
                  className={cn(
                    'flex shrink-0 items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  <policy.icon className="h-4 w-4" />
                  {policy.label}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Content */}
        <div className="prose prose-sm dark:prose-invert max-w-none">
          {children}
        </div>
      </div>
    </div>
  );
}
