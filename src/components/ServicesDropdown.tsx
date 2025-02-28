import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Shield, Lock, Globe, Key, Clock, FileText, Network } from 'lucide-react';

const services = [
  {
    icon: Shield,
    title: 'Vulnerability Scanning',
    description: 'Find and fix security weaknesses before hackers do',
    path: '/services/vulnerability-scanning'
  },
  {
    icon: Lock,
    title: 'Penetration Testing',
    description: 'Professional security experts test your defenses',
    path: '/services/penetration-testing'
  },
  {
    icon: Network,
    title: 'Connection Security Analysis',
    description: 'Comprehensive analysis of your network and connection security',
    path: '/services/connection-security'
  },
  {
    icon: Key,
    title: 'Password Testing',
    description: 'Expert-backed password security analysis',
    path: '/services/password-testing-importance'
  },
  {
    icon: Clock,
    title: 'Real-time Monitoring',
    description: '24/7 security surveillance for your peace of mind',
    path: '/services/monitoring'
  },
  {
    icon: Globe,
    title: 'Access Management',
    description: 'Control who can access what in your systems',
    path: '/services/access-management'
  }
];

const ServicesDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors"
      >
        <Globe className="w-4 h-4" />
        <span>Services</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-gray-900 rounded-xl shadow-xl border border-gray-700 overflow-hidden">
          <div className="p-2">
            {services.map((service) => (
              <Link
                key={service.path}
                to={service.path}
                className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-800 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <div className="p-2 bg-gradient-to-br from-neon-purple to-neon-pink rounded-lg">
                  <service.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-medium text-white">{service.title}</div>
                  <div className="text-sm text-gray-400">{service.description}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesDropdown;