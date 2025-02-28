import React from 'react';
import { Key, Shield, Lock, FileText, ArrowRight, CheckCircle, AlertTriangle, Brain, Database, Clock } from 'lucide-react';
import Header from '../../components/Header';

const PasswordTesting: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      {/* Hero Section */}
      <div className="relative pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-purple via-neon-pink to-neon-blue opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-neon-purple via-neon-pink to-neon-blue bg-clip-text text-transparent">
              Expert Password Testing
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Advanced password security analysis backed by cybersecurity experts, providing detailed insights and actionable recommendations.
            </p>
          </div>
        </div>
      </div>

      {/* Expert Analysis Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
              Expert-Backed Analysis
            </h2>
            <p className="text-gray-300 mb-6">
              Our password testing service combines advanced algorithms with expert analysis from seasoned cybersecurity professionals, ensuring comprehensive protection for your systems.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-neon-green mt-1 mr-3" />
                <div>
                  <h3 className="text-white font-medium">Real-World Testing</h3>
                  <p className="text-gray-400">Passwords are tested against actual attack scenarios and breach databases</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-neon-green mt-1 mr-3" />
                <div>
                  <h3 className="text-white font-medium">Expert Review</h3>
                  <p className="text-gray-400">Each analysis is reviewed by security professionals for accuracy</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-neon-green mt-1 mr-3" />
                <div>
                  <h3 className="text-white font-medium">Actionable Insights</h3>
                  <p className="text-gray-400">Receive detailed recommendations for improving password security</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-neon-purple to-neon-pink opacity-20 rounded-2xl" />
            <img
              src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2670&q=80"
              alt="Security Expert Analysis"
              className="rounded-2xl relative z-10 opacity-75"
            />
          </div>
        </div>
      </div>

      {/* Testing Process */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
            Comprehensive Testing Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="p-6 bg-black/30 rounded-xl border border-gray-700">
              <div className="w-12 h-12 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg flex items-center justify-center mb-4">
                <Key className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">1. Initial Analysis</h3>
              <p className="text-gray-300">
                Advanced algorithms analyze password strength and complexity
              </p>
            </div>
            <div className="p-6 bg-black/30 rounded-xl border border-gray-700">
              <div className="w-12 h-12 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg flex items-center justify-center mb-4">
                <Database className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">2. Breach Check</h3>
              <p className="text-gray-300">
                Cross-reference with known data breaches and compromised passwords
              </p>
            </div>
            <div className="p-6 bg-black/30 rounded-xl border border-gray-700">
              <div className="w-12 h-12 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">3. Expert Review</h3>
              <p className="text-gray-300">
                Security experts analyze results and provide custom recommendations
              </p>
            </div>
            <div className="p-6 bg-black/30 rounded-xl border border-gray-700">
              <div className="w-12 h-12 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">4. Detailed Report</h3>
              <p className="text-gray-300">
                Receive comprehensive reports with actionable insights
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Reporting Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
          Advanced Reporting System
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700">
            <FileText className="w-8 h-8 text-neon-pink mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Detailed Analysis Reports</h3>
            <p className="text-gray-300 mb-4">
              Comprehensive reports that break down each password's strengths and weaknesses.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-neon-pink rounded-full mt-2 mr-2"></div>
                <span className="text-gray-300">Strength assessment scores</span>
              </li>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-neon-pink rounded-full mt-2 mr-2"></div>
                <span className="text-gray-300">Vulnerability identification</span>
              </li>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-neon-pink rounded-full mt-2 mr-2"></div>
                <span className="text-gray-300">Historical breach data</span>
              </li>
            </ul>
          </div>
          <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700">
            <Brain className="w-8 h-8 text-neon-pink mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Expert Insights</h3>
            <p className="text-gray-300 mb-4">
              Professional analysis and recommendations from security experts.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-neon-pink rounded-full mt-2 mr-2"></div>
                <span className="text-gray-300">Custom security advice</span>
              </li>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-neon-pink rounded-full mt-2 mr-2"></div>
                <span className="text-gray-300">Best practice guidelines</span>
              </li>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-neon-pink rounded-full mt-2 mr-2"></div>
                <span className="text-gray-300">Risk mitigation strategies</span>
              </li>
            </ul>
          </div>
          <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700">
            <Clock className="w-8 h-8 text-neon-pink mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Continuous Monitoring</h3>
            <p className="text-gray-300 mb-4">
              Ongoing password security monitoring and alerts.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-neon-pink rounded-full mt-2 mr-2"></div>
                <span className="text-gray-300">Real-time breach alerts</span>
              </li>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-neon-pink rounded-full mt-2 mr-2"></div>
                <span className="text-gray-300">Regular security updates</span>
              </li>
              <li className="flex items-start">
                <div className="w-1.5 h-1.5 bg-neon-pink rounded-full mt-2 mr-2"></div>
                <span className="text-gray-300">Trend analysis reports</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-purple via-neon-pink to-neon-blue opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
              Start Testing Your Password Security
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Get expert-backed password security analysis and protect your systems from unauthorized access.
            </p>
            <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg text-white font-medium hover:opacity-90 transition-opacity group">
              Start Free Analysis
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordTesting;