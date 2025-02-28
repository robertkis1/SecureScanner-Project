import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Globe, Key, Clock, FileText, ChevronRight, AlertTriangle, CheckCircle, TrendingUp, AlertOctagon, Timer } from 'lucide-react';
import Header from '../components/Header';
import { useAuthStore } from '../store/authStore';

const FeatureCard: React.FC<{
  icon: React.ElementType;
  title: string;
  description: string;
}> = ({ icon: Icon, title, description }) => (
  <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700 hover:scale-105 transition-transform duration-300">
    <div className="w-12 h-12 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-white" />
    </div>
    <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
    <p className="text-sm text-gray-300">{description}</p>
  </div>
);

const StatCard: React.FC<{
  icon: React.ElementType;
  value: string;
  title: string;
  color: 'purple' | 'pink' | 'blue';
}> = ({ icon: Icon, value, title, color }) => {
  const gradients = {
    purple: 'from-neon-purple/20 to-neon-purple/5',
    pink: 'from-neon-pink/20 to-neon-pink/5',
    blue: 'from-neon-blue/20 to-neon-blue/5'
  };

  const borders = {
    purple: 'border-neon-purple/20',
    pink: 'border-neon-pink/20',
    blue: 'border-neon-blue/20'
  };

  const iconColors = {
    purple: 'text-neon-purple',
    pink: 'text-neon-pink',
    blue: 'text-neon-blue'
  };

  const valueGradients = {
    purple: 'from-neon-purple to-neon-pink',
    pink: 'from-neon-pink to-neon-purple',
    blue: 'from-neon-blue to-neon-purple'
  };

  return (
    <div className={`relative p-6 bg-gradient-to-br ${gradients[color]} backdrop-blur-sm rounded-xl border ${borders[color]} hover:scale-105 transition-transform duration-300 group`}>
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/50 rounded-xl -z-10" />
      <div className={`w-12 h-12 ${iconColors[color]} mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-full h-full" />
      </div>
      <p className={`text-3xl font-bold bg-gradient-to-r ${valueGradients[color]} bg-clip-text text-transparent mb-2`}>
        {value}
      </p>
      <p className="text-sm text-gray-400">{title}</p>
    </div>
  );
};

const Home: React.FC = () => {
  const { user, isLoading } = useAuthStore();

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      {/* Hero Section */}
      <div className="relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-purple via-neon-pink to-neon-blue opacity-10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2670&q=80')] opacity-5 bg-cover bg-center" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-neon-purple via-neon-pink to-neon-blue bg-clip-text text-transparent">
              Stay Secure in a Digital World
            </h1>
            <p className="text-lg text-gray-300 mb-6">
              In today's digital age, cyber threats are growing at an alarming rate. Protect your digital assets with our advanced security platform.
            </p>
            {!isLoading && !user && (
              <Link
                to="/login"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg text-white font-medium hover:opacity-90 transition-opacity group"
              >
                Start Securing Now
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            icon={AlertOctagon}
            value="60%"
            title="of small businesses close within six months of a cyber attack"
            color="purple"
          />
          <StatCard
            icon={TrendingUp}
            value="80%"
            title="of hacking-related breaches use weak or stolen passwords"
            color="pink"
          />
          <StatCard
            icon={Timer}
            value="39s"
            title="A new cyber attack occurs every 39 seconds on average"
            color="blue"
          />
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
            Comprehensive Security Solutions
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Our advanced platform helps identify and fix security weaknesses before hackers can exploit them.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={Globe}
            title="Website Security"
            description="Detect vulnerabilities in websites and applications before exploitation."
          />
          <FeatureCard
            icon={Key}
            title="Password Testing"
            description="Test password strength to protect sensitive accounts."
          />
          <FeatureCard
            icon={FileText}
            title="Security Reports"
            description="Get detailed insights and fix recommendations."
          />
          <FeatureCard
            icon={Clock}
            title="24/7 Monitoring"
            description="Automated security scans for continuous protection."
          />
        </div>
      </div>

      {/* Action Steps */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700">
            <AlertTriangle className="w-10 h-10 text-neon-pink mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">Identify Threats</h3>
            <ul className="space-y-2">
              <li className="flex items-start text-sm">
                <CheckCircle className="w-5 h-5 text-neon-green mr-2 flex-shrink-0 mt-0.5" />
                <span>Scan for SQL Injection, XSS attacks, and authentication vulnerabilities</span>
              </li>
              <li className="flex items-start text-sm">
                <CheckCircle className="w-5 h-5 text-neon-green mr-2 flex-shrink-0 mt-0.5" />
                <span>Test password strength against brute force attacks</span>
              </li>
              <li className="flex items-start text-sm">
                <CheckCircle className="w-5 h-5 text-neon-green mr-2 flex-shrink-0 mt-0.5" />
                <span>Monitor security 24/7 with automated scanning</span>
              </li>
            </ul>
          </div>

          <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700">
            <Shield className="w-10 h-10 text-neon-purple mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">Take Action</h3>
            <ul className="space-y-2">
              <li className="flex items-start text-sm">
                <CheckCircle className="w-5 h-5 text-neon-green mr-2 flex-shrink-0 mt-0.5" />
                <span>Get detailed reports with step-by-step fix recommendations</span>
              </li>
              <li className="flex items-start text-sm">
                <CheckCircle className="w-5 h-5 text-neon-green mr-2 flex-shrink-0 mt-0.5" />
                <span>Implement security best practices with expert guidance</span>
              </li>
              <li className="flex items-start text-sm">
                <CheckCircle className="w-5 h-5 text-neon-green mr-2 flex-shrink-0 mt-0.5" />
                <span>Stay ahead of threats with proactive security measures</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-purple via-neon-pink to-neon-blue opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
              Start Protecting Yourself Today
            </h2>
            <p className="text-gray-300 mb-8">
              Take preventative action before hackers strike. Start your security journey now.
            </p>
            {!isLoading && !user && (
              <Link
                to="/login"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg text-white font-medium hover:opacity-90 transition-opacity group"
              >
                Start Your Free Security Scan
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <span className="text-lg font-semibold text-neon-pink">SecureScanner</span>
              </div>
              <p className="text-sm text-gray-400">
                Protecting your digital assets with advanced security solutions.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/services/vulnerability-scanning" className="text-gray-400 hover:text-white transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link to="/cookies" className="text-gray-400 hover:text-white transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-white font-semibold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-neon-pink hover:bg-gray-700 transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-neon-pink hover:bg-gray-700 transition-colors"
                  aria-label="Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-neon-pink hover:bg-gray-700 transition-colors"
                  aria-label="YouTube"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.418-4.814a2.507 2.507 0 0 1 1.768-1.768C5.746 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-neon-pink hover:bg-gray-700 transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" clipRule="evenodd" />
                  </svg>
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-neon-pink hover:bg-gray-700 transition-colors"
                  aria-label="GitHub"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-8 border-t border-gray-800">
            <p className="text-center text-gray-400 text-sm">
              © {new Date().getFullYear()} SecureScanner. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;