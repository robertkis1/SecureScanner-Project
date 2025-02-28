import React from 'react';
import { Key, Lock, Users, Shield, FileText, ArrowRight, CheckCircle, Settings } from 'lucide-react';
import Header from '../../components/Header';

const AccessManagement: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      {/* Hero Section */}
      <div className="relative pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-purple via-neon-pink to-neon-blue opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-neon-purple via-neon-pink to-neon-blue bg-clip-text text-transparent">
              Access Management
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Think of access management as your digital security guard, ensuring only the right people can access the right information at the right time.
            </p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700">
            <Users className="w-8 h-8 text-neon-pink mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">User Management</h3>
            <p className="text-gray-300 mb-4">
              Easily manage who has access to what in your organization.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-neon-green mt-1 mr-2" />
                <span className="text-gray-300">Create and manage user accounts</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-neon-green mt-1 mr-2" />
                <span className="text-gray-300">Assign roles and permissions</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-neon-green mt-1 mr-2" />
                <span className="text-gray-300">Track user activity</span>
              </li>
            </ul>
          </div>
          <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700">
            <Lock className="w-8 h-8 text-neon-pink mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Security Controls</h3>
            <p className="text-gray-300 mb-4">
              Implement strong security measures to protect your data.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-neon-green mt-1 mr-2" />
                <span className="text-gray-300">Multi-factor authentication</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-neon-green mt-1 mr-2" />
                <span className="text-gray-300">Password policies</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-neon-green mt-1 mr-2" />
                <span className="text-gray-300">Session management</span>
              </li>
            </ul>
          </div>
          <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700">
            <FileText className="w-8 h-8 text-neon-pink mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Audit & Compliance</h3>
            <p className="text-gray-300 mb-4">
              Keep track of who's accessing what and when.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-neon-green mt-1 mr-2" />
                <span className="text-gray-300">Detailed access logs</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-neon-green mt-1 mr-2" />
                <span className="text-gray-300">Compliance reporting</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-neon-green mt-1 mr-2" />
                <span className="text-gray-300">Security alerts</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
            Why Access Management Matters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-black/30 rounded-xl border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Protect Your Data</h3>
              <p className="text-gray-300 mb-4">
                In today's digital world, data is your most valuable asset. Access management ensures only authorized people can access sensitive information.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-neon-pink rounded-full mt-2 mr-2"></div>
                  <span className="text-gray-300">Prevent unauthorized access</span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-neon-pink rounded-full mt-2 mr-2"></div>
                  <span className="text-gray-300">Protect sensitive information</span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-neon-pink rounded-full mt-2 mr-2"></div>
                  <span className="text-gray-300">Control data sharing</span>
                </li>
              </ul>
            </div>
            <div className="p-6 bg-black/30 rounded-xl border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Maintain Compliance</h3>
              <p className="text-gray-300 mb-4">
                Meet regulatory requirements and industry standards with proper access controls and documentation.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-neon-pink rounded-full mt-2 mr-2"></div>
                  <span className="text-gray-300">Meet regulatory requirements</span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-neon-pink rounded-full mt-2 mr-2"></div>
                  <span className="text-gray-300">Document access controls</span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-neon-pink rounded-full mt-2 mr-2"></div>
                  <span className="text-gray-300">Demonstrate compliance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700">
            <div className="w-12 h-12 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">1. Setup</h3>
            <p className="text-gray-300">
              We help you set up user roles and access levels based on your organization's needs.
            </p>
          </div>
          <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700">
            <div className="w-12 h-12 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg flex items-center justify-center mb-4">
              <Key className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">2. Implementation</h3>
            <p className="text-gray-300">
              Deploy secure authentication methods and access controls across your systems.
            </p>
          </div>
          <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700">
            <div className="w-12 h-12 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg flex items-center justify-center mb-4">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">3. Management</h3>
            <p className="text-gray-300">
              Easily manage users, permissions, and access levels through our dashboard.
            </p>
          </div>
          <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700">
            <div className="w-12 h-12 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">4. Monitoring</h3>
            <p className="text-gray-300">
              Continuously monitor access patterns and receive alerts for suspicious activity.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-purple via-neon-pink to-neon-blue opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
              Secure Your Organization Today
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Take control of your digital access points and protect your valuable data with our comprehensive access management solution.
            </p>
            <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg text-white font-medium hover:opacity-90 transition-opacity group">
              Get Started
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessManagement;