import React from 'react';
import { Clock, Bell, Shield, AlertTriangle, FileText, ArrowRight, Activity, Eye } from 'lucide-react';
import Header from '../../components/Header';

const RealTimeMonitoring: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      {/* Hero Section */}
      <div className="relative pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-purple via-neon-pink to-neon-blue opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-neon-purple via-neon-pink to-neon-blue bg-clip-text text-transparent">
              Real-time Monitoring
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Think of our real-time monitoring as a 24/7 security camera for your digital assets, constantly watching for and alerting you to potential threats.
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
            <Activity className="w-8 h-8 text-neon-pink mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">24/7 Monitoring</h3>
            <p className="text-gray-300">
              Continuous monitoring of your systems for suspicious activities and potential threats.
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-neon-pink rounded-full mt-2 mr-2"></div>
                <span className="text-gray-300">Real-time threat detection</span>
              </li>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-neon-pink rounded-full mt-2 mr-2"></div>
                <span className="text-gray-300">Continuous system analysis</span>
              </li>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-neon-pink rounded-full mt-2 mr-2"></div>
                <span className="text-gray-300">Performance monitoring</span>
              </li>
            </ul>
          </div>
          <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700">
            <Bell className="w-8 h-8 text-neon-pink mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Instant Alerts</h3>
            <p className="text-gray-300">
              Get notified immediately when potential security threats are detected.
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-neon-pink rounded-full mt-2 mr-2"></div>
                <span className="text-gray-300">Customizable alerts</span>
              </li>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-neon-pink rounded-full mt-2 mr-2"></div>
                <span className="text-gray-300">Multiple notification channels</span>
              </li>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-neon-pink rounded-full mt-2 mr-2"></div>
                <span className="text-gray-300">Priority-based notifications</span>
              </li>
            </ul>
          </div>
          <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700">
            <Eye className="w-8 h-8 text-neon-pink mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Visual Dashboard</h3>
            <p className="text-gray-300">
              Easy-to-understand visual representation of your security status.
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-neon-pink rounded-full mt-2 mr-2"></div>
                <span className="text-gray-300">Real-time analytics</span>
              </li>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-neon-pink rounded-full mt-2 mr-2"></div>
                <span className="text-gray-300">Trend analysis</span>
              </li>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-neon-pink rounded-full mt-2 mr-2"></div>
                <span className="text-gray-300">Custom reports</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="p-6 bg-black/30 rounded-xl border border-gray-700">
              <div className="w-12 h-12 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">1. Monitor</h3>
              <p className="text-gray-300">
                Our system continuously monitors your digital infrastructure.
              </p>
            </div>
            <div className="p-6 bg-black/30 rounded-xl border border-gray-700">
              <div className="w-12 h-12 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">2. Detect</h3>
              <p className="text-gray-300">
                Identify potential threats and suspicious activities.
              </p>
            </div>
            <div className="p-6 bg-black/30 rounded-xl border border-gray-700">
              <div className="w-12 h-12 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg flex items-center justify-center mb-4">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">3. Alert</h3>
              <p className="text-gray-300">
                Send immediate notifications about potential security issues.
              </p>
            </div>
            <div className="p-6 bg-black/30 rounded-xl border border-gray-700">
              <div className="w-12 h-12 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">4. Respond</h3>
              <p className="text-gray-300">
                Take immediate action to address security concerns.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
          Why Real-time Monitoring Matters
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">Early Threat Detection</h3>
            <p className="text-gray-300 mb-4">
              Detect and respond to security threats before they can cause significant damage to your systems.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-neon-pink rounded-full mt-2 mr-2"></div>
                <span className="text-gray-300">Identify threats in real-time</span>
              </li>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-neon-pink rounded-full mt-2 mr-2"></div>
                <span className="text-gray-300">Prevent data breaches</span>
              </li>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-neon-pink rounded-full mt-2 mr-2"></div>
                <span className="text-gray-300">Minimize damage from attacks</span>
              </li>
            </ul>
          </div>
          <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">Proactive Security</h3>
            <p className="text-gray-300 mb-4">
              Stay ahead of potential security issues with proactive monitoring and alerts.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-neon-pink rounded-full mt-2 mr-2"></div>
                <span className="text-gray-300">Continuous system analysis</span>
              </li>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-neon-pink rounded-full mt-2 mr-2"></div>
                <span className="text-gray-300">Automated threat response</span>
              </li>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-neon-pink rounded-full mt-2 mr-2"></div>
                <span className="text-gray-300">Regular security updates</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-purple via-neon-pink to-neon-blue opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
              Start Monitoring Your Systems
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Don't wait for a security breach to think about monitoring. Get started with our real-time monitoring solution today.
            </p>
            <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg text-white font-medium hover:opacity-90 transition-opacity group">
              Start Free Trial
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeMonitoring;