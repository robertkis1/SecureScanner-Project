import React from 'react';
import { Cookie, Shield, Settings, Clock } from 'lucide-react';
import Header from '../components/Header';

const Cookies: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      {/* Hero Section */}
      <div className="relative pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-purple via-neon-pink to-neon-blue opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-neon-purple via-neon-pink to-neon-blue bg-clip-text text-transparent">
              Cookie Policy
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Learn how we use cookies and similar technologies to improve your experience.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="space-y-16">
          <section>
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
              1. What Are Cookies?
            </h2>
            <div className="prose prose-invert">
              <p className="text-gray-300">
                Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by:
              </p>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>Remembering your preferences and settings</li>
                <li>Keeping you signed in to your account</li>
                <li>Understanding how you use our services</li>
                <li>Improving our website's performance</li>
                <li>Providing personalized content and features</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
              2. Types of Cookies We Use
            </h2>
            <div className="prose prose-invert">
              <p className="text-gray-300">
                We use the following types of cookies:
              </p>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>
                  <strong className="text-white">Essential Cookies:</strong>
                  <br />
                  Required for basic website functionality and security
                </li>
                <li>
                  <strong className="text-white">Functional Cookies:</strong>
                  <br />
                  Remember your preferences and settings
                </li>
                <li>
                  <strong className="text-white">Analytics Cookies:</strong>
                  <br />
                  Help us understand how visitors use our website
                </li>
                <li>
                  <strong className="text-white">Performance Cookies:</strong>
                  <br />
                  Improve website speed and performance
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
              3. Cookie Duration
            </h2>
            <div className="prose prose-invert">
              <p className="text-gray-300">
                Cookies can remain on your device for different periods:
              </p>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>
                  <strong className="text-white">Session Cookies:</strong>
                  <br />
                  Temporary cookies that expire when you close your browser
                </li>
                <li>
                  <strong className="text-white">Persistent Cookies:</strong>
                  <br />
                  Remain on your device for a set period or until manually deleted
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
              4. Third-Party Cookies
            </h2>
            <div className="prose prose-invert">
              <p className="text-gray-300">
                Some cookies are placed by third-party services that appear on our pages:
              </p>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>Analytics providers (e.g., Google Analytics)</li>
                <li>Payment processors</li>
                <li>Security services</li>
                <li>Social media platforms</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
              5. Managing Cookies
            </h2>
            <div className="prose prose-invert">
              <p className="text-gray-300">
                You can control and manage cookies in various ways:
              </p>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>Browser settings to block or delete cookies</li>
                <li>Our cookie consent tool to manage preferences</li>
                <li>Third-party opt-out tools</li>
                <li>Private browsing modes</li>
              </ul>
              <p className="text-gray-300 mt-4">
                Note: Blocking essential cookies may affect website functionality.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
              6. Your Choices
            </h2>
            <div className="prose prose-invert">
              <p className="text-gray-300">
                When you first visit our website, you can:
              </p>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>Accept all cookies</li>
                <li>Manage cookie preferences</li>
                <li>Accept only essential cookies</li>
                <li>Change preferences at any time</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
              7. Updates to This Policy
            </h2>
            <div className="prose prose-invert">
              <p className="text-gray-300">
                We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date.
              </p>
              <p className="text-gray-300 mt-4">
                Last Updated: February 14, 2025
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
              8. Contact Us
            </h2>
            <div className="prose prose-invert">
              <p className="text-gray-300">
                If you have any questions about our Cookie Policy, please contact us at:
              </p>
              <ul className="list-none pl-6 text-gray-300 space-y-2">
                <li>Email: privacy@securescanner.com</li>
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

export default Cookies;