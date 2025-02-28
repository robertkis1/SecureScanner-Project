import React from 'react';
import { Shield, Award, Users, Target, TrendingUp, Globe } from 'lucide-react';
import Header from '../components/Header';

const StatCard: React.FC<{ icon: React.ElementType; value: string; label: string }> = ({
  icon: Icon,
  value,
  label,
}) => (
  <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700">
    <Icon className="w-8 h-8 text-neon-pink mb-4" />
    <div className="text-3xl font-bold text-white mb-2">{value}</div>
    <div className="text-gray-400">{label}</div>
  </div>
);

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2670&q=80')] opacity-10 bg-cover bg-center" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-neon-purple via-neon-pink to-neon-blue bg-clip-text text-transparent">
              Securing the Digital Future
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Since 2003, SecureScanner has been at the forefront of cybersecurity innovation,
              protecting businesses worldwide from evolving digital threats.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <StatCard icon={Shield} value="20+" label="Years Experience" />
          <StatCard icon={Users} value="10,000+" label="Clients Protected" />
          <StatCard icon={Globe} value="150+" label="Countries Served" />
          <StatCard icon={Target} value="99.99%" label="Threat Detection Rate" />
          <StatCard icon={Award} value="50+" label="Security Awards" />
          <StatCard icon={TrendingUp} value="24/7" label="Monitoring & Support" />
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
              Our Mission
            </h2>
            <p className="text-gray-300 mb-6">
              At SecureScanner, we believe in a future where every organization can operate with
              complete confidence in their digital security. Our mission is to make enterprise-grade
              security accessible to businesses of all sizes.
            </p>
            <p className="text-gray-300">
              Through continuous innovation and a commitment to excellence, we've developed cutting-edge
              security solutions that protect against the most sophisticated cyber threats.
            </p>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-neon-purple to-neon-pink opacity-20 rounded-2xl" />
            <img
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2670&q=80"
              alt="Cybersecurity Operations Center"
              className="rounded-2xl relative z-10 opacity-75"
            />
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
          Our Core Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">Innovation</h3>
            <p className="text-gray-300">
              Constantly pushing the boundaries of what's possible in cybersecurity.
            </p>
          </div>
          <div className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">Integrity</h3>
            <p className="text-gray-300">
              Maintaining the highest standards of ethical conduct in all our operations.
            </p>
          </div>
          <div className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">Excellence</h3>
            <p className="text-gray-300">
              Delivering exceptional results through dedication and expertise.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;