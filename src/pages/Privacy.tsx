import React from 'react';
import { Shield, Lock, Eye, Key } from 'lucide-react';
import Header from '../components/Header';

const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      {/* Hero Section */}
      <div className="relative pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-purple via-neon-pink to-neon-blue opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-neon-purple via-neon-pink to-neon-blue bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Your privacy is our top priority. Learn how we protect and handle your data.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="space-y-16">
          <section>
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
              1. Information We Collect
            </h2>
            <div className="prose prose-invert">
              <p className="text-gray-300">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>Name and contact information</li>
                <li>Account credentials</li>
                <li>Payment information</li>
                <li>Security scan results and reports</li>
                <li>Communication preferences</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
              2. How We Use Your Information
            </h2>
            <div className="prose prose-invert">
              <p className="text-gray-300">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>Provide and improve our security services</li>
                <li>Process your transactions</li>
                <li>Send you technical notices and support messages</li>
                <li>Communicate with you about products, services, and events</li>
                <li>Protect against malicious or fraudulent activity</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
              3. Data Security
            </h2>
            <div className="prose prose-invert">
              <p className="text-gray-300">
                We implement robust security measures to protect your information:
              </p>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>End-to-end encryption for all sensitive data</li>
                <li>Regular security audits and penetration testing</li>
                <li>Secure data centers with 24/7 monitoring</li>
                <li>Employee security training and access controls</li>
                <li>Regular backup and disaster recovery procedures</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
              4. Data Sharing and Disclosure
            </h2>
            <div className="prose prose-invert">
              <p className="text-gray-300">
                We do not sell your personal information. We may share your information with:
              </p>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>Service providers who assist in our operations</li>
                <li>Law enforcement when required by law</li>
                <li>Professional advisors and auditors</li>
                <li>Business partners with your consent</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
              5. Your Rights and Choices
            </h2>
            <div className="prose prose-invert">
              <p className="text-gray-300">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Export your data in a portable format</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
              6. Contact Us
            </h2>
            <div className="prose prose-invert">
              <p className="text-gray-300">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <ul className="list-none pl-6 text-gray-300 space-y-2">
                <li>Email: privacy@securescanner.com</li>
                <li>Phone: +1 (555) 123-4567</li>
                <li>Address: 123 Security Street, Cyber City, CS 12345</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
              7. Updates to This Policy
            </h2>
            <div className="prose prose-invert">
              <p className="text-gray-300">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
              </p>
              <p className="text-gray-300 mt-4">
                Last Updated: February 14, 2025
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;