import { PolicyLayout } from '@/components/policy-layout';
import { Users, Shield, RefreshCw, Store, Handshake } from 'lucide-react';

export const metadata = { title: 'Community Guidelines', description: 'Rules for being part of the Buyoo community.' };

export default function CommunityGuidelinesPage() {
  return (
    <PolicyLayout>
      <div className="space-y-6">
        <div>
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Users className="h-7 w-7" />
          </div>
          <h2 className="font-display text-2xl font-bold text-navy dark:text-white">Community Guidelines</h2>
          <p className="mt-1 text-sm text-muted-foreground">Last updated: January 2024</p>
        </div>
        <Section title="1. Be Respectful">Treat all members of the Buyoo community with respect. No harassment, hate speech, discrimination, or bullying will be tolerated.</Section>
        <Section title="2. Be Honest">Provide accurate descriptions and images of your products. Do not mislead buyers about condition, price, or availability.</Section>
        <Section title="3. Stay Safe">
          <ul className="list-disc space-y-2 pl-6">
            <li>Meet in public places for in-person transactions.</li>
            <li>Verify products before making payment.</li>
            <li>Use Buyoo&apos;s messaging system for all communication.</li>
            <li>Report suspicious activity immediately.</li>
          </ul>
        </Section>
        <Section title="4. No Prohibited Items">Do not list illegal items, weapons, drugs, counterfeit goods, or any items prohibited by Nigerian law.</Section>
        <Section title="5. No Spam">Do not send unsolicited messages, post duplicate listings, or engage in spammy behavior.</Section>
        <Section title="6. Report Violations">Help keep Buyoo safe by reporting violations. Use the Report button on any post or profile, or contact <a href="mailto:safety@buyoo.com" className="text-primary hover:underline">safety@buyoo.com</a>.</Section>
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
