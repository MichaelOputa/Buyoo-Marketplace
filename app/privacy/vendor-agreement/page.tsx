import { PolicyLayout } from '@/components/policy-layout';
import { Store } from 'lucide-react';

export const metadata = { title: 'Vendor Agreement', description: 'Terms for vendors on Buyoo.' };

export default function VendorAgreementPage() {
  return (
    <PolicyLayout>
      <div className="space-y-6">
        <div>
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Store className="h-7 w-7" />
          </div>
          <h2 className="font-display text-2xl font-bold text-navy dark:text-white">Vendor Agreement</h2>
          <p className="mt-1 text-sm text-muted-foreground">Last updated: January 2024</p>
        </div>
        <Section title="1. Vendor Responsibilities">As a vendor on Buyoo, you agree to provide accurate product information, maintain adequate inventory, fulfill orders promptly, and respond to customer messages within 24 hours.</Section>
        <Section title="2. Product Listings">All listings must include accurate images, descriptions, and pricing. Counterfeit, stolen, or illegal products are strictly prohibited and will result in account termination.</Section>
        <Section title="3. Commission & Fees">Buyoo charges a commission on each sale as specified in your subscription plan. Additional fees may apply for advertisements and premium features.</Section>
        <Section title="4. Payouts">Vendor payouts are processed weekly to your registered bank account. Minimum payout threshold is ₦10,000. Payouts are subject to a 48-hour review period.</Section>
        <Section title="5. Ratings & Reviews">Vendors must not solicit fake reviews or retaliate against customers who leave negative feedback. Review responses must be professional.</Section>
        <Section title="6. Subscription Plans">Vendors can choose from Free, Pro, and Enterprise plans. Plan features and pricing are displayed on the subscription page. Plans can be upgraded or downgraded at any time.</Section>
        <Section title="7. Termination">Buyoo reserves the right to terminate vendor accounts that violate this agreement, have excessive negative reviews, or engage in fraudulent activity.</Section>
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
