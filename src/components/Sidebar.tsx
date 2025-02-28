import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Globe,
  Key,
  FileWarning,
  Clock,
  Users,
  Settings,
  HelpCircle,
  Shield,
  Sun,
  Moon,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Network
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const location = useLocation();
  const { user, signOut } = useAuthStore();
  const { isDark, toggleTheme } = useThemeStore();

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Globe, label: 'Web Scan', path: '/web-scan' },
    { icon: Key, label: 'Password Testing', path: '/password-testing' },
    { icon: FileWarning, label: 'Reports', path: '/reports' },
    { icon: Clock, label: 'Automated Scan', path: '/automated-scan' },
    { icon: Network, label: 'Connection Security', path: '/connection-security' },
    ...(user?.role === 'admin' ? [{ icon: Users, label: 'Users', path: '/users' }] : []),
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: HelpCircle, label: 'Help', path: '/help' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div 
      className={`fixed top-0 left-0 h-screen bg-gray-900 border-r border-gray-800 transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="h-full flex flex-col relative">
        {/* Toggle Button */}
        <button
          onClick={onToggle}
          className="absolute -right-4 top-8 bg-gray-900 border border-gray-800 rounded-full p-1.5 text-gray-400 hover:text-white transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>

        {/* Logo */}
        <div className={`p-6 ${isCollapsed ? 'px-4' : ''}`}>
          <Link to="/" className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            {!isCollapsed && (
              <span className="font-bold text-xl bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
                SecureScanner
              </span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className={`flex-1 px-4 space-y-2 ${isCollapsed ? 'px-2' : ''}`}>
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group relative overflow-hidden ${
                  active ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                {/* Background gradient for active state */}
                {active && (
                  <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/20 to-neon-pink/20 rounded-lg -z-10" />
                )}
                
                {/* Icon with gradient on hover */}
                <div className={`relative p-2 rounded-lg transition-transform duration-200 group-hover:scale-110 ${
                  active ? 'text-neon-pink' : 'text-gray-400 group-hover:text-neon-pink'
                }`}>
                  <item.icon className="w-5 h-5" />
                  
                  {/* Glow effect */}
                  {active && (
                    <div className="absolute inset-0 bg-neon-pink/20 rounded-lg blur-md -z-10" />
                  )}
                </div>

                {/* Label */}
                {!isCollapsed && <span className="font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className={`p-4 border-t border-gray-800 space-y-2 ${isCollapsed ? 'px-2' : ''}`}>
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg text-gray-400 hover:text-white transition-colors group"
            title={isCollapsed ? (isDark ? 'Light Mode' : 'Dark Mode') : undefined}
          >
            <div className="p-2 rounded-lg transition-transform duration-200 group-hover:scale-110">
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </div>
            {!isCollapsed && <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>}
          </button>

          {/* Sign Out */}
          <button
            onClick={signOut}
            className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg text-gray-400 hover:text-neon-pink transition-colors group"
            title={isCollapsed ? 'Sign Out' : undefined}
          >
            <div className="p-2 rounded-lg transition-transform duration-200 group-hover:scale-110">
              <LogOut className="w-5 h-5" />
            </div>
            {!isCollapsed && <span>Sign Out</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
