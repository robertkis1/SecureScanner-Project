import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Mail, Lock, User, ArrowLeft, Eye, EyeOff, Info, AlertTriangle } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { signIn, signUp } = useAuthStore();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user' as 'user' | 'admin'
  });

  const validateForm = () => {
    if (!formData.email.trim()) {
      throw new Error("Please enter your email address");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      throw new Error("Please enter a valid email address");
    }

    if (!formData.password) {
      throw new Error("Please enter your password");
    }
    if (formData.password.length < 6) {
      throw new Error("Password must be at least 6 characters long");
    }

    if (!isLogin) {
      if (!formData.name.trim()) {
        throw new Error("Please enter your name");
      }
      if (formData.name.trim().length < 2) {
        throw new Error("Name must be at least 2 characters long");
      }
      if (!acceptedTerms) {
        throw new Error("Please accept the Terms and Conditions to create an account");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      validateForm();

      if (isLogin) {
        await signIn(formData.email.trim(), formData.password);
        navigate("/dashboard");
      } else {
        await signUp(formData.email.trim(), formData.password, formData.name.trim(), formData.role);
        navigate("/dashboard");
      }
    } catch (err: any) {
      setError(err.message);
      
      // Shake animation for the form on error
      const form = document.getElementById('loginForm');
      if (form) {
        form.classList.add('animate-shake');
        setTimeout(() => form.classList.remove('animate-shake'), 500);
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setAcceptedTerms(false);
    setShowPassword(false);
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'user'
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="fixed top-6 left-6">
        <Link
          to="/"
          className="flex items-center text-gray-400 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="p-2 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg">
            <Shield className="w-12 h-12 text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-white">
          {isLogin ? 'Welcome back!' : 'Create your account'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          {isLogin ? 'Sign in to access your dashboard' : 'Join us to start securing your applications'}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-900 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-800">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg animate-fade-in">
              <div className="flex items-center text-red-500">
                <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            </div>
          )}

          <form id="loginForm" onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-200">
                  Name
                </label>
                <div className="mt-1 relative">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-neon-pink focus:border-neon-pink transition-colors"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
            )}

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
                  className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-neon-pink focus:border-neon-pink transition-colors"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-200">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-neon-pink focus:border-neon-pink transition-colors"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {!isLogin && (
                <div className="mt-2 flex items-start text-sm text-gray-400">
                  <Info className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Password must be at least 6 characters long</span>
                </div>
              )}
            </div>

            {!isLogin && (
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-neon-pink focus:ring-neon-pink transition-colors"
                  />
                </div>
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-300">
                  I accept the{' '}
                  <Link to="/terms" className="text-neon-pink hover:text-neon-purple transition-colors">
                    Terms and Conditions
                  </Link>
                </label>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-neon-purple to-neon-pink hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neon-pink disabled:opacity-50 transition-all duration-200 transform hover:scale-[1.02]"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    {isLogin ? 'Signing in...' : 'Creating account...'}
                  </div>
                ) : (
                  isLogin ? 'Sign in' : 'Create account'
                )}
              </button>
            </div>

            {isLogin && (
              <div className="text-sm text-center">
                <Link 
                  to="/forgot-password" 
                  className="text-neon-pink hover:text-neon-purple transition-colors"
                >
                  Forgot your password?
                </Link>
              </div>
            )}
          </form>

          <div className="mt-6">
            <button
              onClick={toggleMode}
              className="w-full text-center text-sm text-neon-pink hover:text-neon-purple transition-colors"
            >
              {isLogin ? 'Need an account? Register' : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;