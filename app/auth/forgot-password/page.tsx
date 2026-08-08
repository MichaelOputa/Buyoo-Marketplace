'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AnimatedBackground } from '@/components/animated-background';
import { createClient } from '@/lib/supabase-client';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/login`,
    });

    setLoading(false);

    if (error) {
      setError(error.message || 'Unable to send reset link.');
      return;
    }

    setSent(true);
    setMessage('If an account exists, a reset link has been sent.');
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatedBackground variant="soft" />
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="rounded-3xl border border-border/60 bg-card/90 p-8 shadow-2xl backdrop-blur-xl md:p-10">
            <div className="mb-8 flex flex-col items-center text-center">
              <Link href="/">
                <Logo className="mb-4" size="lg" />
              </Link>
              <h1 className="font-display text-2xl font-bold text-navy dark:text-white">Reset your password</h1>
              <p className="mt-1 text-sm text-muted-foreground">Enter your email and we’ll help you get back in.</p>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              {error ? <p className="text-sm text-destructive">{error}</p> : null}
              {message ? <p className="text-sm text-success">{message}</p> : null}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Sending...' : sent ? 'Link sent' : 'Send reset link'}
              </Button>
            </form>
            <Link href="/auth/login" className="mt-6 flex items-center gap-2 text-sm text-primary hover:underline">
              <ArrowLeft className="h-4 w-4" /> Back to sign in
            </Link>
            <div className="mt-6 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-secondary" />
              Secure password recovery
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
