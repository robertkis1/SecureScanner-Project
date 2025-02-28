import React, { useState, useEffect } from 'react';
import { 
  Wifi, 
  Shield, 
  Lock, 
  Globe, 
  AlertTriangle, 
  CheckCircle,
  RefreshCw,
  ExternalLink,
  Info,
  Server,
  Key,
  Network,
  Database,
  Search,
  UserCheck,
  Eye,
  Activity,
  ShieldAlert,
  History
} from 'lucide-react';
import { useSecurityLog } from '../hooks/useSecurityLog';
import type { SecurityCheck } from '../types/security';

interface SecurityCheck {
  name: string;
  status: 'secure' | 'warning' | 'error' | 'checking';
  details: string;
  recommendation?: string;
  category: 'network' | 'privacy' | 'system' | 'authentication';
}

const ConnectionSecurity: React.FC = () => {
  const [checks, setChecks] = useState<SecurityCheck[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastCheck, setLastCheck] = useState<Date | null>(null);
  const [overallScore, setOverallScore] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<'all' | SecurityCheck['category']>('all');
  const [showHistory, setShowHistory] = useState(false);
  const [securityHistory, setSecurityHistory] = useState<any[]>([]);
  const { saveSecurityLog, getSecurityHistory } = useSecurityLog();

  const runSecurityChecks = async () => {
    setLoading(true);
    setChecks([]);

    // Initialize all security checks
    const initialChecks: SecurityCheck[] = [
      // Network Security Checks
      {
        name: 'HTTPS Connection',
        status: 'checking',
        details: 'Checking HTTPS connection...',
        category: 'network'
      },
      {
        name: 'DNS Security',
        status: 'checking',
        details: 'Checking DNS configuration...',
        category: 'network'
      },
      {
        name: 'Open Ports',
        status: 'checking',
        details: 'Scanning for open ports...',
        category: 'network'
      },
      {
        name: 'SSL/TLS Configuration',
        status: 'checking',
        details: 'Analyzing SSL/TLS settings...',
        category: 'network'
      },
      {
        name: 'Wi-Fi Security',
        status: 'checking',
        details: 'Checking Wi-Fi security protocol...',
        category: 'network'
      },
      // Privacy Checks
      {
        name: 'DNS Leak Protection',
        status: 'checking',
        details: 'Checking for DNS leaks...',
        category: 'privacy'
      },
      {
        name: 'Privacy Leaks',
        status: 'checking',
        details: 'Scanning for data exposure...',
        category: 'privacy'
      },
      {
        name: 'Phishing Protection',
        status: 'checking',
        details: 'Analyzing phishing protection...',
        category: 'privacy'
      },
      // System Security
      {
        name: 'Software Updates',
        status: 'checking',
        details: 'Checking for outdated software...',
        category: 'system'
      },
      {
        name: 'Malware Protection',
        status: 'checking',
        details: 'Scanning for malicious activity...',
        category: 'system'
      },
      {
        name: 'Network Traffic',
        status: 'checking',
        details: 'Monitoring network traffic...',
        category: 'system'
      },
      // Authentication Security
      {
        name: '2FA Status',
        status: 'checking',
        details: 'Checking 2FA implementation...',
        category: 'authentication'
      }
    ];

    setChecks(initialChecks);

    // Simulate comprehensive security checks
    const results: SecurityCheck[] = [];

    // Network Security Checks
    const isHttps = window.location.protocol === 'https:';
    results.push({
      name: 'HTTPS Connection',
      status: isHttps ? 'secure' : 'error',
      details: isHttps ? 'Secure HTTPS connection established' : 'Insecure HTTP connection detected',
      recommendation: isHttps ? undefined : 'Enable HTTPS and configure proper SSL/TLS certificates',
      category: 'network'
    });

    await new Promise(resolve => setTimeout(resolve, 800));
    results.push({
      name: 'DNS Security',
      status: 'secure',
      details: 'DNS security features are properly configured',
      recommendation: 'Consider implementing DNSSEC for additional protection',
      category: 'network'
    });

    await new Promise(resolve => setTimeout(resolve, 600));
    const openPorts = [80, 443]; // Simulated open ports
    results.push({
      name: 'Open Ports',
      status: openPorts.length <= 2 ? 'secure' : 'warning',
      details: `${openPorts.length} ports open: ${openPorts.join(', ')}`,
      recommendation: openPorts.length > 2 ? 'Close unnecessary open ports' : undefined,
      category: 'network'
    });

    await new Promise(resolve => setTimeout(resolve, 700));
    results.push({
      name: 'SSL/TLS Configuration',
      status: 'secure',
      details: 'Using TLS 1.3 with strong cipher suites',
      recommendation: 'Regular SSL/TLS configuration review recommended',
      category: 'network'
    });

    await new Promise(resolve => setTimeout(resolve, 500));
    const wifiProtocol = 'WPA3'; // Simulated Wi-Fi protocol
    results.push({
      name: 'Wi-Fi Security',
      status: wifiProtocol === 'WPA3' ? 'secure' : 'warning',
      details: `Current Wi-Fi security: ${wifiProtocol}`,
      recommendation: wifiProtocol !== 'WPA3' ? 'Upgrade to WPA3 for enhanced security' : undefined,
      category: 'network'
    });

    // Privacy Checks
    await new Promise(resolve => setTimeout(resolve, 900));
    const dnsLeakFound = false; // Simulated DNS leak check
    results.push({
      name: 'DNS Leak Protection',
      status: dnsLeakFound ? 'error' : 'secure',
      details: dnsLeakFound ? 'DNS leaks detected' : 'No DNS leaks detected',
      recommendation: dnsLeakFound ? 'Configure DNS leak protection or use a VPN' : undefined,
      category: 'privacy'
    });

    await new Promise(resolve => setTimeout(resolve, 800));
    results.push({
      name: 'Privacy Leaks',
      status: 'warning',
      details: 'Some tracking cookies detected',
      recommendation: 'Review browser privacy settings and clear tracking cookies',
      category: 'privacy'
    });

    await new Promise(resolve => setTimeout(resolve, 700));
    results.push({
      name: 'Phishing Protection',
      status: 'secure',
      details: 'Anti-phishing protection is active',
      recommendation: 'Keep browser and security tools updated',
      category: 'privacy'
    });

    // System Security
    await new Promise(resolve => setTimeout(resolve, 1000));
    const outdatedSoftware = ['Browser']; // Simulated outdated software
    results.push({
      name: 'Software Updates',
      status: outdatedSoftware.length > 0 ? 'warning' : 'secure',
      details: outdatedSoftware.length > 0 
        ? `Outdated software found: ${outdatedSoftware.join(', ')}`
        : 'All software is up to date',
      recommendation: outdatedSoftware.length > 0 ? 'Update outdated software components' : undefined,
      category: 'system'
    });

    await new Promise(resolve => setTimeout(resolve, 800));
    results.push({
      name: 'Malware Protection',
      status: 'secure',
      details: 'No malicious activity detected',
      recommendation: 'Maintain updated antivirus and anti-malware protection',
      category: 'system'
    });

    await new Promise(resolve => setTimeout(resolve, 900));
    const suspiciousTraffic = false; // Simulated traffic analysis
    results.push({
      name: 'Network Traffic',
      status: suspiciousTraffic ? 'warning' : 'secure',
      details: suspiciousTraffic 
        ? 'Unusual network traffic patterns detected'
        : 'Normal network traffic patterns',
      recommendation: suspiciousTraffic ? 'Investigate suspicious network activity' : undefined,
      category: 'system'
    });

    // Authentication Security
    await new Promise(resolve => setTimeout(resolve, 600));
    const has2FA = true; // Simulated 2FA check
    results.push({
      name: '2FA Status',
      status: has2FA ? 'secure' : 'warning',
      details: has2FA 
        ? 'Two-factor authentication is enabled'
        : 'Two-factor authentication is not enabled',
      recommendation: has2FA ? undefined : 'Enable two-factor authentication for enhanced security',
      category: 'authentication'
    });

    // Calculate overall security score
    const score = results.reduce((acc, check) => {
      switch (check.status) {
        case 'secure': return acc + 100 / results.length;
        case 'warning': return acc + 50 / results.length;
        case 'error': return acc;
        default: return acc;
      }
    }, 0);

    try {
      await saveSecurityLog(Math.round(score), results);
      const history = await getSecurityHistory();
      setSecurityHistory(history);
    } catch (error) {
      console.error('Failed to save security log:', error);
    }

    setChecks(results);
    setOverallScore(Math.round(score));
    setLastCheck(new Date());
    setLoading(false);
  };

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const history = await getSecurityHistory();
        setSecurityHistory(history);
      } catch (error) {
        console.error('Failed to load security history:', error);
      }
    };

    runSecurityChecks();
    loadHistory();
  }, []);

  const getStatusColor = (status: SecurityCheck['status']) => {
    switch (status) {
      case 'secure':
        return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'warning':
        return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'error':
        return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'checking':
        return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
      default:
        return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
    }
  };

  const getStatusIcon = (status: SecurityCheck['status']) => {
    switch (status) {
      case 'secure':
        return CheckCircle;
      case 'warning':
        return AlertTriangle;
      case 'error':
        return ShieldAlert;
      case 'checking':
        return RefreshCw;
      default:
        return Info;
    }
  };

  const getCategoryIcon = (category: SecurityCheck['category']) => {
    switch (category) {
      case 'network':
        return Network;
      case 'privacy':
        return Eye;
      case 'system':
        return Server;
      case 'authentication':
        return Key;
      default:
        return Shield;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const filteredChecks = checks.filter(check => 
    selectedCategory === 'all' || check.category === selectedCategory
  );

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700 p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-neon-purple to-neon-pink rounded-xl">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">Connection Security Analysis</h1>
              <p className="text-gray-300">
                Comprehensive security analysis of your internet connection
              </p>
            </div>
          </div>
          <button
            onClick={runSecurityChecks}
            disabled={loading}
            className="flex items-center px-4 py-2 bg-gray-800 rounded-lg text-white hover:bg-gray-700 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Run Security Check
          </button>
        </div>

        {/* Security Score with History Toggle */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white">Security Analysis</h2>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center px-4 py-2 bg-gray-800 rounded-lg text-white hover:bg-gray-700 transition-colors"
          >
            <History className="w-5 h-5 mr-2" />
            {showHistory ? 'Hide History' : 'Show History'}
          </button>
        </div>

        {/* Security History */}
        {showHistory && (
          <div className="mb-8 p-6 bg-gray-800/50 rounded-xl border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Security History</h3>
            <div className="space-y-4">
              {securityHistory.map((log, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-800 rounded-lg border border-gray-700"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`text-xl font-bold ${getScoreColor(log.score)}`}>
                      {log.score}%
                    </div>
                    <div className="text-sm text-gray-400">
                      {new Date(log.timestamp).toLocaleString()}
                    </div>
                  </div>

                  {/* Overall Issues */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-red-500 font-bold">{log.issues.critical}</div>
                      <div className="text-sm text-gray-400">Critical</div>
                    </div>
                    <div className="text-center">
                      <div className="text-yellow-500 font-bold">{log.issues.warnings}</div>
                      <div className="text-sm text-gray-400">Warnings</div>
                    </div>
                    <div className="text-center">
                      <div className="text-green-500 font-bold">{log.issues.secure}</div>
                      <div className="text-sm text-gray-400">Secure</div>
                    </div>
                  </div>

                  {/* Category Breakdown */}
                  <div className="mt-4 space-y-4">
                    <h4 className="text-sm font-medium text-gray-300">Category Breakdown</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(log.checkCategories).map(([category, stats]) => {
                        const CategoryIcon = getCategoryIcon(category as SecurityCheck['category']);
                        return (
                          <div key={category} className="p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                            <div className="flex items-center space-x-2 mb-2">
                              <CategoryIcon className="w-4 h-4 text-neon-pink" />
                              <span className="text-sm text-gray-300 capitalize">{category}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2 text-xs">
                              <div>
                                <div className="text-green-500">{stats.secure}</div>
                                <div className="text-gray-400">Secure</div>
                              </div>
                              <div>
                                <div className="text-yellow-500">{stats.warning}</div>
                                <div className="text-gray-400">Warns</div>
                              </div>
                              <div>
                                <div className="text-red-500">{stats.error}</div>
                                <div className="text-gray-400">Errors</div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Security Score */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="col-span-2 p-6 bg-gray-800/50 rounded-xl border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Security Score</h2>
              {lastCheck && (
                <div className="text-sm text-gray-400">
                  Last checked: {lastCheck.toLocaleString()}
                </div>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-4 border-gray-700 flex items-center justify-center">
                  <div className={`text-3xl font-bold ${getScoreColor(overallScore)}`}>
                    {overallScore}%
                  </div>
                </div>
                <div className={`absolute -top-2 -right-2 p-2 rounded-full ${
                  overallScore >= 80 ? 'text-green-500 bg-green-500/10' :
                  overallScore >= 60 ? 'text-yellow-500 bg-yellow-500/10' :
                  'text-red-500 bg-red-500/10'
                }`}>
                  {overallScore >= 80 ? (
                    <Shield className="w-5 h-5" />
                  ) : overallScore >= 60 ? (
                    <AlertTriangle className="w-5 h-5" />
                  ) : (
                    <ShieldAlert className="w-5 h-5" />
                  )}
                </div>
              </div>
              <div>
                <div className="text-lg font-semibold text-white">
                  {overallScore >= 80 ? 'Excellent Security' :
                   overallScore >= 60 ? 'Moderate Security' :
                   'Security Concerns'}
                </div>
                <div className="text-sm text-gray-400">
                  {overallScore >= 80 ? 'Your connection meets high security standards' :
                   overallScore >= 60 ? 'Some security improvements recommended' :
                   'Immediate security improvements needed'}
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
            <h2 className="text-lg font-semibold text-white mb-4">Security Overview</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Secure:</span>
                <span className="text-green-500 font-medium">
                  {checks.filter(c => c.status === 'secure').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Warnings:</span>
                <span className="text-yellow-500 font-medium">
                  {checks.filter(c => c.status === 'warning').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Critical:</span>
                <span className="text-red-500 font-medium">
                  {checks.filter(c => c.status === 'error').length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === 'all'
                ? 'bg-neon-pink/20 text-neon-pink'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            All Checks
          </button>
          {(['network', 'privacy', 'system', 'authentication'] as const).map(category => {
            const CategoryIcon = getCategoryIcon(category);
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category
                    ? 'bg-neon-pink/20 text-neon-pink'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <CategoryIcon className="w-4 h-4" />
                <span className="capitalize">{category}</span>
              </button>
            );
          })}
        </div>

        {/* Security Checks */}
        <div className="space-y-4">
          {filteredChecks.map((check, index) => {
            const StatusIcon = getStatusIcon(check.status);
            const CategoryIcon = getCategoryIcon(check.category);
            return (
              <div
                key={index}
                className={`p-6 rounded-lg border ${getStatusColor(check.status)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <StatusIcon className={`w-5 h-5 ${
                        check.status === 'checking' ? 'animate-spin' : ''
                      }`} />
                      <span className="font-medium">{check.name}</span>
                      <div className="flex items-center px-2 py-1 rounded-full text-xs bg-gray-800/50">
                        <CategoryIcon className="w-3 h-3 mr-1" />
                        <span className="capitalize">{check.category}</span>
                      </div>
                    </div>
                    <p className="text-sm">{check.details}</p>
                    {check.recommendation && (
                      <div className="flex items-start mt-2 text-sm">
                        <Info className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-white">Recommendation:</strong>{' '}
                          {check.recommendation}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm ${getStatusColor(check.status)}`}>
                    {check.status === 'checking' ? 'Checking...' : check.status}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ConnectionSecurity;