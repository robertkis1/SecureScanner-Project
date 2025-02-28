import React from 'react';
import { Shield, FileText, AlertTriangle, CheckCircle } from 'lucide-react';
import Header from '../components/Header';

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      {/* Hero Section */}
      <div className="relative pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-purple via-neon-pink to-neon-blue opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-neon-purple via-neon-pink to-neon-blue bg-clip-text text-transparent">
              Terms and Conditions
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Please read these terms carefully before using our services.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="space-y-16">
          <section>
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
              1. Acceptance of Terms
            </h2>
            <div className="prose prose-invert">
              <p className="text-gray-300">
                By accessing and using SecureScanner's services, you agree to be bound by these Terms and Conditions and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing our services.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
              2. Service Description
            </h2>
            <div className="prose prose-invert">
              <p className="text-gray-300">
                SecureScanner provides cybersecurity services including:
              </p>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>Web application security scanning</li>
                <li>Password strength testing</li>
                <li>Vulnerability assessments</li>
                <li>Security monitoring</li>
                <li>Automated security scanning</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
              3. User Responsibilities
            </h2>
            <div className="prose prose-invert">
              <p className="text-gray-300">
                You agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>Only test systems you own or have explicit permission to test</li>
                <li>Maintain the confidentiality of your account credentials</li>
                <li>Notify us immediately of any unauthorized access</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Not use our services for malicious purposes</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
              4. Payment Terms
            </h2>
            <div className="prose prose-invert">
              <p className="text-gray-300">
                Payment terms include:
              </p>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>All fees are charged in advance</li>
                <li>Subscription renewals are automatic unless cancelled</li>
                <li>Refunds are provided according to our refund policy</li>
                <li>Prices may change with 30 days notice</li>
                <li>Late payments may result in service suspension</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
              5. Intellectual Property
            </h2>
            <div className="prose prose-invert">
              <p className="text-gray-300">
                All content, features, and functionality of our services are owned by SecureScanner and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
              6. Limitation of Liability
            </h2>
            <div className="prose prose-invert">
              <p className="text-gray-300">
                SecureScanner shall not be liable for:
              </p>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>Indirect, incidental, or consequential damages</li>
                <li>Loss of profits or revenue</li>
                <li>Data loss or corruption</li>
                <li>Service interruptions or delays</li>
                <li>Third-party actions or claims</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
              7. Termination
            </h2>
            <div className="prose prose-invert">
              <p className="text-gray-300">
                We may terminate or suspend your account and access to our services:
              </p>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>For violations of these terms</li>
                <li>For illegal or unauthorized use</li>
                <li>For non-payment of fees</li>
                <li>At our sole discretion</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
              8. Changes to Terms
            </h2>
            <div className="prose prose-invert">
              <p className="text-gray-300">
                We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through our services. Continued use of our services after such modifications constitutes acceptance of the updated terms.
              </p>
              <p className="text-gray-300 mt-4">
                Last Updated: February 14, 2025
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
              9. Contact Information
            </h2>
            <div className="prose prose-invert">
              <p className="text-gray-300">
                For questions about these Terms and Conditions, please contact us at:
              </p>
              <ul className="list-none pl-6 text-gray-300 space-y-2">
                <li>Email: legal@securescanner.com</li>
                <li>Phone: +1 (555) 123-4567</li>
                <li>Address: 123 Security Street, Cyber City, CS 12345</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;