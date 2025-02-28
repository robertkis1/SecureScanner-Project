import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Globe, 
  Key, 
  FileWarning, 
  Clock, 
  Users, 
  Settings, 
  HelpCircle, 
  LogOut,
  Shield
} from 'lucide-react';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const isAdmin = true; // TODO: Replace with actual auth check

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Globe, label: 'Web Scan', path: '/web-scan' },
    { icon: Key, label: 'Password Testing', path: '/password-testing' },
    { icon: FileWarning, label: 'Vulnerability Reports', path: '/reports' },
    { icon: Clock, label: 'Automated Scanning', path: '/automated-scan' },
    ...(isAdmin ? [{ icon: Users, label: 'User Management', path: '/users' }] : []),
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: HelpCircle, label: 'Help & Support', path: '/help' },
  ];

  const handleLogout = () => {
    // TODO: Implement logout logic
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3">
            <Shield className="w-8 h-8 text-blue-600" />
            <span className="font-bold text-xl">SecureScanner</span>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;