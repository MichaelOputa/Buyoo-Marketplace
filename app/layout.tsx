import './globals.css';
import type { Metadata } from 'next';
import { Inter, Sora } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { CookieConsent } from '@/components/cookie-consent';
import { Toaster } from '@/components/ui/sonner';
import { AppShell } from '@/components/app-shell';
import { SplashScreen } from '@/components/splash-screen';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://buyoo.com'),
  title: {
    default: 'Buyoo — Everything Around You',
    template: '%s | Buyoo',
  },
  description:
    'Buyoo is a modern marketplace connecting customers, vendors, brokers, and custom vendors. Buy, sell, advertise, and discover products and services around you.',
  keywords: [
    'marketplace',
    'buy and sell',
    'vendors',
    'brokers',
    'local businesses',
    'Africa marketplace',
    'Buyoo',
  ],
  authors: [{ name: 'Buyoo' }],
  creator: 'Buyoo',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://buyoo.com',
    siteName: 'Buyoo',
    title: 'Buyoo — Everything Around You',
    description:
      'Discover, buy, sell, and advertise products and services around you. A marketplace for customers, vendors, brokers, and custom vendors.',
    images: [
      {
        url: 'https://images.pexels.com/photos/4464821/pexels-photo-4464821.jpeg?auto=compress&cs=tinysrgb&w=1200',
        width: 1200,
        height: 630,
        alt: 'Buyoo Marketplace',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Buyoo — Everything Around You',
    description:
      'Discover, buy, sell, and advertise products and services around you.',
    images: [
      'https://images.pexels.com/photos/4464821/pexels-photo-4464821.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${sora.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <SplashScreen />
          <AppShell>{children}</AppShell>
          <CookieConsent />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
