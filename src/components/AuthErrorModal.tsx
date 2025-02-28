import React, { useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface AuthErrorModalProps {
  error: string;
  onClose: () => void;
}

const AuthErrorModal: React.FC<AuthErrorModalProps> = ({ error, onClose }) => {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-gray-900 rounded-xl max-w-md w-full p-6 border border-gray-800 relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="flex items-start space-x-4">
          <div className="p-2 bg-red-500/10 rounded-lg">
            <AlertTriangle className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Authentication Failed
            </h3>
            <p className="text-gray-300">
              {error}
            </p>
            <button
              onClick={onClose}
              className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg text-white hover:opacity-90 transition-opacity"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthErrorModal;