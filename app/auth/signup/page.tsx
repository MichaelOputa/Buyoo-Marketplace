'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase-client';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Store,
  Users,
  Wrench,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
} from 'lucide-react';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AnimatedBackground } from '@/components/animated-background';
import { cn } from '@/lib/utils';

type AccountType = 'customer' | 'vendor' | 'broker' | 'custom';

const accountTypes: {
  id: AccountType;
  label: string;
  description: string;
  icon: typeof User;
  color: string;
}[] = [
  {
    id: 'customer',
    label: 'Customer',
    description: 'Browse, buy, and discover products near you',
    icon: User,
    color: 'bg-blue-500/10 text-blue-600 border-blue-500/30',
  },
  {
    id: 'vendor',
    label: 'Vendor',
    description: 'Sell products and manage your business',
    icon: Store,
    color: 'bg-primary/10 text-primary border-primary/30',
  },
  {
    id: 'broker',
    label: 'Broker',
    description: 'Connect buyers with sellers and earn commissions',
    icon: Users,
    color: 'bg-secondary/10 text-secondary border-secondary/30',
  },
  {
    id: 'custom',
    label: 'Custom Vendor',
    description: 'Offer custom services, quotes, and project management',
    icon: Wrench,
    color: 'bg-amber-500/10 text-amber-600 border-amber-500/30',
  },
];

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState<'select' | 'form'>('select');
  const [accountType, setAccountType] = useState<AccountType | null>(null);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', phone: '', businessName: '', category: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function selectType(type: AccountType) {
    setAccountType(type);
    setStep('form');
  }

  async function handleOAuth(provider: 'google' | 'apple') {
    const supabase = createClient();
    const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(searchParams.get('redirect') || '/')}`;

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo },
    });

    if (error) {
      setError(error.message);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    const supabase = createClient();
    const role =
      accountType === 'customer'
        ? 'CUSTOMER'
        : accountType === 'vendor'
        ? 'VENDOR'
        : accountType === 'broker'
        ? 'BROKER'
        : 'CUSTOM_VENDOR';

    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          name: form.name,
          role,
          phone: form.phone || undefined,
          businessName: form.businessName || undefined,
          category: form.category || undefined,
        },
      },
    });

    setLoading(false);

    if (error) {
      setError(error.message || 'Unable to create account.');
      return;
    }

    if (data.session) {
      router.push('/');
      return;
    }

    router.push('/auth/login');
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatedBackground variant="soft" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl"
        >
          <div className="rounded-3xl border border-border/60 bg-card/90 p-8 shadow-2xl backdrop-blur-xl md:p-10">
            <div className="mb-8 flex flex-col items-center text-center">
              <Link href="/">
                <Logo className="mb-4" size="lg" />
              </Link>
              <h1 className="font-display text-2xl font-bold text-navy dark:text-white">
                Create your account
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Join Buyoo — Everything Around You
              </p>
            </div>

            <AnimatePresence mode="wait">
              {step === 'select' ? (
                <motion.div
                  key="select"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <p className="mb-6 text-center text-sm font-medium text-muted-foreground">
                    Choose your account type to get started
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {accountTypes.map((type, i) => (
                      <motion.button
                        key={type.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        onClick={() => selectType(type.id)}
                        className={cn(
                          'group relative flex flex-col items-start gap-3 rounded-2xl border-2 p-5 text-left transition-all hover:shadow-lg',
                          'border-border hover:border-primary/40 hover:bg-primary/5'
                        )}
                      >
                        <div className={cn('flex h-12 w-12 items-center justify-center rounded-xl border', type.color)}>
                          <type.icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-navy dark:text-white">{type.label}</h3>
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            {type.description}
                          </p>
                        </div>
                        <ArrowRight className="absolute right-4 top-4 h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                      </motion.button>
                    ))}
                  </div>

                  <p className="mt-6 text-center text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <Link href="/auth/login" className="font-medium text-primary hover:underline">
                      Sign in
                    </Link>
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <button
                    onClick={() => setStep('select')}
                    className="mb-6 flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
                  >
                    <ArrowLeft className="h-4 w-4" /> Change account type
                  </button>

                  {accountType && (
                    <div className="mb-6 flex items-center gap-3 rounded-xl bg-primary/5 p-4">
                      <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg', accountTypes.find(t => t.id === accountType)?.color)}>
                        {(() => {
                          const Icon = accountTypes.find(t => t.id === accountType)?.icon || User;
                          return <Icon className="h-5 w-5" />;
                        })()}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-navy dark:text-white">
                          {accountTypes.find(t => t.id === accountType)?.label} Account
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {accountTypes.find(t => t.id === accountType)?.description}
                        </p>
                      </div>
                    </div>
                  )}

                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full name</Label>
                        <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            required
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-primary hover:text-primary/80"
                            onClick={() => setShowPassword((current) => !current)}
                          >
                            {showPassword ? 'Hide' : 'Show'}
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm password</Label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={form.confirmPassword}
                            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                            required
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-primary hover:text-primary/80"
                            onClick={() => setShowConfirmPassword((current) => !current)}
                          >
                            {showConfirmPassword ? 'Hide' : 'Show'}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone number</Label>
                        <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="businessName">Business name</Label>
                        <Input id="businessName" value={form.businessName} onChange={(e) => setForm({ ...form, businessName: e.target.value })} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Input id="category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
                    </div>
                    {error ? <p className="text-sm text-destructive">{error}</p> : null}
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? 'Creating account...' : 'Create account'}
                    </Button>
                  </form>

                  <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="h-px flex-1 bg-border" />
                    <span>or continue with</span>
                    <div className="h-px flex-1 bg-border" />
                  </div>

                  <div className="mt-6 space-y-3">
                    <SocialButton provider="google" onClick={() => handleOAuth('google')} />
                    <SocialButton provider="apple" onClick={() => handleOAuth('apple')} />
                  </div>

                  <p className="mt-6 text-center text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <Link href="/auth/login" className="font-medium text-primary hover:underline">
                      Sign in
                    </Link>
                  </p>

                  <div className="mt-6 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                    <ShieldCheck className="h-3.5 w-3.5 text-secondary" />
                    Protected with 256-bit encryption
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function SocialButton({ provider, onClick }: { provider: 'google' | 'apple'; onClick: () => void }) {
  const labels = { google: 'Sign up with Google', apple: 'Sign up with Apple' };
  return (
    <Button
      variant="outline"
      className="h-12 w-full rounded-xl justify-center"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      <ProviderIcon provider={provider} />
      <span className="ml-2 text-sm font-medium">{labels[provider]}</span>
      <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" />
    </Button>
  );
}

function ProviderIcon({ provider }: { provider: string }) {
  if (provider === 'google') {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
      </svg>
    );
  }
  if (provider === 'apple') {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
      </svg>
    );
  }
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#1877F2">
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z" />
    </svg>
  );
}
