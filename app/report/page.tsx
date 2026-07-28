'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Flag, AlertTriangle, Send } from 'lucide-react';
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

export default function ReportPage() {
  const [form, setForm] = useState({
    issueType: '',
    reference: '',
    email: '',
    description: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.issueType || !form.email.trim() || !form.description.trim()) {
      toast.error('Please select an issue type and fill in your email and description.');
      return;
    }
    if (!form.email.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }
    setSubmitting(true);
    // Simulated submission — wire up to your backend/ticketing system here.
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      toast.success('Report submitted. Our trust & safety team will review it shortly.');
      setForm({ issueType: '', reference: '', email: '', description: '' });
    }, 700);
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
          <Flag className="h-7 w-7" />
        </div>
        <h1 className="font-display text-3xl font-bold text-navy dark:text-white md:text-4xl">
          Report an Issue
        </h1>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          Tell us what happened — reports are reviewed by our trust & safety team, usually
          within 24-48 hours.
        </p>
      </motion.div>

      <Card className="mb-6 flex gap-3 border-primary/20 bg-primary/5 p-4">
        <AlertTriangle className="h-5 w-5 shrink-0 text-primary" />
        <p className="text-sm text-muted-foreground">
          If you're in immediate danger, please contact local emergency services first.
          This form is for reporting marketplace issues, not emergencies.
        </p>
      </Card>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="issueType">What are you reporting?</Label>
            <Select value={form.issueType} onValueChange={(v) => update('issueType', v)}>
              <SelectTrigger id="issueType">
                <SelectValue placeholder="Select an issue type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fraud">Fraud or scam</SelectItem>
                <SelectItem value="fake-listing">Fake or misleading listing</SelectItem>
                <SelectItem value="harassment">Harassment or abusive behavior</SelectItem>
                <SelectItem value="undelivered">Item or service not delivered</SelectItem>
                <SelectItem value="counterfeit">Counterfeit or prohibited item</SelectItem>
                <SelectItem value="account">Account or security concern</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="reference">Order, product, or vendor name (optional)</Label>
            <Input
              id="reference"
              value={form.reference}
              onChange={(e) => update('reference', e.target.value)}
              placeholder="e.g. Order #1234 or vendor name"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email">Your email</Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              placeholder="you@email.com"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="description">What happened?</Label>
            <Textarea
              id="description"
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
              placeholder="Please describe the issue in as much detail as possible."
              rows={6}
            />
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-destructive text-white hover:bg-destructive/90"
          >
            {submitting ? 'Submitting...' : (
              <>
                Submit report <Send className="ml-1.5 h-4 w-4" />
              </>
            )}
          </Button>

          {submitted && (
            <p className="text-center text-sm text-primary">
              Thank you — we've received your report and will follow up by email.
            </p>
          )}
        </form>
      </Card>
    </div>
  );
}
