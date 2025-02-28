import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Moon, 
  Sun, 
  Shield, 
  Mail, 
  Key,
  Eye,
  EyeOff,
  Save,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';

const Settings: React.FC = () => {
  const { user, updateUserProfile, updateUserCredentials } = useAuthStore();
  const { isDark, toggleTheme } = useThemeStore();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notifications, setNotifications] = useState({
    securityAlerts: true,
    scanCompleted: true,
    weeklyReports: true,
    systemUpdates: false
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      if (!user) throw new Error('No user logged in');

      // Validate form
      if (!formData.name.trim()) {
        throw new Error('Name is required');
      }
      if (!formData.email.includes('@')) {
        throw new Error('Please enter a valid email address');
      }

      // Update profile
      await updateUserProfile(user.id, {
        name: formData.name,
        email: formData.email,
        role: user.role
      });

      // Update password if provided
      if (formData.newPassword) {
        if (formData.newPassword.length < 6) {
          throw new Error('New password must be at least 6 characters long');
        }
        if (formData.newPassword !== formData.confirmPassword) {
          throw new Error('New passwords do not match');
        }

        await updateUserCredentials(user.id, formData.email, formData.newPassword);
        
        // Clear password fields
        setFormData(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }));
      }

      setSuccess('Profile updated successfully');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700 p-8">
        <div className="flex items-center space-x-4 mb-8">
          <div className="p-3 bg-gradient-to-r from-neon-purple to-neon-pink rounded-xl">
            <SettingsIcon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">Settings</h1>
            <p className="text-gray-300">
              Manage your account settings and preferences
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <div className="flex items-center text-red-500">
              <AlertTriangle className="w-5 h-5 mr-2" />
              {error}
            </div>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
            <div className="flex items-center text-green-500">
              <CheckCircle className="w-5 h-5 mr-2" />
              {success}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Settings */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 text-lg font-semibold text-white mb-4">
              <User className="w-5 h-5" />
              <h2>Profile Settings</h2>
            </div>

            <form onSubmit={handleProfileUpdate} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-neon-pink focus:ring-neon-pink"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-neon-pink focus:ring-neon-pink"
                  />
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-300">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.current ? 'text' : 'password'}
                    id="currentPassword"
                    value={formData.currentPassword}
                    onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-neon-pink focus:ring-neon-pink pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('current')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPasswords.current ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.new ? 'text' : 'password'}
                    id="newPassword"
                    value={formData.newPassword}
                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-neon-pink focus:ring-neon-pink pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('new')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPasswords.new ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.confirm ? 'text' : 'password'}
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-neon-pink focus:ring-neon-pink pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('confirm')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPasswords.confirm ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center px-4 py-2 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg text-white hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    Save Changes
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Preferences */}
          <div className="space-y-8">
            {/* Theme Settings */}
            <div>
              <div className="flex items-center space-x-3 text-lg font-semibold text-white mb-4">
                {isDark ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
                <h2>Theme Settings</h2>
              </div>

              <button
                onClick={toggleTheme}
                className="w-full flex items-center justify-between px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 text-white hover:bg-gray-700 transition-colors"
              >
                <span className="flex items-center">
                  {isDark ? (
                    <>
                      <Sun className="w-5 h-5 mr-2" />
                      Switch to Light Mode
                    </>
                  ) : (
                    <>
                      <Moon className="w-5 h-5 mr-2" />
                      Switch to Dark Mode
                    </>
                  )}
                </span>
                <div className={`w-12 h-6 rounded-full p-1 transition-colors ${
                  isDark ? 'bg-neon-pink' : 'bg-gray-600'
                }`}>
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    isDark ? 'translate-x-6' : ''
                  }`} />
                </div>
              </button>
            </div>

            {/* Notification Settings */}
            <div>
              <div className="flex items-center space-x-3 text-lg font-semibold text-white mb-4">
                <Bell className="w-5 h-5" />
                <h2>Notification Settings</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700">
                  <div>
                    <div className="font-medium text-white">Security Alerts</div>
                    <div className="text-sm text-gray-400">Get notified about security threats</div>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={notifications.securityAlerts}
                      onChange={() => handleNotificationChange('securityAlerts')}
                      className="sr-only"
                    />
                    <div
                      className={`w-12 h-6 rounded-full p-1 transition-colors ${
                        notifications.securityAlerts ? 'bg-neon-pink' : 'bg-gray-600'
                      }`}
                      onClick={() => handleNotificationChange('securityAlerts')}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        notifications.securityAlerts ? 'translate-x-6' : ''
                      }`} />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700">
                  <div>
                    <div className="font-medium text-white">Scan Completed</div>
                    <div className="text-sm text-gray-400">Notifications when scans finish</div>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={notifications.scanCompleted}
                      onChange={() => handleNotificationChange('scanCompleted')}
                      className="sr-only"
                    />
                    <div
                      className={`w-12 h-6 rounded-full p-1 transition-colors ${
                        notifications.scanCompleted ? 'bg-neon-pink' : 'bg-gray-600'
                      }`}
                      onClick={() => handleNotificationChange('scanCompleted')}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        notifications.scanCompleted ? 'translate-x-6' : ''
                      }`} />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700">
                  <div>
                    <div className="font-medium text-white">Weekly Reports</div>
                    <div className="text-sm text-gray-400">Receive weekly security summaries</div>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={notifications.weeklyReports}
                      onChange={() => handleNotificationChange('weeklyReports')}
                      className="sr-only"
                    />
                    <div
                      className={`w-12 h-6 rounded-full p-1 transition-colors ${
                        notifications.weeklyReports ? 'bg-neon-pink' : 'bg-gray-600'
                      }`}
                      onClick={() => handleNotificationChange('weeklyReports')}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        notifications.weeklyReports ? 'translate-x-6' : ''
                      }`} />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700">
                  <div>
                    <div className="font-medium text-white">System Updates</div>
                    <div className="text-sm text-gray-400">Get notified about system changes</div>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={notifications.systemUpdates}
                      onChange={() => handleNotificationChange('systemUpdates')}
                      className="sr-only"
                    />
                    <div
                      className={`w-12 h-6 rounded-full p-1 transition-colors ${
                        notifications.systemUpdates ? 'bg-neon-pink' : 'bg-gray-600'
                      }`}
                      onClick={() => handleNotificationChange('systemUpdates')}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        notifications.systemUpdates ? 'translate-x-6' : ''
                      }`} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;