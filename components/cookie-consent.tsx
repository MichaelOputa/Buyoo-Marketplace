'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, Check, X, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const CONSENT_KEY = 'buyoo-cookie-consent';

interface Consent {
  essential: true;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

export function CookieConsent() {
  const [show, setShow] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [prefs, setPrefs] = useState<Consent>({
    essential: true,
    analytics: false,
    marketing: false,
    functional: false,
  });

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  function saveConsent(consent: Consent) {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    setShow(false);
    setShowPrefs(false);
  }

  if (!show) return null;

  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 26 }}
            className="fixed bottom-4 left-4 right-4 z-[100] mx-auto max-w-2xl rounded-2xl border border-border bg-card/95 p-5 shadow-2xl backdrop-blur-lg md:p-6"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-start">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-warm-orange-gradient">
                <Cookie className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="font-display text-lg font-semibold text-navy dark:text-white">
                  We value your privacy
                </h3>
                <p className="text-sm text-muted-foreground">
                  Buyoo uses cookies to enhance your experience, provide personalized
                  content, and analyze our traffic. By clicking Accept All, you
                  consent to our use of cookies.{' '}
                  <a href="/privacy/cookie-policy" className="font-medium text-primary hover:underline">
                    Learn more
                  </a>
                </p>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  saveConsent({ essential: true, analytics: false, marketing: false, functional: false })
                }
              >
                <X className="mr-1.5 h-4 w-4" />
                Reject Non-Essential
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPrefs(true)}
              >
                <Settings className="mr-1.5 h-4 w-4" />
                Customize
              </Button>
              <Button
                size="sm"
                className="bg-warm-orange-gradient"
                onClick={() =>
                  saveConsent({ essential: true, analytics: true, marketing: true, functional: true })
                }
              >
                <Check className="mr-1.5 h-4 w-4" />
                Accept All
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog open={showPrefs} onOpenChange={setShowPrefs}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Cookie Preferences</DialogTitle>
            <DialogDescription>
              Choose which categories of cookies you allow. Essential cookies
              cannot be disabled as they are required for the site to function.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <PrefRow
              label="Essential"
              description="Required for core site functionality"
              checked={true}
              disabled
            />
            <PrefRow
              label="Analytics"
              description="Help us understand how visitors use our site"
              checked={prefs.analytics}
              onChange={(v) => setPrefs({ ...prefs, analytics: v })}
            />
            <PrefRow
              label="Functional"
              description="Enable enhanced features like saved preferences"
              checked={prefs.functional}
              onChange={(v) => setPrefs({ ...prefs, functional: v })}
            />
            <PrefRow
              label="Marketing"
              description="Used to show relevant advertisements"
              checked={prefs.marketing}
              onChange={(v) => setPrefs({ ...prefs, marketing: v })}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPrefs(false)}>
              Cancel
            </Button>
            <Button className="bg-warm-orange-gradient" onClick={() => saveConsent(prefs)}>
              Save Preferences
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function PrefRow({
  label,
  description,
  checked,
  disabled,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="space-y-0.5">
        <Label className="text-sm font-medium">{label}</Label>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <Switch checked={checked} disabled={disabled} onCheckedChange={onChange} />
    </div>
  );
}
