import { PolicyLayout } from '@/components/policy-layout';
import { RefreshCw, Store, Handshake } from 'lucide-react';

export const metadata = { title: 'Refund Policy', description: 'Buyoo refund and return policy.' };

export default function RefundPolicyPage() {
  return (
    <PolicyLayout>
      <div className="space-y-6">
        <div>
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <RefreshCw className="h-7 w-7" />
          </div>
          <h2 className="font-display text-2xl font-bold text-navy dark:text-white">Refund Policy</h2>
          <p className="mt-1 text-sm text-muted-foreground">Last updated: January 2024</p>
        </div>
        <Section title="1. Eligibility">Refunds are available for products that are damaged, defective, or significantly different from the listing description. Refund requests must be made within 7 days of delivery.</Section>
        <Section title="2. How to Request a Refund">
          <ul className="list-disc space-y-2 pl-6">
            <li>Go to Orders in your dashboard.</li>
            <li>Select the order and click &quot;Request Refund&quot;.</li>
            <li>Provide photos and a description of the issue.</li>
            <li>The vendor has 48 hours to respond.</li>
          </ul>
        </Section>
        <Section title="3. Escrow Protection">Payments made through Buyoo are held in escrow until you confirm receipt of the product. If there is a dispute, funds are held until resolution.</Section>
        <Section title="4. Refund Processing">Approved refunds are processed to the original payment method within 5-10 business days. Bank transfers may take longer depending on your bank.</Section>
        <Section title="5. Non-Refundable Items">
          <ul className="list-disc space-y-2 pl-6">
            <li>Custom-made products (unless defective).</li>
            <li>Perishable goods (food, agricultural produce).</li>
            <li>Services already rendered.</li>
            <li>Products damaged after delivery.</li>
          </ul>
        </Section>
        <Section title="6. Split Payments">For split payments, refunds are distributed proportionally to each payment method used.</Section>
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
