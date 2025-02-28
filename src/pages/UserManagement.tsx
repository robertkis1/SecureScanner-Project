import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Pencil, 
  Trash2, 
  X, 
  Check, 
  AlertCircle, 
  FileText, 
  ChevronDown, 
  ChevronUp,
  Shield,
  Key,
  Clock,
  Filter,
  Search,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Download,
  FileDown,
  Eye,
  Network,
  Activity,
  Lock,
  Info
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';
import EditUserModal from '../components/EditUserModal';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  created_at: string;
}

interface ScanReport {
  id: string;
  url: string;
  scan_type: string;
  start_time: string;
  end_time: string;
  status: 'completed' | 'failed' | 'in-progress';
  results: any[];
  created_at: string;
}

interface PasswordReport {
  id: string;
  created_at: string;
  total_passwords: number;
  weak_count: number;
  medium_count: number;
  strong_count: number;
  very_strong_count: number;
  results: any[];
}

interface ConnectionReport {
  id: string;
  created_at: string;
  score: number;
  issues: {
    critical: number;
    warnings: number;
    secure: number;
  };
  check_categories: {
    [key: string]: {
      secure: number;
      warning: number;
      error: number;
    };
  };
}

interface UserReports {
  scanReports: ScanReport[];
  passwordReports: PasswordReport[];
  connectionReports: ConnectionReport[];
}

const UserManagement: React.FC = () => {
  const { user: currentUser } = useAuthStore();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [expandedUser, setExpandedUser] = useState<string | null>(null);
  const [userReports, setUserReports] = useState<Record<string, UserReports>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'user' | 'admin'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'email' | 'role' | 'reports'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedReportType, setSelectedReportType] = useState<'all' | 'scan' | 'password' | 'connection'>('all');
  const [expandedReport, setExpandedReport] = useState<string | null>(null);

  const fetchUserReports = async (userId: string) => {
    try {
      const { data: scanReports, error: scanError } = await supabase
        .from('scan_reports')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (scanError) throw scanError;

      const { data: passwordReports, error: passwordError } = await supabase
        .from('password_test_reports')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (passwordError) throw passwordError;

      const { data: connectionReports, error: connectionError } = await supabase
        .from('security_history')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (connectionError) throw connectionError;

      return {
        scanReports: scanReports || [],
        passwordReports: passwordReports || [],
        connectionReports: connectionReports || []
      };
    } catch (error) {
      console.error('Error fetching user reports:', error);
      return { scanReports: [], passwordReports: [], connectionReports: [] };
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);

      // Fetch reports for each user
      const reports: Record<string, UserReports> = {};
      for (const user of data || []) {
        reports[user.id] = await fetchUserReports(user.id);
      }
      setUserReports(reports);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEditUser = (user: User) => {
    setEditingUser(user);
  };

  const handleUserUpdate = async () => {
    await fetchUsers();
  };

  const handleDeleteUser = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this user? This will also delete all their reports.')) return;
    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase.auth.admin.deleteUser(id);
      if (error) throw error;

      await fetchUsers();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString();
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 70) return 'text-yellow-500';
    if (score >= 50) return 'text-orange-500';
    return 'text-red-500';
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'network':
        return Network;
      case 'privacy':
        return Eye;
      case 'system':
        return Activity;
      case 'authentication':
        return Lock;
      default:
        return Shield;
    }
  };

  const filteredUsers = users
    .filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = filterRole === 'all' || user.role === filterRole;
      return matchesSearch && matchesRole;
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'email':
          comparison = a.email.localeCompare(b.email);
          break;
        case 'role':
          comparison = a.role.localeCompare(b.role);
          break;
        case 'reports':
          const aReports = (userReports[a.id]?.scanReports.length || 0) + 
                         (userReports[a.id]?.passwordReports.length || 0) +
                         (userReports[a.id]?.connectionReports.length || 0);
          const bReports = (userReports[b.id]?.scanReports.length || 0) + 
                         (userReports[b.id]?.passwordReports.length || 0) +
                         (userReports[b.id]?.connectionReports.length || 0);
          comparison = aReports - bReports;
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-red-600">You don't have permission to access this page.</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700 p-8">
        <div className="flex items-center space-x-4 mb-6">
          <div className="p-3 bg-gradient-to-r from-neon-purple to-neon-pink rounded-xl">
            <Users className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">User Management</h1>
            <p className="text-gray-300">
              Manage users and view their security reports
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

        <div className="mb-6 space-y-4">
          {/* Search and Filters */}
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-neon-pink focus:border-transparent pl-10"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
            <div className="relative">
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value as 'all' | 'user' | 'admin')}
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-neon-pink focus:border-transparent appearance-none pr-10"
              >
                <option value="all">All Roles</option>
                <option value="user">Users</option>
                <option value="admin">Admins</option>
              </select>
              <Filter className="w-5 h-5 text-gray-400 absolute right-3 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Sort Controls */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-400">Sort by:</span>
            {['name', 'email', 'role', 'reports'].map((option) => (
              <button
                key={option}
                onClick={() => {
                  if (sortBy === option) {
                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                  } else {
                    setSortBy(option as typeof sortBy);
                    setSortOrder('asc');
                  }
                }}
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  sortBy === option
                    ? 'bg-neon-pink/20 text-neon-pink'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
                {sortBy === option && (
                  sortOrder === 'asc' ? ' ↑' : ' ↓'
                )}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neon-pink"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className={`p-6 bg-gray-800/50 rounded-xl border ${
                  expandedUser === user.id
                    ? 'border-neon-pink'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <h3 className="text-lg font-semibold text-white">{user.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.role === 'admin'
                          ? 'bg-neon-purple/20 text-neon-purple'
                          : 'bg-neon-pink/20 text-neon-pink'
                      }`}>
                        {user.role}
                      </span>
                    </div>
                    <div className="text-gray-400">{user.email}</div>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        Joined {formatDate(user.created_at)}
                      </div>
                      <div className="flex items-center">
                        <Shield className="w-4 h-4 mr-1" />
                        {userReports[user.id]?.scanReports.length || 0} Security Scans
                      </div>
                      <div className="flex items-center">
                        <Key className="w-4 h-4 mr-1" />
                        {userReports[user.id]?.passwordReports.length || 0} Password Tests
                      </div>
                      <div className="flex items-center">
                        <Network className="w-4 h-4 mr-1" />
                        {userReports[user.id]?.connectionReports.length || 0} Connection Reports
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="p-2 bg-gray-700 rounded-lg text-white hover:bg-gray-600 transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="p-2 bg-red-500/10 rounded-lg text-red-500 hover:bg-red-500/20 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setExpandedUser(expandedUser === user.id ? null : user.id)}
                      className="p-2 bg-gray-700 rounded-lg text-white hover:bg-gray-600 transition-colors"
                    >
                      {expandedUser === user.id ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {expandedUser === user.id && (
                  <div className="mt-6">
                    {/* Report Type Selector */}
                    <div className="flex items-center space-x-4 mb-4">
                      <button
                        onClick={() => setSelectedReportType('all')}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          selectedReportType === 'all'
                            ? 'bg-neon-pink/20 text-neon-pink'
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        All Reports
                      </button>
                      <button
                        onClick={() => setSelectedReportType('scan')}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                          selectedReportType === 'scan'
                            ? 'bg-neon-pink/20 text-neon-pink'
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        <Shield className="w-4 h-4" />
                        <span>Security Scans</span>
                      </button>
                      <button
                        onClick={() => setSelectedReportType('password')}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                          selectedReportType === 'password'
                            ? 'bg-neon-pink/20 text-neon-pink'
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        <Key className="w-4 h-4" />
                        <span>Password Tests</span>
                      </button>
                      <button
                        onClick={() => setSelectedReportType('connection')}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                          selectedReportType === 'connection'
                            ? 'bg-neon-pink/20 text-neon-pink'
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        <Network className="w-4 h-4" />
                        <span>Connection Security</span>
                      </button>
                    </div>

                    {/* Security Scan Reports */}
                    {(selectedReportType === 'all' || selectedReportType === 'scan') && (
                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-white mb-2">Security Scan Reports</h4>
                        {userReports[user.id]?.scanReports.map((report) => (
                          <div
                            key={report.id}
                            className="p-4 bg-gray-800/50 rounded-lg border border-gray-700"
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="flex items-center space-x-3 mb-2">
                                  <a
                                    href={report.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white hover:text-neon-pink transition-colors flex items-center"
                                  >
                                    {report.url}
                                    <ExternalLink className="w-4 h-4 ml-1" />
                                  </a>
                                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                                    report.status === 'completed'
                                      ? 'bg-green-500/10 text-green-500'
                                      : report.status === 'failed'
                                      ? 'bg-red-500/10 text-red-500'
                                      : 'bg-yellow-500/10 text-yellow-500'
                                  }`}>
                                    {report.status}
                                  </span>
                                </div>
                                <div className="text-sm text-gray-400">
                                  {formatDate(report.created_at)}
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => setExpandedReport(expandedReport === report.id ? null : report.id)}
                                  className="p-2 bg-gray-700 rounded-lg text-white hover:bg-gray-600 transition-colors"
                                  title="View Details"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            {expandedReport === report.id && (
                              <div className="mt-4 space-y-4">
                                <div className="space-y-4">
                                  {report.results.map((result, index) => (
                                    <div
                                      key={index}
                                      className="p-4 bg-gray-800/50 rounded-lg border border-gray-700"
                                    >
                                      <div className="flex items-start justify-between">
                                        <div>
                                          <div className="font-medium mb-2">{result.type}</div>
                                          <p className="text-sm text-gray-300 mb-2">{result.description}</p>
                                          {result.evidence && (
                                            <div className="text-sm text-gray-400 mb-2">
                                              <strong className="text-gray-300">Evidence:</strong> {result.evidence}
                                            </div>
                                          )}
                                          <div className="text-sm text-gray-400">
                                            <strong className="text-gray-300">Recommendation:</strong> {result.recommendation}
                                          </div>
                                        </div>
                                        <span className={`px-2 py-1 rounded-full text-xs ${
                                          result.severity === 'critical'
                                            ? 'bg-red-500/10 text-red-500'
                                            : result.severity === 'high'
                                            ? 'bg-orange-500/10 text-orange-500'
                                            : result.severity === 'medium'
                                            ? 'bg-yellow-500/10 text-yellow-500'
                                            : 'bg-blue-500/10 text-blue-500'
                                        }`}>
                                          {result.severity}
                                        </span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                        {(!userReports[user.id]?.scanReports || userReports[user.id].scanReports.length === 0) && (
                          <div className="text-gray-400 text-center py-4">
                            No security scan reports available
                          </div>
                        )}
                      </div>
                    )}

                    {/* Password Test Reports */}
                    {(selectedReportType === 'all' || selectedReportType === 'password') && (
                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-white mb-2">Password Test Reports</h4>
                        {userReports[user.id]?.passwordReports.map((report) => (
                          <div
                            key={report.id}
                            className="p-4 bg-gray-800/50 rounded-lg border border-gray-700"
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="flex items-center space-x-3 mb-2">
                                  <span className="text-white">Password Test Report</span>
                                  <span className="px-2 py-0.5 rounded-full text-xs bg-blue-500/10 text-blue-500">
                                    {report.total_passwords} passwords
                                  </span>
                                </div>
                                <div className="text-sm text-gray-400">
                                  {formatDate(report.created_at)}
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => setExpandedReport(expandedReport === report.id ? null : report.id)}
                                  className="p-2 bg-gray-700 rounded-lg text-white hover:bg-gray-600 transition-colors"
                                  title="View Details"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            {expandedReport === report.id && (
                              <div className="mt-4 space-y-4">
                                <div className="grid grid-cols-4 gap-4">
                                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                                    <div className="text-2xl font-bold text-red-500">
                                      {report.weak_count}
                                    </div>
                                    <div className="text-sm text-gray-400">Weak</div>
                                  </div>
                                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                                    <div className="text-2xl font-bold text-yellow-500">
                                      {report.medium_count}
                                    </div>
                                    <div className="text-sm text-gray-400">Medium</div>
                                  </div>
                                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                                    <div className="text-2xl font-bold text-blue-500">
                                      {report.strong_count}
                                    </div>
                                    <div className="text-sm text-gray-400">Strong</div>
                                  </div>
                                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                                    <div className="text-2xl font-bold text-green-500">
                                      {report.very_strong_count}
                                    </div>
                                    <div className="text-sm text-gray-400">Very Strong</div>
                                  </div>
                                </div>

                                <div className="space-y-4">
                                  {report.results.map((result: any, index: number) => (
                                    <div
                                      key={index}
                                      className="p-4 bg-gray-800/50 rounded-lg border border-gray-700"
                                    >
                                      <div className="flex items-start justify-between mb-4">
                                        <div>
                                          <div className="flex items-center space-x-3 mb-2">
                                            <div className={`text-lg font-medium ${result.strength.color}`}>
                                              {result.strength.label}
                                            </div>
                                            <div className="px-2 py-1 bg-gray-700 rounded-lg text-sm text-gray-300">
                                              Score: {result.strength.score}%
                                            </div>
                                          </div>
                                          <div className="text-gray-400">
                                            Password: {'*'.repeat(result.password.length)}
                                          </div>
                                        </div>
                                        <div className="text-sm">
                                          {result.breachCount > 0 ? (
                                            <div className="text-red-500">
                                              Found in {result.breachCount} breaches
                                            </div>
                                          ) : (
                                            <div className="text-green-500">
                                              No breaches found
                                            </div>
                                          )}
                                        </div>
                                      </div>

                                      <div className="space-y-2">
                                        <div className="text-sm text-gray-300">Suggestions:</div>
                                        <div className="space-y-1">
                                          {result.suggestions.map((suggestion: string, i: number) => (
                                            <div key={i} className="flex items-start space-x-2 text-sm">
                                              <div className="w-1.5 h-1.5 rounded-full bg-neon-pink mt-1.5"></div>
                                              <span className="text-gray-400">{suggestion}</span>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                        {(!userReports[user.id]?.passwordReports || userReports[user.id].passwordReports.length === 0) && (
                          <div className="text-gray-400 text-center py-4">
                            No password test reports available
                          </div>
                        )}
                      </div>
                    )}

                    {/* Connection Security Reports */}
                    {(selectedReportType === 'all' || selectedReportType === 'connection') && (
                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-white mb-2">Connection Security Reports</h4>
                        {userReports[user.id]?.connectionReports.map((report) => (
                          <div
                            key={report.id}
                            className="p-4 bg-gray-800/50 rounded-lg border border-gray-700"
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="flex items-center space-x-3 mb-2">
                                  <span className="text-white">Connection Security Report</span>
                                  <div className={`px-2 py-0.5 rounded-full text-xs ${getScoreColor(report.score)} bg-gray-800`}>
                                    Score: {report.score}%
                                  </div>
                                </div>
                                <div className="text-sm text-gray-400">
                                  {formatDate(report.created_at)}
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => setExpandedReport(expandedReport === report.id ? null : report.id)}
                                  className="p-2 bg-gray-700 rounded-lg text-white hover:bg-gray-600 transition-colors"
                                  title="View Details"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            {expandedReport === report.id && (
                              <div className="mt-4 space- Here's the continuation of the UserManagement.tsx file, picking up exactly where we left off:

4 space-y-4">
                                <div className="grid grid-cols-3 gap-4">
                                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                                    <div className="text-2xl font-bold text-red-500">
                                      {report.issues.critical}
                                    </div>
                                    <div className="text-sm text-gray-400">Critical Issues</div>
                                  </div>
                                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                                    <div className="text-2xl font-bold text-yellow-500">
                                      {report.issues.warnings}
                                    </div>
                                    <div className="text-sm text-gray-400">Warnings</div>
                                  </div>
                                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                                    <div className="text-2xl font-bold text-green-500">
                                      {report.issues.secure}
                                    </div>
                                    <div className="text-sm text-gray-400">Secure</div>
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  {Object.entries(report.check_categories).map(([category, stats]) => {
                                    const CategoryIcon = getCategoryIcon(category);
                                    return (
                                      <div
                                        key={category}
                                        className="p-4 bg-gray-800/50 rounded-lg border border-gray-700"
                                      >
                                        <div className="flex items-center space-x-2 mb-4">
                                          <CategoryIcon className="w-5 h-5 text-neon-pink" />
                                          <span className="text-lg font-medium text-white capitalize">{category}</span>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4">
                                          <div>
                                            <div className="text-green-500 font-bold">{stats.secure}</div>
                                            <div className="text-sm text-gray-400">Secure</div>
                                          </div>
                                          <div>
                                            <div className="text-yellow-500 font-bold">{stats.warning}</div>
                                            <div className="text-sm text-gray-400">Warnings</div>
                                          </div>
                                          <div>
                                            <div className="text-red-500 font-bold">{stats.error}</div>
                                            <div className="text-sm text-gray-400">Errors</div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                        {(!userReports[user.id]?.connectionReports || userReports[user.id].connectionReports.length === 0) && (
                          <div className="text-gray-400 text-center py-4">
                            No connection security reports available
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onUpdate={handleUserUpdate}
        />
      )}
    </div>
  );
};

export default UserManagement;