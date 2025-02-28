import React, { useState } from 'react';
import { 
  Network, 
  Shield, 
  Lock, 
  Globe, 
  AlertTriangle, 
  CheckCircle, 
  ArrowRight, 
  Activity, 
  Eye, 
  FileText, 
  Clock,
  Server,
  Database,
  Wifi,
  Cloud,
  Settings,
  Users,
  Search,
  Zap,
  FileWarning,
  Bell
} from 'lucide-react';
import Header from '../../components/Header';

const ConnectionSecurity: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  const features = [
    {
      id: 'network',
      icon: Network,
      title: 'Network Infrastructure',
      description: 'Deep analysis of your network architecture and security measures',
      details: [
        'Firewall configuration assessment',
        'Network segmentation analysis',
        'VPN security evaluation',
        'Router and switch security'
      ]
    },
    {
      id: 'ssl',
      icon: Lock,
      title: 'SSL/TLS Security',
      description: 'Comprehensive SSL/TLS certificate and configuration analysis',
      details: [
        'Certificate validation and expiry monitoring',
        'Protocol version assessment',
        'Cipher suite analysis',
        'HSTS implementation check'
      ]
    },
    {
      id: 'monitoring',
      icon: Activity,
      title: 'Real-time Monitoring',
      description: '24/7 connection security monitoring and instant alerts',
      details: [
        'Traffic pattern analysis',
        'Anomaly detection',
        'Performance monitoring',
        'Security event logging'
      ]
    }
  ];

  const securityChecks = [
    {
      category: 'Network Security',
      icon: Wifi,
      checks: [
        'Port scanning and analysis',
        'Network protocol security',
        'Wireless network security',
        'Network access controls'
      ]
    },
    {
      category: 'Data Protection',
      icon: Database,
      checks: [
        'Data encryption in transit',
        'Secure data transmission',
        'Data integrity checks',
        'Access logging and monitoring'
      ]
    },
    {
      category: 'Infrastructure',
      icon: Server,
      checks: [
        'Server configuration security',
        'Load balancer settings',
        'Proxy server analysis',
        'Infrastructure redundancy'
      ]
    },
    {
      category: 'Cloud Security',
      icon: Cloud,
      checks: [
        'Cloud service configuration',
        'API security assessment',
        'Cloud storage security',
        'Service integration security'
      ]
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Enhanced Security',
      description: 'Protect your network from unauthorized access and cyber threats'
    },
    {
      icon: Zap,
      title: 'Improved Performance',
      description: 'Optimize network connections for better speed and reliability'
    },
    {
      icon: Bell,
      title: 'Proactive Alerts',
      description: 'Get instant notifications about potential security issues'
    },
    {
      icon: FileWarning,
      title: 'Compliance',
      description: 'Meet industry standards and regulatory requirements'
    },
    {
      icon: Users,
      title: 'Access Control',
      description: 'Manage and monitor user access to network resources'
    },
    {
      icon: Search,
      title: 'Visibility',
      description: 'Gain complete visibility into your network security status'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      {/* Hero Section */}
      <div className="relative pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-purple via-neon-pink to-neon-blue opacity-10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=2670&q=80')] opacity-5 bg-cover bg-center" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-neon-pink/10 rounded-full mb-8">
              <Network className="w-5 h-5 text-neon-pink" />
              <span className="text-neon-pink font-medium">Advanced Connection Security</span>
            </div>
            <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-neon-purple via-neon-pink to-neon-blue bg-clip-text text-transparent">
              Secure Your Network Connections
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              Protect your digital infrastructure with our comprehensive connection security analysis and continuous monitoring system.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <button className="px-8 py-4 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg text-white font-medium hover:opacity-90 transition-opacity">
                Start Free Analysis
              </button>
              <button className="px-8 py-4 bg-gray-800 rounded-lg text-white font-medium hover:bg-gray-700 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
            Comprehensive Security Analysis
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Our advanced connection security analysis provides complete visibility into your network's security status and helps protect against potential threats.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className={`p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border transition-all duration-300 ${
                  selectedFeature === feature.id
                    ? 'border-neon-pink scale-105'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
                onClick={() => setSelectedFeature(selectedFeature === feature.id ? null : feature.id)}
              >
                <Icon className="w-8 h-8 text-neon-pink mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300 mb-4">{feature.description}</p>
                {selectedFeature === feature.id && (
                  <div className="space-y-2 animate-fade-in">
                    {feature.details.map((detail, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-neon-green mt-1 mr-2" />
                        <span className="text-gray-300">{detail}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Security Checks */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
              Comprehensive Security Checks
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our thorough security assessment covers all aspects of your network connections to ensure complete protection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {securityChecks.map((category, index) => {
              const Icon = category.icon;
              return (
                <div key={index} className="p-6 bg-black/30 rounded-xl border border-gray-700">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-neon-pink/10 rounded-lg">
                      <Icon className="w-6 h-6 text-neon-pink" />
                    </div>
                    <h3 className="text-lg font-bold text-white">{category.category}</h3>
                  </div>
                  <ul className="space-y-3">
                    {category.checks.map((check, checkIndex) => (
                      <li key={checkIndex} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-neon-green mt-1 mr-2" />
                        <span className="text-gray-300">{check}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
            Why Choose Our Connection Security
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Get comprehensive protection and monitoring for your network connections with our advanced security solution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700">
                <div className="w-12 h-12 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-300">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Process Steps */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our streamlined process ensures thorough security analysis and continuous protection for your network connections.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="p-6 bg-black/30 rounded-xl border border-gray-700">
              <div className="w-12 h-12 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">1. Initial Analysis</h3>
              <p className="text-gray-300">
                Comprehensive scan of your network infrastructure and security measures.
              </p>
            </div>

            <div className="p-6 bg-black/30 rounded-xl border border-gray-700">
              <div className="w-12 h-12 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">2. Security Assessment</h3>
              <p className="text-gray-300">
                Detailed evaluation of vulnerabilities and potential security risks.
              </p>
            </div>

            <div className="p-6 bg-black/30 rounded-xl border border-gray-700">
              <div className="w-12 h-12 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg flex items-center justify-center mb-4">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">3. Implementation</h3>
              <p className="text-gray-300">
                Deploy recommended security measures and protection systems.
              </p>
            </div>

            <div className="p-6 bg-black/30 rounded-xl border border-gray-700">
              <div className="w-12 h-12 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg flex items-center justify-center mb-4">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">4. Continuous Monitoring</h3>
              <p className="text-gray-300">
                24/7 security monitoring and real-time threat detection.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-purple via-neon-pink to-neon-blue opacity-10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=2670&q=80')] opacity-5 bg-cover bg-center" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
              Start Securing Your Connections Today
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Don't wait for a security breach. Protect your network infrastructure with our comprehensive security analysis and monitoring.
            </p>
            <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg text-white font-medium hover:opacity-90 transition-opacity group">
              Get Started Now
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionSecurity;