'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageCircle, Send } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

const contactChannels = [
  { icon: Mail, label: 'Email', value: 'support@buyoo.com', href: 'mailto:support@buyoo.com' },
  { icon: Phone, label: 'Phone', value: '+234 700 BUYOO', href: 'tel:+234700289660' },
  { icon: MapPin, label: 'Office', value: 'Lagos, Nigeria', href: undefined },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', topic: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error('Please fill in your name, email, and message.');
      return;
    }
    if (!form.email.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }
    setSubmitting(true);
    // Simulated submission — wire up to your backend/email service here.
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      toast.success("Message sent! We'll get back to you within 1-2 business days.");
      setForm({ name: '', email: '', topic: '', message: '' });
    }, 700);
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <MessageCircle className="h-7 w-7" />
        </div>
        <h1 className="font-display text-3xl font-bold text-navy dark:text-white md:text-4xl">
          Contact Us
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Questions, feedback, or need a hand with something? We'd love to hear from you.
        </p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        {/* Contact channels */}
        <div className="space-y-4">
          {contactChannels.map((channel, i) => (
            <motion.div
              key={channel.label}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="flex items-center gap-4 p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <channel.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">{channel.label}</p>
                  {channel.href ? (
                    <a href={channel.href} className="font-medium text-navy hover:text-primary dark:text-white">
                      {channel.value}
                    </a>
                  ) : (
                    <p className="font-medium text-navy dark:text-white">{channel.value}</p>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">
              For urgent safety concerns, please use our{' '}
              <a href="/report" className="font-medium text-primary hover:underline">
                Report an Issue
              </a>{' '}
              form instead — it's routed directly to our trust & safety team.
            </p>
          </Card>
        </div>

        {/* Form */}
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  placeholder="you@email.com"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="topic">What's this about?</Label>
              <Select value={form.topic} onValueChange={(v) => update('topic', v)}>
                <SelectTrigger id="topic">
                  <SelectValue placeholder="Select a topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General question</SelectItem>
                  <SelectItem value="order">Order or payment issue</SelectItem>
                  <SelectItem value="vendor">Becoming a vendor or broker</SelectItem>
                  <SelectItem value="advertising">Advertising</SelectItem>
                  <SelectItem value="partnership">Partnership</SelectItem>
                  <SelectItem value="other">Something else</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={form.message}
                onChange={(e) => update('message', e.target.value)}
                placeholder="How can we help?"
                rows={5}
              />
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="w-full rounded-full bg-warm-orange-gradient text-white hover:opacity-90"
            >
              {submitting ? 'Sending...' : (
                <>
                  Send message <Send className="ml-1.5 h-4 w-4" />
                </>
              )}
            </Button>

            {submitted && (
              <p className="text-center text-sm text-primary">
                Thanks — your message is in! We'll reply by email shortly.
              </p>
            )}
          </form>
        </Card>
      </div>
    </div>
  );
}
