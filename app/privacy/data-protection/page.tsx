import { PolicyLayout } from '@/components/policy-layout';
import { Shield } from 'lucide-react';

export const metadata = { title: 'Data Protection Policy', description: 'How Buyoo protects your personal data.' };

export default function DataProtectionPage() {
  return (
    <PolicyLayout>
      <div className="space-y-6">
        <div>
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Shield className="h-7 w-7" />
          </div>
          <h2 className="font-display text-2xl font-bold text-navy dark:text-white">Data Protection Policy</h2>
          <p className="mt-1 text-sm text-muted-foreground">Last updated: January 2024</p>
        </div>
        <Section title="1. Overview">This policy describes how Buyoo protects your personal data in compliance with the Nigeria Data Protection Regulation (NDPR) and international best practices.</Section>
        <Section title="2. Data Collection Principles">
          <ul className="list-disc space-y-2 pl-6">
            <li><strong>Lawfulness:</strong> We collect data with your consent or legitimate interest.</li>
            <li><strong>Fairness:</strong> We are transparent about what we collect and why.</li>
            <li><strong>Minimization:</strong> We only collect data necessary for the stated purpose.</li>
            <li><strong>Accuracy:</strong> We keep your data accurate and up to date.</li>
          </ul>
        </Section>
        <Section title="3. Security Measures">
          <ul className="list-disc space-y-2 pl-6">
            <li>HTTPS encryption for all communications.</li>
            <li>JWT authentication with secure token management.</li>
            <li>Password hashing using bcrypt.</li>
            <li>Rate limiting and DDoS protection.</li>
            <li>CSRF, XSS, and SQL injection protection.</li>
            <li>Two-factor authentication (2FA) support.</li>
            <li>Email and phone verification.</li>
            <li>Audit logs and device management.</li>
            <li>Session timeout and secure API authentication.</li>
          </ul>
        </Section>
        <Section title="4. Data Subject Rights">You have the right to access, correct, delete, export, and restrict the processing of your personal data. Exercise these rights in Settings or contact <a href="mailto:dpo@buyoo.com" className="text-primary hover:underline">dpo@buyoo.com</a>.</Section>
        <Section title="5. Data Breach Response">In the event of a data breach, we will notify affected users within 72 hours and take immediate steps to secure the platform.</Section>
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
