import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, History, Info, LogOut } from 'lucide-react';
import ServicesDropdown from './ServicesDropdown';
import { useAuthStore } from '../store/authStore';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, isLoading, signOut } = useAuthStore();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-4">
            <div className="p-2 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-lg font-semibold text-neon-pink">SecureScanner</span>
          </Link>
          
          <div className="flex items-center space-x-8">
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                <span className="flex items-center">
                  <Info className="w-4 h-4 mr-2" />
                  About Us
                </span>
              </Link>
              <Link to="/history" className="text-gray-300 hover:text-white transition-colors">
                <span className="flex items-center">
                  <History className="w-4 h-4 mr-2" />
                  Our History
                </span>
              </Link>
              <ServicesDropdown />
            </nav>
            {!isLoading && (
              <>
                {user ? (
                  <div className="flex items-center space-x-6">
                    <Link
                      to="/dashboard"
                      className="px-6 py-2 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg text-white font-medium hover:opacity-90 transition-all duration-200 hover:scale-105"
                    >
                      User Dashboard
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="text-gray-400 hover:text-white transition-colors flex items-center"
                    >
                      <LogOut className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
                  >
                    Get Started Free
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;