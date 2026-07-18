import { PolicyLayout } from '@/components/policy-layout';
import { FileText } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy',
  description: 'How Buyoo collects, uses, and protects your personal data.',
};

export default function PrivacyPolicyPage() {
  return (
    <PolicyLayout>
      <div className="space-y-6">
        <div>
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <FileText className="h-7 w-7" />
          </div>
          <h2 className="font-display text-2xl font-bold text-navy dark:text-white">Privacy Policy</h2>
          <p className="mt-1 text-sm text-muted-foreground">Last updated: January 2024</p>
        </div>

        <Section title="1. Introduction">
          Buyoo (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy
          explains how we collect, use, disclose, and safeguard your information when you use our
          marketplace platform. Please read this policy carefully.
        </Section>

        <Section title="2. Information We Collect">
          <p>We collect the following types of information:</p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li><strong>Account Information:</strong> Name, email, phone number, password (hashed), state, city.</li>
            <li><strong>Business Information:</strong> Business name, category, and description (for vendors and custom vendors).</li>
            <li><strong>Activity Data:</strong> Products viewed, searches, messages, orders, and interactions.</li>
            <li><strong>Device Information:</strong> IP address, browser type, device ID, and location data.</li>
            <li><strong>Payment Information:</strong> Processed securely through Paystack, Flutterwave, and Stripe.</li>
          </ul>
        </Section>

        <Section title="3. How We Use Your Information">
          <ul className="list-disc space-y-2 pl-6">
            <li>To create and manage your account.</li>
            <li>To facilitate transactions between buyers and sellers.</li>
            <li>To display relevant products and advertisements near you.</li>
            <li>To send notifications about orders, messages, and promotions.</li>
            <li>To provide customer support and resolve disputes.</li>
            <li>To comply with legal obligations and prevent fraud.</li>
          </ul>
        </Section>

        <Section title="4. Data Sharing">
          <p>We do not sell your personal data. We share information with:</p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>Other users (as needed for transactions and messaging).</li>
            <li>Payment processors (Paystack, Flutterwave, Stripe).</li>
            <li>Cloud storage providers (Cloudinary for images/videos).</li>
            <li>Map services (Google Maps API for location features).</li>
            <li>Law enforcement when legally required.</li>
          </ul>
        </Section>

        <Section title="5. Data Security">
          We implement enterprise-grade security measures including HTTPS, JWT authentication,
          password hashing, rate limiting, CSRF protection, XSS protection, SQL injection prevention,
          input validation, 2FA, email and phone verification, audit logs, device management,
          and session timeouts.
        </Section>

        <Section title="6. Your Rights">
          <ul className="list-disc space-y-2 pl-6">
            <li><strong>Access:</strong> Request a copy of your data.</li>
            <li><strong>Download:</strong> Export your personal information.</li>
            <li><strong>Delete:</strong> Request deletion of your account.</li>
            <li><strong>Correct:</strong> Update inaccurate information.</li>
            <li><strong>Opt-out:</strong> Manage marketing and cookie preferences.</li>
          </ul>
        </Section>

        <Section title="7. Data Retention">
          We retain your data for as long as your account is active. After deletion, we retain
          certain information for legal compliance and dispute resolution for up to 90 days.
        </Section>

        <Section title="8. Contact Us">
          If you have questions about this Privacy Policy, contact us at{' '}
          <a href="mailto:privacy@buyoo.com" className="text-primary hover:underline">privacy@buyoo.com</a>.
        </Section>
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
