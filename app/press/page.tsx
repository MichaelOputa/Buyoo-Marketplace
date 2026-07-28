'use client';

import { motion } from 'framer-motion';
import { Newspaper, Download, Mail, Image as ImageIcon, FileText } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';

const assets = [
  { icon: ImageIcon, title: 'Logo pack', description: 'Buyoo logo in light, dark, and icon-only formats (SVG & PNG).' },
  { icon: FileText, title: 'Brand guidelines', description: 'Colors, typography, and usage rules for the Buyoo brand.' },
  { icon: Newspaper, title: 'Company fact sheet', description: 'Key facts, figures, and boilerplate copy for reporters.' },
];

export default function PressPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Newspaper className="h-7 w-7" />
        </div>
        <h1 className="font-display text-3xl font-bold text-navy dark:text-white md:text-4xl">
          Press & Media
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Resources for journalists and partners covering Buyoo. For interviews,
          quotes, or anything else, reach out — we usually respond within a day.
        </p>
      </motion.div>

      {/* About blurb */}
      <Card className="mt-10 p-6">
        <div className="mb-4">
          <Logo />
        </div>
        <h2 className="mb-2 font-semibold text-navy dark:text-white">Boilerplate</h2>
        <p className="text-sm text-muted-foreground">
          Buyoo is a Nigeria-based marketplace connecting customers, vendors, brokers, and
          custom vendors in one platform. Buyoo's mission is to make it effortless for
          anyone to discover, buy, sell, and advertise everything around them, with trust
          and transparency built into every transaction.
        </p>
      </Card>

      {/* Media kit */}
      <section className="mt-10">
        <h2 className="mb-4 font-display text-xl font-bold text-navy dark:text-white">Media kit</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {assets.map((asset, i) => (
            <motion.div
              key={asset.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="flex h-full flex-col p-5">
                <asset.icon className="mb-3 h-6 w-6 text-primary" />
                <h3 className="mb-1.5 font-semibold text-navy dark:text-white">{asset.title}</h3>
                <p className="mb-4 flex-1 text-sm text-muted-foreground">{asset.description}</p>
                <p className="text-xs font-medium text-muted-foreground">Available on request</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Coverage */}
      <section className="mt-10">
        <h2 className="mb-4 font-display text-xl font-bold text-navy dark:text-white">In the news</h2>
        <Card className="p-6 text-center text-sm text-muted-foreground">
          No press coverage yet — check back soon, or get in touch if you're covering us.
        </Card>
      </section>

      {/* CTA */}
      <Card className="mt-10 flex flex-col items-center gap-4 bg-navy p-8 text-center text-white">
        <Mail className="h-7 w-7 text-primary" />
        <div>
          <h3 className="font-display text-xl font-bold">Media inquiries</h3>
          <p className="mt-1 text-white/70">We're happy to talk vendors, growth, or the story behind Buyoo.</p>
        </div>
        <Button asChild size="lg" className="rounded-full bg-warm-orange-gradient text-white hover:opacity-90">
          <a href="mailto:press@buyoo.com">
            <Mail className="mr-1.5 h-4 w-4" /> press@buyoo.com
          </a>
        </Button>
      </Card>
    </div>
  );
}
