import React from 'react';
import { Shield, Lock, AlertTriangle, CheckCircle, Key, Brain, Clock, ArrowRight } from 'lucide-react';
import Header from '../../components/Header';

const PasswordTestingImportance: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      {/* Hero Section */}
      <div className="relative pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-purple via-neon-pink to-neon-blue opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-neon-purple via-neon-pink to-neon-blue bg-clip-text text-transparent">
              Why Password Security Matters
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              In today's digital world, your password is often the only thing standing between your sensitive information and potential hackers.
            </p>
          </div>
        </div>
      </div>

      {/* Real-World Impact */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
              The Real Impact of Weak Passwords
            </h2>
            <p className="text-gray-300 mb-6">
              Every day, people and businesses lose access to their accounts, money, and sensitive information due to weak passwords. Here's what's at stake:
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-red-500 mt-1 mr-3" />
                <div>
                  <h3 className="text-white font-medium">Financial Loss</h3>
                  <p className="text-gray-400">Bank accounts, credit cards, and investment accounts can be compromised</p>
                </div>
              </div>
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-red-500 mt-1 mr-3" />
                <div>
                  <h3 className="text-white font-medium">Identity Theft</h3>
                  <p className="text-gray-400">Criminals can steal your identity and open accounts in your name</p>
                </div>
              </div>
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-red-500 mt-1 mr-3" />
                <div>
                  <h3 className="text-white font-medium">Privacy Breach</h3>
                  <p className="text-gray-400">Personal emails, photos, and private information can be exposed</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-neon-purple to-neon-pink opacity-20 rounded-2xl" />
            <img
              src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2670&q=80"
              alt="Cybersecurity Impact"
              className="rounded-2xl relative z-10 opacity-75"
            />
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
            Why Choose Our Password Testing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-black/30 rounded-xl border border-gray-700">
              <Brain className="w-8 h-8 text-neon-pink mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Expert Analysis</h3>
              <p className="text-gray-300">
                Our security experts personally review your password strength and provide easy-to-understand recommendations.
              </p>
            </div>
            <div className="p-6 bg-black/30 rounded-xl border border-gray-700">
              <Shield className="w-8 h-8 text-neon-pink mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Real Protection</h3>
              <p className="text-gray-300">
                We check your passwords against real-world hacking techniques and known security breaches.
              </p>
            </div>
            <div className="p-6 bg-black/30 rounded-xl border border-gray-700">
              <Lock className="w-8 h-8 text-neon-pink mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Privacy First</h3>
              <p className="text-gray-300">
                Your security is our priority. We never store your actual passwords and use advanced encryption.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Common Password Mistakes */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
          Common Password Mistakes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">What People Usually Do</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-red-500 mt-1 mr-3" />
                <div>
                  <p className="text-gray-300">Using personal information like birthdays or names</p>
                </div>
              </div>
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-red-500 mt-1 mr-3" />
                <div>
                  <p className="text-gray-300">Reusing the same password for multiple accounts</p>
                </div>
              </div>
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-red-500 mt-1 mr-3" />
                <div>
                  <p className="text-gray-300">Using simple, easy-to-guess passwords</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">What We Help You Do</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-neon-green mt-1 mr-3" />
                <div>
                  <p className="text-gray-300">Create strong, unique passwords that are still easy to remember</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-neon-green mt-1 mr-3" />
                <div>
                  <p className="text-gray-300">Use different passwords for different accounts safely</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-neon-green mt-1 mr-3" />
                <div>
                  <p className="text-gray-300">Implement secure password management strategies</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-purple via-neon-pink to-neon-blue opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
              Protect Your Digital Life Today
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Don't wait until it's too late. Let our experts help you secure your passwords and protect what matters most.
            </p>
            <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg text-white font-medium hover:opacity-90 transition-opacity group">
              Test Your Password Security
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordTestingImportance;