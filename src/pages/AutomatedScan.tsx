import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Bell, 
  Play, 
  Shield,
  Globe,
  Key,
  AlertTriangle,
  Calendar,
  Settings,
  Trash2,
  CheckCircle,
  X,
  ChevronDown,
  ChevronUp,
  FileDown,
  Eye,
  Edit,
  Save,
  Plus
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';

interface Schedule {
  id: string;
  name: string;
  target_url: string;
  scan_type: 'web' | 'password';
  frequency: 'daily' | 'weekly' | 'monthly';
  next_run: string;
  notifications: boolean;
  created_at: string;
  user_id: string;
}

const AutomatedScan: React.FC = () => {
  const { user } = useAuthStore();
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<string | null>(null);
  const [expandedSchedule, setExpandedSchedule] = useState<string | null>(null);
  const [newSchedule, setNewSchedule] = useState({
    name: '',
    target_url: '',
    scan_type: 'web' as const,
    frequency: 'daily' as const,
    notifications: true
  });

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('scan_schedules')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSchedules(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('scan_schedules')
        .insert({
          ...newSchedule,
          user_id: user?.id,
          next_run: new Date(Date.now() + getNextRunOffset(newSchedule.frequency)).toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      setSchedules([data, ...schedules]);
      setShowAddModal(false);
      setNewSchedule({
        name: '',
        target_url: '',
        scan_type: 'web',
        frequency: 'daily',
        notifications: true
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSchedule = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const schedule = schedules.find(s => s.id === id);
      if (!schedule) return;

      const { error } = await supabase
        .from('scan_schedules')
        .update({
          name: schedule.name,
          target_url: schedule.target_url,
          scan_type: schedule.scan_type,
          frequency: schedule.frequency,
          notifications: schedule.notifications
        })
        .eq('id', id);

      if (error) throw error;

      setEditingSchedule(null);
      await fetchSchedules();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSchedule = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this schedule?')) return;
    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase
        .from('scan_schedules')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setSchedules(schedules.filter(s => s.id !== id));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getNextRunOffset = (frequency: string) => {
    switch (frequency) {
      case 'daily':
        return 24 * 60 * 60 * 1000;
      case 'weekly':
        return 7 * 24 * 60 * 60 * 1000;
      case 'monthly':
        return 30 * 24 * 60 * 60 * 1000;
      default:
        return 24 * 60 * 60 * 1000;
    }
  };

  const formatNextRun = (date: string) => {
    const nextRun = new Date(date);
    const now = new Date();
    const diff = nextRun.getTime() - now.getTime();
    
    if (diff < 0) return 'Overdue';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 24) return `In ${hours} hours`;
    
    const days = Math.floor(hours / 24);
    if (days === 1) return 'Tomorrow';
    if (days < 7) return `In ${days} days`;
    
    return nextRun.toLocaleDateString();
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700 p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-neon-purple to-neon-pink rounded-xl">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">Automated Scanning</h1>
              <p className="text-gray-300">
                Schedule regular security scans and password tests
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg text-white hover:opacity-90 transition-opacity"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Schedule
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <div className="flex items-center text-red-500">
              <AlertTriangle className="w-5 h-5 mr-2" />
              {error}
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neon-pink"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {schedules.length === 0 ? (
              <div className="text-center py-12">
                <Clock className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400">No scheduled scans yet</p>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Create Your First Schedule
                </button>
              </div>
            ) : (
              schedules.map(schedule => (
                <div
                  key={schedule.id}
                  className={`p-6 bg-gray-800/50 rounded-xl border ${
                    expandedSchedule === schedule.id
                      ? 'border-neon-pink'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">
                          {editingSchedule === schedule.id ? (
                            <input
                              type="text"
                              value={schedule.name}
                              onChange={(e) => setSchedules(schedules.map(s => 
                                s.id === schedule.id ? { ...s, name: e.target.value } : s
                              ))}
                              className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-white"
                            />
                          ) : (
                            schedule.name
                          )}
                        </h3>
                        <div className={`px-2 py-0.5 rounded-full text-xs ${
                          schedule.scan_type === 'web'
                            ? 'bg-neon-purple/20 text-neon-purple'
                            : 'bg-neon-pink/20 text-neon-pink'
                        }`}>
                          {schedule.scan_type === 'web' ? 'Security Scan' : 'Password Test'}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {schedule.frequency}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          Next run: {formatNextRun(schedule.next_run)}
                        </div>
                        {schedule.notifications && (
                          <div className="flex items-center">
                            <Bell className="w-4 h-4 mr-1" />
                            Notifications enabled
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {editingSchedule === schedule.id ? (
                        <>
                          <button
                            onClick={() => handleUpdateSchedule(schedule.id)}
                            className="p-2 bg-green-500/10 rounded-lg text-green-500 hover:bg-green-500/20 transition-colors"
                          >
                            <Save className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setEditingSchedule(null)}
                            className="p-2 bg-gray-700 rounded-lg text-white hover:bg-gray-600 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => setEditingSchedule(schedule.id)}
                            className="p-2 bg-gray-700 rounded-lg text-white hover:bg-gray-600 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteSchedule(schedule.id)}
                            className="p-2 bg-red-500/10 rounded-lg text-red-500 hover:bg-red-500/20 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setExpandedSchedule(expandedSchedule === schedule.id ? null : schedule.id)}
                            className="p-2 bg-gray-700 rounded-lg text-white hover:bg-gray-600 transition-colors"
                          >
                            {expandedSchedule === schedule.id ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {expandedSchedule === schedule.id && (
                    <div className="mt-6 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                          <h4 className="text-sm font-medium text-gray-300 mb-2">Target URL</h4>
                          <div className="flex items-center space-x-2">
                            <Globe className="w-4 h-4 text-gray-400" />
                            <a
                              href={schedule.target_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-neon-pink hover:underline"
                            >
                              {schedule.target_url}
                            </a>
                          </div>
                        </div>
                        <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                          <h4 className="text-sm font-medium text-gray-300 mb-2">Schedule Details</h4>
                          <div className="space-y-2 text-sm text-gray-400">
                            <div className="flex items-center justify-between">
                              <span>Frequency:</span>
                              <span className="text-white capitalize">{schedule.frequency}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Next Run:</span>
                              <span className="text-white">{formatNextRun(schedule.next_run)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Notifications:</span>
                              <span className={schedule.notifications ? 'text-green-500' : 'text-red-500'}>
                                {schedule.notifications ? 'Enabled' : 'Disabled'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                        <h4 className="text-sm font-medium text-gray-300 mb-4">Recent Results</h4>
                        <div className="space-y-2">
                          {/* Placeholder for recent scan results */}
                          <div className="text-gray-400 text-center py-4">
                            No scan results available yet
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Add Schedule Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-xl max-w-md w-full p-6 border border-gray-800">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Add New Schedule</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-gray-400"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleAddSchedule} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Schedule Name
                </label>
                <input
                  type="text"
                  required
                  value={newSchedule.name}
                  onChange={(e) => setNewSchedule({ ...newSchedule, name: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-neon-pink focus:ring-neon-pink"
                  placeholder="Daily Security Check"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Target URL
                </label>
                <input
                  type="url"
                  required
                  value={newSchedule.target_url}
                  onChange={(e) => setNewSchedule({ ...newSchedule, target_url: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-neon-pink focus:ring-neon-pink"
                  placeholder="https://example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Scan Type
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setNewSchedule({ ...newSchedule, scan_type: 'web' })}
                    className={`p-4 rounded-lg border text-center transition-colors ${
                      newSchedule.scan_type === 'web'
                        ? 'border-neon-purple bg-neon-purple/10 text-white'
                        : 'border-gray-700 text-gray-400 hover:border-gray-600'
                    }`}
                  >
                    <Shield className="w-6 h-6 mx-auto mb-2" />
                    <span className="block text-sm">Security Scan</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewSchedule({ ...newSchedule, scan_type: 'password' })}
                    className={`p-4 rounded-lg border text-center transition-colors ${
                      newSchedule.scan_type === 'password'
                        ? 'border-neon-pink bg-neon-pink/10 text-white'
                        : 'border-gray-700 text-gray-400 hover:border-gray-600'
                    }`}
                  >
                    <Key className="w-6 h-6 mx-auto mb-2" />
                    <span className="block text-sm">Password Test</span>
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Frequency
                </label>
                <select
                  value={newSchedule.frequency}
                  onChange={(e) => setNewSchedule({ ...newSchedule, frequency: e.target.value as 'daily' | 'weekly' | 'monthly' })}
                  className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-neon-pink focus:ring-neon-pink"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="notifications"
                  checked={newSchedule.notifications}
                  onChange={(e) => setNewSchedule({ ...newSchedule, notifications: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-neon-pink focus:ring-neon-pink"
                />
                <label htmlFor="notifications" className="ml-2 block text-sm text-gray-300">
                  Enable Email Notifications
                </label>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-gradient-to-r from-neon-purple to-neon-pink text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {loading ? 'Adding...' : 'Add Schedule'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AutomatedScan;