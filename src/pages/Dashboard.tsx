import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Globe,
  Key,
  Clock,
  Users,
  Settings,
  AlertTriangle,
  Activity,
  Bell,
  TrendingUp,
  Lock,
  FileText,
  Shield,
  Network,
  Eye,
  CheckCircle,
  Info,
  ChevronRight,
  AlertOctagon,
  Timer,
  TrendingDown,
  Zap,
  UserPlus
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { supabase } from '../lib/supabase';
import AddUserModal from '../components/AddUserModal';

interface DashboardData {
  securityScore: number;
  activeScanCount: number;
  alertCount: number;
  protectedAssets: number;
  recentActivity: {
    type: string;
    title: string;
    description: string;
    timestamp: Date;
  }[];
  scanStats: {
    webScans: number;
    passwordTests: number;
    connectionScans: number;
  };
  securityTrends: {
    previousScore: number;
    scoreChange: number;
    alertsResolved: number;
    newThreats: number;
  };
}

const StatCard: React.FC<{
  icon: React.ElementType;
  title: string;
  value: string;
  trend?: string;
  trendIcon?: React.ElementType;
  trendColor?: string;
  color: 'purple' | 'pink' | 'blue' | 'green';
  tooltip?: string;
}> = ({ icon: Icon, title, value, trend, trendIcon: TrendIcon, trendColor, color, tooltip }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const gradients = {
    purple: 'from-neon-purple/20 to-neon-purple/5',
    pink: 'from-neon-pink/20 to-neon-pink/5',
    blue: 'from-neon-blue/20 to-neon-blue/5',
    green: 'from-neon-green/20 to-neon-green/5'
  };

  const borders = {
    purple: 'border-neon-purple/20',
    pink: 'border-neon-pink/20',
    blue: 'border-neon-blue/20',
    green: 'border-neon-green/20'
  };

  const iconColors = {
    purple: 'text-neon-purple',
    pink: 'text-neon-pink',
    blue: 'text-neon-blue',
    green: 'text-neon-green'
  };

  return (
    <div 
      className={`relative p-6 bg-gradient-to-br ${gradients[color]} backdrop-blur-sm rounded-xl border ${borders[color]} hover:scale-105 transition-transform duration-300 group cursor-pointer`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/50 rounded-xl -z-10" />
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center space-x-2">
            <p className="text-sm text-gray-400">{title}</p>
            {tooltip && (
              <div className="relative">
                <Info className="w-4 h-4 text-gray-500 hover:text-gray-300 cursor-help" />
                {showTooltip && (
                  <div className="absolute left-full ml-2 top-0 w-48 p-2 bg-gray-800 rounded-lg text-xs text-gray-300 shadow-xl border border-gray-700 z-50">
                    {tooltip}
                  </div>
                )}
              </div>
            )}
          </div>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
          {trend && (
            <div className={`flex items-center space-x-1 mt-2 ${trendColor}`}>
              {TrendIcon && <TrendIcon className="w-4 h-4" />}
              <p className="text-sm">{trend}</p>
            </div>
          )}
        </div>
        <div className={`p-2 rounded-lg ${iconColors[color]} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

const QuickActionCard: React.FC<{
  icon: React.ElementType;
  title: string;
  description: string;
  to: string;
  color: 'purple' | 'pink' | 'blue';
  stats?: string;
}> = ({ icon: Icon, title, description, to, color, stats }) => {
  const gradients = {
    purple: 'from-neon-purple to-neon-pink',
    pink: 'from-neon-pink to-neon-purple',
    blue: 'from-neon-blue to-neon-purple'
  };

  return (
    <Link 
      to={to}
      className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700 hover:scale-105 transition-transform duration-300 group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-r ${gradients[color]} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {stats && (
          <span className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">
            {stats}
          </span>
        )}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-400 mb-4">{description}</p>
      <div className="flex items-center text-sm text-gray-300 group-hover:text-white transition-colors">
        <span>Get Started</span>
        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
};

const ActivityCard: React.FC<{
  type: string;
  title: string;
  description: string;
  timestamp: Date;
}> = ({ type, title, description, timestamp }) => {
  const getTypeIcon = () => {
    switch (type) {
      case 'scan':
        return Globe;
      case 'password':
        return Key;
      case 'security':
        return Shield;
      default:
        return Activity;
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case 'scan':
        return 'bg-neon-blue/20 text-neon-blue';
      case 'password':
        return 'bg-neon-pink/20 text-neon-pink';
      case 'security':
        return 'bg-neon-purple/20 text-neon-purple';
      default:
        return 'bg-gray-700 text-gray-300';
    }
  };

  const Icon = getTypeIcon();
  const colorClass = getTypeColor();

  return (
    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors">
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-lg ${colorClass}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <p className="font-medium text-white">{title}</p>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
      </div>
      <div className="text-sm text-gray-400 whitespace-nowrap">
        {new Date(timestamp).toLocaleString()}
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const { user } = useAuthStore();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  useEffect(() => {
    fetchDashboardData();
    // Set up real-time subscription for updates
    const subscription = supabase
      .channel('dashboard-updates')
      .on('postgres_changes', { event: '*', schema: 'public' }, () => {
        fetchDashboardData();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  const fetchDashboardData = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Fetch security history
      const { data: securityHistory } = await supabase
        .from('security_history')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(2);

      // Fetch scan reports
      const { data: scanReports } = await supabase
        .from('scan_reports')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      // Fetch password reports
      const { data: passwordReports } = await supabase
        .from('password_test_reports')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      // Calculate active scans (in-progress)
      const activeScanCount = scanReports?.filter(report => report.status === 'in-progress').length || 0;

      // Calculate alert count (critical issues)
      const alertCount = (securityHistory?.[0]?.issues?.critical || 0) +
        (scanReports?.reduce((acc, report) => 
          acc + report.results.filter((r: any) => r.severity === 'critical').length, 0) || 0);

      // Calculate security trends
      const currentScore = securityHistory?.[0]?.score || 0;
      const previousScore = securityHistory?.[1]?.score || 0;
      const scoreChange = currentScore - previousScore;

      // Get recent activity
      const recentActivity = [
        ...(scanReports?.slice(0, 3).map(report => ({
          type: 'scan',
          title: 'Web Scan Completed',
          description: report.url,
          timestamp: new Date(report.created_at)
        })) || []),
        ...(passwordReports?.slice(0, 3).map(report => ({
          type: 'password',
          title: 'Password Test Completed',
          description: `${report.total_passwords} passwords analyzed`,
          timestamp: new Date(report.created_at)
        })) || []),
        ...(securityHistory?.[0] ? [{
          type: 'security',
          title: 'Security Score Updated',
          description: `Score: ${securityHistory[0].score}%`,
          timestamp: new Date(securityHistory[0].created_at)
        }] : [])
      ].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, 3);

      setDashboardData({
        securityScore: currentScore,
        activeScanCount,
        alertCount,
        protectedAssets: (scanReports?.length || 0) + (passwordReports?.length || 0),
        recentActivity,
        scanStats: {
          webScans: scanReports?.length || 0,
          passwordTests: passwordReports?.length || 0,
          connectionScans: securityHistory ? 1 : 0
        },
        securityTrends: {
          previousScore,
          scoreChange,
          alertsResolved: 5, // Example value
          newThreats: alertCount
        }
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getScoreStatus = (score: number) => {
    if (score >= 90) return { text: 'Excellent', color: 'text-green-500', trend: TrendingUp };
    if (score >= 70) return { text: 'Good', color: 'text-yellow-500', trend: TrendingUp };
    if (score >= 50) return { text: 'Fair', color: 'text-orange-500', trend: AlertTriangle };
    return { text: 'Poor', color: 'text-red-500', trend: TrendingDown };
  };

  const handleUserAdded = () => {
    // Refresh dashboard data after adding a new user
    fetchDashboardData();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neon-pink"></div>
      </div>
    );
  }

  const scoreStatus = getScoreStatus(dashboardData?.securityScore || 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-r from-neon-purple to-neon-pink rounded-xl">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold text-white">Welcome back, {user?.name}</h1>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                user?.role === 'admin' 
                  ? 'bg-neon-purple/20 text-neon-purple border border-neon-purple/30' 
                  : 'bg-neon-pink/20 text-neon-pink border border-neon-pink/30'
              }`}>
                {user?.role === 'admin' ? 'Admin' : 'User'}
              </span>
            </div>
            <p className="text-gray-400 mt-1">
              {user?.role === 'admin' 
                ? 'Full access to all security features and user management' 
                : 'Access to security scanning and monitoring tools'}
            </p>
          </div>
        </div>
        {user?.role === 'admin' && (
          <button
            onClick={() => setShowAddUserModal(true)}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg text-white hover:opacity-90 transition-opacity"
          >
            <UserPlus className="w-5 h-5 mr-2" />
            Add New User
          </button>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Activity}
          title="Security Score"
          value={`${dashboardData?.securityScore || 0}%`}
          trend={`${scoreStatus.text} Security`}
          trendIcon={scoreStatus.trend}
          trendColor={scoreStatus.color}
          color="purple"
          tooltip="Overall security score based on all security checks, scans, and tests"
        />
        <StatCard
          icon={Globe}
          title="Active Scans"
          value={String(dashboardData?.activeScanCount || 0)}
          trend={dashboardData?.activeScanCount ? 'Scans in progress' : 'No active scans'}
          trendIcon={Zap}
          trendColor="text-neon-blue"
          color="blue"
          tooltip="Number of security scans currently running"
        />
        <StatCard
          icon={AlertTriangle}
          title="Security Alerts"
          value={String(dashboardData?.alertCount || 0)}
          trend={dashboardData?.alertCount ? 'Critical issues detected' : 'No critical issues'}
          trendIcon={AlertOctagon}
          trendColor={dashboardData?.alertCount ? 'text-red-500' : 'text-green-500'}
          color="pink"
          tooltip="Number of critical security issues requiring attention"
        />
        <StatCard
          icon={Lock}
          title="Protected Assets"
          value={String(dashboardData?.protectedAssets || 0)}
          trend="Total monitored items"
          trendIcon={Shield}
          trendColor="text-neon-green"
          color="green"
          tooltip="Total number of assets under security monitoring"
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <QuickActionCard
            icon={Globe}
            title="Web Security Scan"
            description="Start a comprehensive security scan of your web applications"
            stats={`${dashboardData?.scanStats.webScans || 0} completed`}
            to="/web-scan"
            color="blue"
          />
          <QuickActionCard
            icon={Key}
            title="Password Security"
            description="Test password strength and check for vulnerabilities"
            stats={`${dashboardData?.scanStats.passwordTests || 0} tested`}
            to="/password-testing"
            color="purple"
          />
          <QuickActionCard
            icon={Network}
            title="Connection Security"
            description="Analyze and monitor your network security"
            stats={`${dashboardData?.scanStats.connectionScans || 0} checks`}
            to="/connection-security"
            color="pink"
          />
        </div>
      </div>

      {/* Security Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {dashboardData?.recentActivity.map((activity, index) => (
              <ActivityCard
                key={index}
                type={activity.type}
                title={activity.title}
                description={activity.description}
                timestamp={activity.timestamp}
              />
            ))}
            {(!dashboardData?.recentActivity || dashboardData.recentActivity.length === 0) && (
              <div className="text-center text-gray-400 py-4">
                No recent activity
              </div>
            )}
          </div>
        </div>

        {/* Security Trends */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Security Trends</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Score Change</span>
                  <div className={`flex items-center ${
                    (dashboardData?.securityTrends.scoreChange || 0) >= 0
                      ? 'text-green-500'
                      : 'text-red-500'
                  }`}>
                    {(dashboardData?.securityTrends.scoreChange || 0) >= 0 ? (
                      <TrendingUp className="w-4 h-4 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 mr-1" />
                    )}
                    <span>{Math.abs(dashboardData?.securityTrends.scoreChange || 0)}%</span>
                  </div>
                </div>
                <div className="text-sm text-gray-300">
                  From previous scan
                </div>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">New Threats</span>
                  <div className="text-red-500 flex items-center">
                    <AlertOctagon className="w-4 h-4 mr-1" />
                    <span>{dashboardData?.securityTrends.newThreats || 0}</span>
                  </div>
                </div>
                <div className="text-sm text-gray-300">
                  Critical issues detected
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <h3 className="text-sm font-medium text-gray-300 mb-3">Security Score History</h3>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-neon-purple to-neon-pink rounded-full transition-all duration-500"
                      style={{ width: `${dashboardData?.securityScore || 0}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-sm">
                    <span className="text-gray-400">Previous: {dashboardData?.securityTrends.previousScore || 0}%</span>
                    <span className="text-gray-400">Current: {dashboardData?.securityScore || 0}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <AddUserModal
          onClose={() => setShowAddUserModal(false)}
          onAdd={handleUserAdded}
        />
      )}
    </div>
  );
};

export default Dashboard;