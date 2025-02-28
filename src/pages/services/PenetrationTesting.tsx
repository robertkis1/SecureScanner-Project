import React from 'react';
import { Lock, Target, Shield, AlertTriangle, FileText, ArrowRight, CheckCircle, Users } from 'lucide-react';
import Header from '../../components/Header';

const PenetrationTesting: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      {/* Hero Section */}
      <div className="relative pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-purple via-neon-pink to-neon-blue opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-neon-purple via-neon-pink to-neon-blue bg-clip-text text-transparent">
              Penetration Testing
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Think of penetration testing as hiring a professional locksmith to try to break into your house. We attempt to hack your systems (safely) to find security holes before real attackers do.
            </p>
          </div>
        </div>
      </div>

      {/* What is Pen Testing */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
              What is Penetration Testing?
            </h2>
            <p className="text-gray-300 mb-6">
              Penetration testing, or "pen testing," is like a fire drill for your digital security. Instead of waiting for a real attack, we simulate one in a controlled, safe way to find and fix vulnerabilities.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-neon-green mt-1 mr-3" />
                <div>
                  <h3 className="text-white font-medium">Safe and Controlled</h3>
                  <p className="text-gray-400">We test your systems without risking your data or operations</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-neon-green mt-1 mr-3" />
                <div>
                  <h3 className="text-white font-medium">Thorough Assessment</h3>
                  <p className="text-gray-400">We check for all types of security weaknesses</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-neon-green mt-1 mr-3" />
                <div>
                  <h3 className="text-white font-medium">Expert Analysis</h3>
                  <p className="text-gray-400">Get insights from certified security professionals</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-neon-purple to-neon-pink opacity-20 rounded-2xl" />
            <img
              src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2670&q=80"
              alt="Security Operations Center"
              className="rounded-2xl relative z-10 opacity-75"
            />
          </div>
        </div>
      </div>

      {/* Process Steps */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
            Our Testing Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="p-6 bg-black/30 rounded-xl border border-gray-700">
              <div className="w-12 h-12 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">1. Planning</h3>
              <p className="text-gray-300">
                We work with you to understand your systems and set testing boundaries.
              </p>
            </div>
            <div className="p-6 bg-black/30 rounded-xl border border-gray-700">
              <div className="w-12 h-12 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">2. Testing</h3>
              <p className="text-gray-300">
                Our experts attempt to find security weaknesses using professional tools and techniques.
              </p>
            </div>
            <div className="p-6 bg-black/30 rounded-xl border border-gray-700">
              <div className="w-12 h-12 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">3. Analysis</h3>
              <p className="text-gray-300">
                We analyze our findings and prepare a detailed report of vulnerabilities.
              </p>
            </div>
            <div className="p-6 bg-black/30 rounded-xl border border-gray-700">
              <div className="w-12 h-12 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">4. Remediation</h3>
              <p className="text-gray-300">
                We provide clear steps to fix any vulnerabilities we discover.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
          Why Choose Our Penetration Testing
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700">
            <Users className="w-8 h-8 text-neon-pink mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Expert Team</h3>
            <p className="text-gray-300">
              Our certified security professionals have years of experience in identifying and exploiting security vulnerabilities.
            </p>
          </div>
          <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700">
            <Target className="w-8 h-8 text-neon-pink mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Comprehensive Testing</h3>
            <p className="text-gray-300">
              We use the same tools and techniques as real attackers to ensure thorough testing of your systems.
            </p>
          </div>
          <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700">
            <AlertTriangle className="w-8 h-8 text-neon-pink mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Clear Results</h3>
            <p className="text-gray-300">
              Get detailed reports with actionable recommendations that both technical and non-technical staff can understand.
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
              Ready to Test Your Security?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Don't wait for attackers to find your vulnerabilities. Let our experts help you strengthen your security today.
            </p>
            <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg text-white font-medium hover:opacity-90 transition-opacity group">
              Schedule a Consultation
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PenetrationTesting;