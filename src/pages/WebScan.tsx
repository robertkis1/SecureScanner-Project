import React, { useState } from 'react';
import { 
  Shield, 
  Globe, 
  Key, 
  Clock, 
  Users, 
  Settings, 
  AlertTriangle, 
  AlertOctagon,
  AlertCircle,
  Info,
  TrendingUp,
  TrendingDown,
  X,
  Eye,
  FileWarning,
  ChevronDown,
  ChevronUp,
  Play,
  FileDown,
  FileText,
  CheckCircle,
  Lock,
  Database,
  Code,
  Upload,
  Zap,
  HelpCircle
} from 'lucide-react';
import { useSecurityScan } from '../hooks/useSecurityScan';
import type { ScanResult, ScanConfig } from '../services/SecurityScanner';

const WebScan: React.FC = () => {
  const [url, setUrl] = useState('');
  const [scanType, setScanType] = useState('quick');
  const [showCustomConfig, setShowCustomConfig] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [customConfig, setCustomConfig] = useState<ScanConfig>({
    checks: {
      ssl: true,
      headers: true,
      xss: true,
      sqlInjection: true,
      csrf: true,
      authentication: true,
      fileUploads: true,
      versionDisclosure: true,
      sensitiveData: true
    },
    options: {
      timeout: 30000,
      maxDepth: 3,
      includePaths: [],
      excludePaths: []
    }
  });
  const { scanning, error, report, startScan } = useSecurityScan();
  const [showResults, setShowResults] = useState(false);

  const scanTypeInfo = {
    quick: {
      title: 'Quick Scan',
      description: 'Fast security assessment focusing on critical vulnerabilities',
      icon: Zap,
      features: [
        'SSL/TLS Security Check',
        'Security Headers Analysis',
        'XSS Vulnerability Detection',
        'SQL Injection Testing'
      ],
      duration: '~2-5 minutes',
      color: 'neon-blue'
    },
    full: {
      title: 'Full Security Audit',
      description: 'Comprehensive security assessment of your web application',
      icon: Shield,
      features: [
        'All Quick Scan Features',
        'Authentication Security',
        'CSRF Protection Check',
        'File Upload Security',
        'Information Disclosure',
        'Sensitive Data Exposure'
      ],
      duration: '~10-15 minutes',
      color: 'neon-purple'
    },
    custom: {
      title: 'Custom Scan',
      description: 'Tailored security assessment with configurable options',
      icon: Settings,
      features: [
        'Select Specific Security Checks',
        'Configure Scan Depth',
        'Set Custom Timeouts',
        'Define Target Paths',
        'Exclude Specific Paths'
      ],
      duration: 'Varies based on configuration',
      color: 'neon-pink'
    }
  };

  const securityChecks = {
    ssl: {
      title: 'SSL/TLS Security',
      description: 'Check for secure HTTPS connection and proper SSL certificate configuration',
      icon: Lock,
      severity: 'critical'
    },
    headers: {
      title: 'Security Headers',
      description: 'Verify important security headers that protect against common web attacks',
      icon: Shield,
      severity: 'high'
    },
    xss: {
      title: 'Cross-Site Scripting (XSS)',
      description: 'Detect vulnerabilities that could allow attackers to inject malicious scripts',
      icon: Code,
      severity: 'critical'
    },
    sqlInjection: {
      title: 'SQL Injection',
      description: 'Find database vulnerabilities that could expose sensitive data',
      icon: Database,
      severity: 'critical'
    },
    csrf: {
      title: 'Cross-Site Request Forgery',
      description: 'Check for protections against unauthorized actions on behalf of users',
      icon: AlertTriangle,
      severity: 'high'
    },
    authentication: {
      title: 'Authentication Security',
      description: 'Evaluate login security and session management',
      icon: Key,
      severity: 'critical'
    },
    fileUploads: {
      title: 'File Upload Security',
      description: 'Check for secure file upload handling and restrictions',
      icon: Upload,
      severity: 'high'
    },
    versionDisclosure: {
      title: 'Information Disclosure',
      description: 'Detect exposed sensitive technical information',
      icon: Eye,
      severity: 'medium'
    },
    sensitiveData: {
      title: 'Sensitive Data Exposure',
      description: 'Find exposed confidential information like API keys or credentials',
      icon: FileWarning,
      severity: 'critical'
    }
  };

  const handleStartScan = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(false);
    
    try {
      await startScan(url, scanType, scanType === 'custom' ? customConfig : undefined);
      setShowResults(true);
    } catch (error) {
      console.error('Scan failed:', error);
    }
  };

  const handleScanTypeChange = (type: string) => {
    setScanType(type);
    if (type === 'custom') {
      setShowCustomConfig(true);
    } else {
      setShowCustomConfig(false);
    }
  };

  const toggleCustomConfig = () => {
    setShowCustomConfig(!showCustomConfig);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'high':
        return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
      case 'medium':
        return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'low':
        return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
      default:
        return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
    }
  };

  const getSecurityScore = (results: ScanResult[]) => {
    const weights = { critical: 25, high: 15, medium: 10, low: 5 };
    const deductions = results.reduce((total, result) => 
      total + (weights[result.severity as keyof typeof weights] || 0), 0);
    return Math.max(0, 100 - deductions);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 70) return 'text-yellow-500';
    if (score >= 50) return 'text-orange-500';
    return 'text-red-500';
  };

  const getSecurityAdvice = (score: number, results: ScanResult[]) => {
    const criticalCount = results.filter(r => r.severity === 'critical').length;
    const highCount = results.filter(r => r.severity === 'high').length;

    if (score >= 90) {
      return {
        status: 'Excellent',
        icon: TrendingUp,
        color: 'text-green-500',
        message: 'Your website has strong security measures in place. Continue monitoring and maintaining security best practices.'
      };
    } else if (score >= 70) {
      return {
        status: 'Good',
        icon: TrendingUp,
        color: 'text-yellow-500',
        message: 'Your website is reasonably secure but has some areas for improvement. Address medium and low severity issues when possible.'
      };
    } else if (score >= 50) {
      return {
        status: 'Concerning',
        icon: AlertTriangle,
        color: 'text-orange-500',
        message: `Your website has significant security risks. Address the ${highCount} high-severity issues within 24 hours.`
      };
    } else {
      return {
        status: 'Critical',
        icon: AlertOctagon,
        color: 'text-red-500',
        message: `Your website has critical security vulnerabilities. Address the ${criticalCount} critical issues immediately to prevent potential breaches.`
      };
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700 p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-neon-purple to-neon-pink rounded-xl">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">Web Application Security Scanner</h1>
              <p className="text-gray-300">
                Identify security vulnerabilities in web applications before hackers can exploit them.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="p-2 text-gray-400 hover:text-white transition-colors"
            title="Help"
          >
            <HelpCircle className="w-6 h-6" />
          </button>
        </div>

        {showHelp && (
          <div className="mb-8 p-6 bg-gray-800/50 rounded-xl border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">How to Use the Security Scanner</h3>
              <button
                onClick={() => setShowHelp(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-neon-pink mb-2">1. Choose a Scan Type</h4>
                <p className="text-gray-400 text-sm">
                  Select from Quick Scan (fastest), Full Audit (comprehensive), or Custom Scan (configurable).
                  Each type offers different levels of security testing.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-neon-pink mb-2">2. Enter Target URL</h4>
                <p className="text-gray-400 text-sm">
                  Input the complete URL of the website you want to scan (e.g., https://example.com).
                  Make sure you have permission to scan the target website.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-neon-pink mb-2">3. Configure Options</h4>
                <p className="text-gray-400 text-sm">
                  For Custom Scans, you can select specific security checks and configure scan parameters.
                  This allows for targeted testing of specific vulnerabilities.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-neon-pink mb-2">4. Review Results</h4>
                <p className="text-gray-400 text-sm">
                  After the scan completes, review the security score, identified vulnerabilities,
                  and recommended fixes. Results are categorized by severity level.
                </p>
              </div>
              <div className="text-sm text-gray-400 mt-4">
                <strong className="text-white">Note:</strong> Always ensure you have proper authorization
                before scanning any website. Unauthorized security scanning may be illegal.
              </div>
            </div>
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Choose Your Scan Type</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(scanTypeInfo).map(([type, info]) => {
              const Icon = info.icon;
              return (
                <button
                  key={type}
                  onClick={() => handleScanTypeChange(type)}
                  className={`p-6 bg-gray-800/50 rounded-xl border text-left transition-all duration-300 hover:scale-[1.02] ${
                    scanType === type
                      ? 'border-neon-pink bg-neon-pink/5'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 rounded-lg text-${info.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    {scanType === type && (
                      <div className="px-2 py-1 bg-neon-pink/20 rounded-full text-neon-pink text-xs">
                        Selected
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{info.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{info.description}</p>
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-300">Key Features:</div>
                    <ul className="text-sm text-gray-400 space-y-1">
                      {info.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-1 h-1 bg-neon-pink rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex items-center text-sm text-gray-400">
                      <Clock className="w-4 h-4 mr-2" />
                      {info.duration}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <form onSubmit={handleStartScan} className="space-y-6">
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-300 mb-2">
              Target URL
            </label>
            <div className="relative">
              <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-neon-pink focus:border-transparent pr-10"
                placeholder="https://example.com"
                required
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Globe className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-400">
              Enter the complete URL of the website you want to scan
            </p>
          </div>

          {scanType === 'custom' && (
            <button
              type="button"
              onClick={toggleCustomConfig}
              className="flex items-center space-x-2 text-neon-pink hover:text-neon-purple transition-colors"
            >
              {showCustomConfig ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  <span>Hide Custom Configuration</span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  <span>Show Custom Configuration</span>
                </>
              )}
            </button>
          )}

          {scanType === 'custom' && showCustomConfig && (
            <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-neon-pink" />
                  <h3 className="text-lg font-medium text-white">Custom Scan Configuration</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowCustomConfig(false)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  title="Close configuration"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-medium text-gray-300">Security Checks</h4>
                    <div className="flex items-center space-x-4">
                      <button
                        type="button"
                        onClick={() => setCustomConfig(prev => ({
                          ...prev,
                          checks: Object.keys(prev.checks).reduce((acc, key) => ({ ...acc, [key]: true }), {})
                        }))}
                        className="text-xs text-neon-pink hover:text-neon-purple transition-colors"
                      >
                        Select All
                      </button>
                      <button
                        type="button"
                        onClick={() => setCustomConfig(prev => ({
                          ...prev,
                          checks: Object.keys(prev.checks).reduce((acc, key) => ({ ...acc, [key]: false }), {})
                        }))}
                        className="text-xs text-gray-400 hover:text-white transition-colors"
                      >
                        Clear All
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {Object.entries(customConfig.checks).map(([key, value]) => {
                      const check = securityChecks[key as keyof typeof securityChecks];
                      const Icon = check.icon;
                      
                      return (
                        <div
                          key={key}
                          className={`p-4 rounded-lg border transition-colors ${
                            value
                              ? 'bg-gray-800/50 border-neon-pink/30'
                              : 'bg-gray-900/30 border-gray-700'
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className={`p-2 rounded-lg ${value ? 'text-neon-pink' : 'text-gray-500'}`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <label htmlFor={key} className="font-medium text-white">
                                  {check.title}
                                </label>
                                <input
                                  type="checkbox"
                                  id={key}
                                  checked={value}
                                  onChange={(e) => setCustomConfig({
                                    ...customConfig,
                                    checks: {
                                      ...customConfig.checks,
                                      [key]: e.target.checked
                                    }
                                  })}
                                  className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-neon-pink focus:ring-neon-pink"
                                />
                              </div>
                              <p className="mt-1 text-sm text-gray-400">{check.description}</p>
                              <div className="mt-2">
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                                  getSeverityColor(check.severity)
                                }`}>
                                  {check.severity.charAt(0).toUpperCase() + check.severity.slice(1)} Risk
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-4">Scan Options</h4>
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label htmlFor="timeout" className="text-sm text-gray-400">
                            Scan Timeout
                          </label>
                          <div className="text-xs text-gray-500">
                            Current: {customConfig.options.timeout / 1000}s
                          </div>
                        </div>
                        <div className="relative">
                          <input
                            type="range"
                            id="timeout"
                            min="5000"
                            max="60000"
                            step="5000"
                            value={customConfig.options.timeout}
                            onChange={(e) => setCustomConfig({
                              ...customConfig,
                              options: {
                                ...customConfig.options,
                                timeout: parseInt(e.target.value)
                              }
                            })}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>5s</span>
                            <span>60s</span>
                          </div>
                        </div>
                        <p className="mt-2 text-xs text-gray-500">
                          Maximum time to wait for each security check to complete
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label htmlFor="maxDepth" className="text-sm text-gray-400">
                            Scan Depth
                          </label>
                          <div className="text-xs text-gray-500">
                            Current: {customConfig.options.maxDepth} levels
                          </div>
                        </div>
                        <div className="relative">
                          <input
                            type="range"
                            id="maxDepth"
                            min="1"
                            max="10"
                            value={customConfig.options.maxDepth}
                            onChange={(e) => setCustomConfig({
                              ...customConfig,
                              options: {
                                ...customConfig.options,
                                maxDepth: parseInt(e.target.value)
                              }
                            })}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>1</span>
                            <span>10</span>
                          </div>
                        </div>
                        <p className="mt-2 text-xs text-gray-500">
                          How deep to scan linked pages (higher values take longer but find more issues)
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm text-gray-400 mb-2">
                          Include Paths
                        </label>
                        <textarea
                          value={customConfig.options.includePaths?.join('\n') || ''}
                          onChange={(e) => setCustomConfig({
                            ...customConfig,
                            options: {
                              ...customConfig.options,
                              includePaths: e.target.value.split('\n').filter(Boolean)
                            }
                          })}
                          className="mt-1 w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-neon-pink focus:border-neon-pink"
                          placeholder="/admin/*&#10;/api/*"
                          rows={3}
                        />
                        <p className="mt-2 text-xs text-gray-500">
                          Specific paths to scan (one per line). Use * for wildcards, e.g., /api/*
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm text-gray-400 mb-2">
                          Exclude Paths
                        </label>
                        <textarea
                          value={customConfig.options.excludePaths?.join('\n') || ''}
                          onChange={(e) => setCustomConfig({
                            ...customConfig,
                            options: {
                              ...customConfig.options,
                              excludePaths: e.target.value.split('\n').filter(Boolean)
                            }
                          })}
                          className="mt-1 w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-neon-pink focus:border-neon-pink"
                          placeholder="/assets/*&#10;/images/*"
                          rows={3}
                        />
                        <p className="mt-2 text-xs text-gray-500">
                          Paths to skip during scan (one per line). Use * for wildcards, e.g., /assets/*
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-4">
            <button
              type="submit"
              disabled={scanning}
              className={`flex items-center px-6 py-3 rounded-lg text-white font-medium transition-all duration-200 ${
                scanning
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-neon-purple to-neon-pink hover:opacity-90'
              }`}
            >
              {scanning ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Scanning...
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Start Scan
                </>
              )}
            </button>
            {scanning && (
              <div className="text-sm text-gray-400">
                Estimated time remaining: {scanTypeInfo[scanType].duration}
              </div>
            )}
          </div>
        </form>

        {error && (
          <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <div className="flex items-center text-red-500">
              <AlertTriangle className="w-5 h-5 mr-2" />
              {error}
            </div>
          </div>
        )}

        {showResults && report && (
          <div className="mt-8 space-y-6">
            {(() => {
              const score = getSecurityScore(report.results);
              const advice = getSecurityAdvice(score, report.results);
              const Icon = advice.icon;
              
              return (
                <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-xl border border-gray-700 backdrop-blur-sm">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="w-24 h-24 rounded-full border-4 border-gray-700 flex items-center justify-center">
                          <div className={`text-3xl font-bold ${getScoreColor(score)}`}>
                            {score}%
                          </div>
                        </div>
                        <div className={`absolute -top-2 -right-2 p-2 rounded-full ${advice.color} bg-gray-900`}>
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-white">Security Score</div>
                        <div className={`text-sm font-medium ${advice.color}`}>{advice.status}</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm text-gray-400">Issues Found</div>
                      <div className="grid grid-cols-2 gap-2">
                        {['critical', 'high', 'medium', 'low'].map((severity) => (
                          <div key={severity} className="flex items-center justify-between">
                            <span className="text-gray-400 capitalize">{severity}:</span>
                            <span className="font-medium text-white">
                              {report.results.filter(r => r.severity === severity).length}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-gray-400 mb-2">Recommended Action</div>
                      <p className="text-gray-300 text-sm">{advice.message}</p>
                    </div>
                  </div>
                </div>
              );
            })()}

            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Security Scan Results</h2>
                <p className="text-gray-400">
                  Scan completed in{' '}
                  <span className="text-white font-medium">
                    {((new Date(report.endTime).getTime() - new Date(report.startTime).getTime()) / 1000).toFixed(2)}s
                  </span>
                </p>
              </div>
              <button className="flex items-center px-4 py-2 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 text-white hover:bg-gray-700/50 transition-colors">
                <FileDown className="w-4 h-4 mr-2" />
                Export Report
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {['critical', 'high', 'medium', 'low'].map((severity) => {
                const count = report.results.filter(r => r.severity === severity).length;
                const colors = {
                  critical: 'from-red-500/20 to-red-500/5 border-red-500/20',
                  high: 'from-orange-500/20 to-orange-500/5 border-orange-500/20',
                  medium: 'from-yellow-500/20 to-yellow-500/5 border-yellow-500/20',
                  low: 'from-blue-500/20 to-blue-500/5 border-blue-500/20'
                };
                const icons = {
                  critical: AlertOctagon,
                  high: AlertTriangle,
                  medium: AlertCircle,
                  low: Info
                };
                const Icon = icons[severity as keyof typeof icons];
                
                return (
                  <div key={severity} className={`p-4 bg-gradient-to-br ${colors[severity as keyof typeof colors]} backdrop-blur-sm rounded-lg border`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-white mb-1">{count}</div>
                        <div className="text-sm text-gray-400 capitalize">{severity} Issues</div>
                      </div>
                      <Icon className={`w-8 h-8 text-${severity === 'critical' ? 'red' : severity === 'high' ? 'orange' : severity === 'medium' ? 'yellow' : 'blue'}-500`} />
                    </div>
                  </div>
                );
              })}
            </div>

            {['critical', 'high', 'medium', 'low'].map((severity) => {
              const results = report.results.filter(r => r.severity === severity);
              if (results.length === 0) return null;

              return (
                <div key={severity} className="space-y-4">
                  <h3 className="text-lg font-semibold text-white capitalize">
                    {severity} Severity Issues
                  </h3>
                  <div className="space-y-4">
                    {results.map((result, index) => (
                      <div
                        key={index}
                        className={`p-6 rounded-lg border backdrop-blur-sm ${getSeverityColor(result.severity)}`}
                      >
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center space-x-3 mb-2">
                                <span className="font-medium text-lg">{result.type}</span>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(result.severity)}`}>
                                  {result.severity}
                                </span>
                              </div>
                              <p className="text-gray-300">{result.description}</p>
                            </div>
                          </div>

                          {result.evidence && (
                            <div className="space-y-2">
                              <div className="text-sm font-medium text-gray-400">Evidence</div>
                              <div className="p-3 bg-gray-900/50 rounded-lg text-sm font-mono text-gray-300">
                                {result.evidence}
                              </div>
                            </div>
                          )}

                          {result.recommendation && (
                            <div className="space-y-2">
                              <div className="text-sm font-medium text-gray-400">Recommended Action</div>
                              <div className="flex items-start space-x-2 text-sm">
                                <CheckCircle className="w-5 h-5 text-neon-green flex-shrink-0 mt-0.5" />
                                <span className="text-gray-300">{result.recommendation}</span>
                              </div>
                            </div>
                          )}

                          <div className="flex items-center space-x-2 mt-4">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-400">
                              Priority: {
                                severity === 'critical' ? 'Fix Immediately' :
                                severity === 'high' ? 'Fix within 24 hours' :
                                severity === 'medium' ? 'Fix within 7 days' :
                                'Fix when possible'
                              }
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default WebScan;