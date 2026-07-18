import { PolicyLayout } from '@/components/policy-layout';
import { Cookie } from 'lucide-react';

export const metadata = { title: 'Cookie Policy', description: 'How Buyoo uses cookies and similar technologies.' };

export default function CookiePolicyPage() {
  return (
    <PolicyLayout>
      <div className="space-y-6">
        <div>
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Cookie className="h-7 w-7" />
          </div>
          <h2 className="font-display text-2xl font-bold text-navy dark:text-white">Cookie Policy</h2>
          <p className="mt-1 text-sm text-muted-foreground">Last updated: January 2024</p>
        </div>
        <Section title="1. What Are Cookies">Cookies are small text files stored on your device when you visit a website. They help us provide a better experience by remembering your preferences and analyzing usage.</Section>
        <Section title="2. Types of Cookies We Use">
          <ul className="list-disc space-y-2 pl-6">
            <li><strong>Essential:</strong> Required for core functionality like authentication and security.</li>
            <li><strong>Analytics:</strong> Help us understand how visitors use our platform.</li>
            <li><strong>Functional:</strong> Enable enhanced features like saved preferences and language settings.</li>
            <li><strong>Marketing:</strong> Used to show relevant advertisements based on your interests.</li>
          </ul>
        </Section>
        <Section title="3. Managing Cookies">On your first visit, you will see a cookie consent banner with options to Accept All, Reject Non-Essential, or Customize Preferences. You can change your preferences at any time in Settings under Cookie Preferences.</Section>
        <Section title="4. Third-Party Cookies">We use third-party services (Google Analytics, Google Maps, payment processors) that may set their own cookies. These are governed by their respective privacy policies.</Section>
        <Section title="5. Browser Controls">You can also control cookies through your browser settings. Note that disabling essential cookies may affect platform functionality.</Section>
        <Section title="6. Contact">For questions about cookies, contact <a href="mailto:privacy@buyoo.com" className="text-primary hover:underline">privacy@buyoo.com</a>.</Section>
      </div>
    </PolicyLayout>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-display text-lg font-semibold text-navy dark:text-white">{title}</h3>
      <div className="mt-2 space-y-2 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </div>
  );
}
