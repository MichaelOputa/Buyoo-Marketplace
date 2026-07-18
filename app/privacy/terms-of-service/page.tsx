import { PolicyLayout } from '@/components/policy-layout';
import { FileText } from 'lucide-react';

export const metadata = { title: 'Terms of Service', description: 'The terms governing your use of Buyoo.' };

export default function TermsPage() {
  return (
    <PolicyLayout>
      <div className="space-y-6">
        <div>
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <FileText className="h-7 w-7" />
          </div>
          <h2 className="font-display text-2xl font-bold text-navy dark:text-white">Terms of Service</h2>
          <p className="mt-1 text-sm text-muted-foreground">Last updated: January 2024</p>
        </div>
        <Section title="1. Acceptance of Terms">By accessing or using Buyoo, you agree to be bound by these Terms of Service. If you do not agree, please do not use our platform.</Section>
        <Section title="2. Eligibility">You must be at least 18 years old to create an account and use Buyoo. By registering, you confirm that you meet this requirement.</Section>
        <Section title="3. Account Types">
          Buyoo offers four account types: Customer, Vendor, Broker, and Custom Vendor. Each type has specific features and obligations outlined in their respective agreements.
        </Section>
        <Section title="4. User Responsibilities">
          <ul className="list-disc space-y-2 pl-6">
            <li>Provide accurate and complete information during registration.</li>
            <li>Maintain the confidentiality of your account credentials.</li>
            <li>Do not post false, misleading, or fraudulent listings.</li>
            <li>Respect intellectual property rights of others.</li>
            <li>Do not use the platform for illegal activities.</li>
          </ul>
        </Section>
        <Section title="5. Transactions">Buyoo facilitates transactions between users but is not a party to any sale. Vendors are responsible for product quality and delivery. Buyers are responsible for verifying products before purchase.</Section>
        <Section title="6. Prohibited Activities">
          <ul className="list-disc space-y-2 pl-6">
            <li>Selling counterfeit, stolen, or illegal products.</li>
            <li>Harassment, hate speech, or abusive behavior.</li>
            <li>Spamming or sending unsolicited messages.</li>
            <li>Attempting to circumvent payment systems.</li>
            <li>Creating fake or duplicate accounts.</li>
          </ul>
        </Section>
        <Section title="7. Fees">Buyoo may charge fees for certain services including advertisements, subscriptions, and commission on broker transactions. Fees are clearly displayed before any charge.</Section>
        <Section title="8. Termination">We reserve the right to suspend or terminate accounts that violate these Terms. You may delete your account at any time from Settings.</Section>
        <Section title="9. Limitation of Liability">Buyoo is not liable for indirect, incidental, or consequential damages arising from the use of our platform. Our maximum liability is limited to the fees paid in the preceding 12 months.</Section>
        <Section title="10. Contact">For questions about these Terms, contact <a href="mailto:legal@buyoo.com" className="text-primary hover:underline">legal@buyoo.com</a>.</Section>
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
