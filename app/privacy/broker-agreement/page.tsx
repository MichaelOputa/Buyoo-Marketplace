import { PolicyLayout } from '@/components/policy-layout';
import { Handshake } from 'lucide-react';

export const metadata = { title: 'Broker Agreement', description: 'Terms for brokers on Buyoo.' };

export default function BrokerAgreementPage() {
  return (
    <PolicyLayout>
      <div className="space-y-6">
        <div>
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Handshake className="h-7 w-7" />
          </div>
          <h2 className="font-display text-2xl font-bold text-navy dark:text-white">Broker Agreement</h2>
          <p className="mt-1 text-sm text-muted-foreground">Last updated: January 2024</p>
        </div>
        <Section title="1. Broker Role">Brokers on Buyoo connect buyers with sellers and earn commissions on successful transactions. Brokers do not take ownership of products.</Section>
        <Section title="2. Client Management">Brokers must maintain professional relationships with clients, provide accurate information, and act in the best interest of both parties.</Section>
        <Section title="3. Commission Structure">Commission rates are agreed upon between the broker and the parties involved. Buyoo charges a platform fee of 5% on broker earnings. Commissions are tracked automatically through the platform.</Section>
        <Section title="4. Earnings & Withdrawals">Broker earnings are available for withdrawal once a transaction is completed and the 7-day dispute window has passed. Minimum withdrawal amount is ₦5,000.</Section>
        <Section title="5. Performance Standards">Brokers must maintain a minimum rating of 4.0 and respond to client requests within 12 hours. Consistently poor performance may result in account suspension.</Section>
        <Section title="6. Prohibited Practices">
          <ul className="list-disc space-y-2 pl-6">
            <li>Charging clients above the agreed commission.</li>
            <li>Misrepresenting products or vendors.</li>
            <li>Directing transactions outside the platform.</li>
            <li>Sharing client contact information with third parties.</li>
          </ul>
        </Section>
        <Section title="7. Termination">Buyoo may terminate broker accounts that violate this agreement or engage in fraudulent activity. Brokers may also terminate their account with 30 days notice.</Section>
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
