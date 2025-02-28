import React from 'react';
import { Shield, Award, Star } from 'lucide-react';
import Header from '../components/Header';

const TimelineEvent: React.FC<{
  year: string;
  title: string;
  description: string;
  icon?: React.ElementType;
}> = ({ year, title, description, icon: Icon = Star }) => (
  <div className="relative pl-8 pb-16 last:pb-0">
    <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-neon-purple to-neon-pink" />
    <div className="absolute left-0 top-0 w-8 h-8 -translate-x-1/2 bg-black rounded-full border-2 border-neon-pink flex items-center justify-center">
      <Icon className="w-4 h-4 text-neon-pink" />
    </div>
    <div className="ml-8">
      <div className="text-neon-pink font-bold mb-2">{year}</div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  </div>
);

const History: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-purple via-neon-pink to-neon-blue opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-neon-purple via-neon-pink to-neon-blue bg-clip-text text-transparent">
              Our Journey Through Time
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Two decades of innovation, growth, and unwavering commitment to cybersecurity excellence.
            </p>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <TimelineEvent
          year="2003"
          title="The Beginning"
          description="Founded in Silicon Valley with a vision to revolutionize cybersecurity through innovation and accessibility."
          icon={Shield}
        />
        <TimelineEvent
          year="2005"
          title="First Major Breakthrough"
          description="Launched our flagship security scanning platform, protecting over 100 enterprise clients in the first year."
        />
        <TimelineEvent
          year="2008"
          title="Global Expansion"
          description="Opened offices in Europe and Asia, extending our security services to international markets."
        />
        <TimelineEvent
          year="2011"
          title="Industry Recognition"
          description="Received multiple industry awards for our innovative approach to threat detection and prevention."
          icon={Award}
        />
        <TimelineEvent
          year="2015"
          title="AI Integration"
          description="Pioneered the use of artificial intelligence in security scanning, setting new industry standards."
        />
        <TimelineEvent
          year="2018"
          title="Cloud Security Revolution"
          description="Launched cloud-native security solutions, protecting thousands of cloud applications worldwide."
        />
        <TimelineEvent
          year="2020"
          title="Remote Security Solutions"
          description="Developed advanced remote security tools in response to global workplace changes."
        />
        <TimelineEvent
          year="2023"
          title="Next-Gen Platform"
          description="Introduced our latest platform featuring quantum-resistant encryption and advanced threat detection."
        />
      </div>

      {/* Achievement Highlights */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
          Key Achievements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700">
            <Award className="w-8 h-8 text-neon-pink mb-4" />
            <h3 className="text-xl font-bold text-white mb-4">Industry Recognition</h3>
            <p className="text-gray-300">
              Over 50 cybersecurity awards and recognitions for excellence and innovation.
            </p>
          </div>
          <div className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700">
            <Shield className="w-8 h-8 text-neon-pink mb-4" />
            <h3 className="text-xl font-bold text-white mb-4">Global Impact</h3>
            <p className="text-gray-300">
              Protected over 10,000 organizations across 150+ countries from cyber threats.
            </p>
          </div>
          <div className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700">
            <Star className="w-8 h-8 text-neon-pink mb-4" />
            <h3 className="text-xl font-bold text-white mb-4">Innovation Leader</h3>
            <p className="text-gray-300">
              Pioneered multiple breakthrough technologies in cybersecurity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;