'use client';

import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Blog', href: '/blog' },
    { label: 'Press', href: '/press' },
  ],
  Marketplace: [
    { label: 'Browse Products', href: '/marketplace' },
    { label: 'Become a Vendor', href: '/auth/signup' },
    { label: 'Become a Broker', href: '/auth/signup' },
    { label: 'Advertise', href: '/advertise' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy/privacy-policy' },
    { label: 'Terms of Service', href: '/privacy/terms-of-service' },
    { label: 'Cookie Policy', href: '/privacy/cookie-policy' },
    { label: 'Community Guidelines', href: '/privacy/community-guidelines' },
  ],
  Support: [
    { label: 'Help Center', href: '/help' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Safety Tips', href: '/safety' },
    { label: 'Report an Issue', href: '/report' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2 space-y-4">
            <Logo textClassName="text-white" />
            <p className="max-w-xs text-sm text-white/60">
              Everything Around You. Buyoo connects customers, vendors, brokers,
              and custom vendors in one seamless marketplace.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Youtube, href: '#' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-primary"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-3">
              <h4 className="text-sm font-semibold text-white">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 md:flex-row">
          <p className="text-sm text-white/50">
            &copy; {new Date().getFullYear()} Buyoo. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-white/50">
            <span className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" /> support@buyoo.com
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5" /> +234 700 BUYOO
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" /> Lagos, Nigeria
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
