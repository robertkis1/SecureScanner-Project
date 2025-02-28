import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mail, ArrowLeft, AlertCircle, CheckCircle, X } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const ForgotPassword: React.FC = () => {
  const { resetPassword } = useAuthStore();
  const [email, setEmail] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!email) {
        throw new Error('Please enter your email address');
      }
      if (!email.includes('@')) {
        throw new Error('Please enter a valid email address');
      }

      // Store the email before clearing the form
      setSubmittedEmail(email);

      // Simulate successful password reset request
      // In production, this would be a real API call
      // await resetPassword(email);
      
      // Show notification and clear form
      setShowNotification(true);
      setEmail('');
    } catch (err: any) {
      let errorMessage = err.message;

      if (errorMessage.includes('not found')) {
        errorMessage = 'No account found with this email address';
      } else if (errorMessage.includes('too many requests')) {
        errorMessage = 'Too many reset attempts. Please try again later';
      } else if (errorMessage.includes('network')) {
        errorMessage = 'Unable to connect to the server. Please check your internet connection';
      } else {
        errorMessage = 'Failed to send reset instructions. Please try again later';
      }

      setError(errorMessage);
      console.error('Password reset error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="fixed top-6 left-6">
        <Link
          to="/login"
          className="flex items-center text-gray-400 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Login
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="p-2 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg">
            <Shield className="w-12 h-12 text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-white">
          Reset your password
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          Enter your email address and we'll send you instructions to reset your password.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-900 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-800">
          {error && (
            <div className="mb-4 p-4 bg-red-900/50 border border-red-500 text-red-200 rounded-md text-sm flex items-start">
              <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-200">
                Email address
              </label>
              <div className="mt-1 relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-neon-pink focus:border-neon-pink"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-neon-purple to-neon-pink hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neon-pink ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </div>
                ) : (
                  'Send Reset Instructions'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Notification Modal */}
      {showNotification && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-xl max-w-md w-full p-6 border border-gray-800 relative">
            <button
              onClick={() => setShowNotification(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-500/10 mb-4">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              
              <h3 className="text-lg font-medium text-white mb-2">
                Reset Instructions Sent
              </h3>
              
              <p className="text-sm text-gray-400 mb-6">
                We've sent password reset instructions to <span className="text-white">{submittedEmail}</span>. 
                An admin will review your request and send you a new password shortly.
              </p>

              <div className="flex justify-center space-x-4">
                <Link
                  to="/login"
                  className="px-4 py-2 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg text-white hover:opacity-90 transition-opacity"
                >
                  Back to Login
                </Link>
                <button
                  onClick={() => setShowNotification(false)}
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;