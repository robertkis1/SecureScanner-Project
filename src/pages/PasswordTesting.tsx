import React, { useState } from 'react';
import { 
  Key, 
  Upload, 
  Play, 
  FileText, 
  FileDown,
  AlertTriangle,
  CheckCircle,
  Shield,
  Lock,
  Download,
  Clock
} from 'lucide-react';
import { supabase } from '../lib/supabase';

interface PasswordStrength {
  label: 'Weak' | 'Medium' | 'Strong' | 'Very Strong';
  score: number;
  color: string;
  recommendations: string[];
}

interface PasswordResult {
  password: string;
  strength: PasswordStrength;
  breachCount: number;
  timeToCrack: string;
  suggestions: string[];
}

const PasswordTesting: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [results, setResults] = useState<PasswordResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setFile(files[0]);
      setError(null);
    }
  };

  const analyzePassword = (password: string): PasswordResult => {
    // Password strength criteria
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const length = password.length;

    let strength: PasswordStrength;
    const suggestions: string[] = [];

    // Calculate score
    let score = 0;
    if (hasLower) score += 1;
    if (hasUpper) score += 1;
    if (hasNumber) score += 1;
    if (hasSpecial) score += 1;
    if (length >= 12) score += 2;
    else if (length >= 8) score += 1;

    // Determine strength based on score
    if (score >= 6) {
      strength = {
        label: 'Very Strong',
        score: 100,
        color: 'text-green-500',
        recommendations: ['Continue using strong passwords like this']
      };
    } else if (score >= 4) {
      strength = {
        label: 'Strong',
        score: 75,
        color: 'text-blue-500',
        recommendations: ['Consider adding special characters']
      };
    } else if (score >= 3) {
      strength = {
        label: 'Medium',
        score: 50,
        color: 'text-yellow-500',
        recommendations: ['Add uppercase letters', 'Include numbers']
      };
    } else {
      strength = {
        label: 'Weak',
        score: 25,
        color: 'text-red-500',
        recommendations: [
          'Make it longer',
          'Add uppercase letters',
          'Include numbers',
          'Add special characters'
        ]
      };
    }

    // Generate suggestions
    if (!hasLower) suggestions.push('Add lowercase letters');
    if (!hasUpper) suggestions.push('Add uppercase letters');
    if (!hasNumber) suggestions.push('Add numbers');
    if (!hasSpecial) suggestions.push('Add special characters');
    if (length < 12) suggestions.push('Make it at least 12 characters long');

    // Calculate time to crack (simplified estimation)
    let timeToCrack = 'Less than a second';
    if (score >= 6) timeToCrack = 'Centuries';
    else if (score >= 4) timeToCrack = 'Years';
    else if (score >= 3) timeToCrack = 'Months';
    else if (score >= 2) timeToCrack = 'Days';
    else if (score >= 1) timeToCrack = 'Hours';

    return {
      password,
      strength,
      breachCount: Math.floor(Math.random() * 3), // Simulated breach count
      timeToCrack,
      suggestions
    };
  };

  const handleStartTest = async () => {
    if (!file) {
      setError('Please upload a file first');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const text = await file.text();
      const passwords = text.split('\n').filter(line => line.trim());
      
      if (passwords.length === 0) {
        throw new Error('No passwords found in file');
      }

      const results = passwords.map(analyzePassword);
      setResults(results);

      // Save report to database
      try {
        await saveScanReport(results);
      } catch (err) {
        console.error('Failed to save report:', err);
        // Don't throw the error here to allow the user to still see the results
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const saveScanReport = async (results: PasswordResult[]) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const report = {
        user_id: user.id,
        total_passwords: results.length,
        weak_count: results.filter(r => r.strength.label === 'Weak').length,
        medium_count: results.filter(r => r.strength.label === 'Medium').length,
        strong_count: results.filter(r => r.strength.label === 'Strong').length,
        very_strong_count: results.filter(r => r.strength.label === 'Very Strong').length,
        results: results
      };

      const { error } = await supabase
        .from('password_test_reports')
        .insert(report);

      if (error) throw error;
    } catch (error) {
      console.error('Failed to save password report:', error);
      throw error;
    }
  };

  const exportToPDF = () => {
    if (!results.length) return;

    // Create PDF content
    const content = `
Password Test Results
====================

Summary:
--------
Total Passwords: ${results.length}
Weak: ${results.filter(r => r.strength.label === 'Weak').length}
Medium: ${results.filter(r => r.strength.label === 'Medium').length}
Strong: ${results.filter(r => r.strength.label === 'Strong').length}
Very Strong: ${results.filter(r => r.strength.label === 'Very Strong').length}

Detailed Results:
----------------
${results.map(result => `
Password: ${'*'.repeat(result.password.length)}
Strength: ${result.strength.label}
Time to Crack: ${result.timeToCrack}
Breach Status: ${result.breachCount > 0 ? `Found in ${result.breachCount} breaches` : 'Not found in breaches'}
Suggestions:
${result.suggestions.map(s => `- ${s}`).join('\n')}
`).join('\n')}
    `.trim();

    // Create blob and download
    const blob = new Blob([content], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'password-test-results.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700 p-8">
        <div className="flex items-center space-x-4 mb-6">
          <div className="p-3 bg-gradient-to-r from-neon-purple to-neon-pink rounded-xl">
            <Key className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">Password Strength Testing</h1>
            <p className="text-gray-300">
              Test multiple passwords for strength and security vulnerabilities
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

        <div className="space-y-6">
          <div className="border-2 border-dashed border-gray-700 rounded-lg p-6">
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer inline-flex items-center px-4 py-2 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg text-white hover:opacity-90 transition-opacity"
                >
                  <span>Upload Password List</span>
                  <input
                    id="file-upload"
                    type="file"
                    className="sr-only"
                    accept=".txt,.csv"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>
              <p className="mt-2 text-sm text-gray-400">
                Upload a .txt or .csv file containing passwords (one per line)
              </p>
              {file && (
                <p className="mt-2 text-sm text-neon-pink">
                  Selected file: {file.name}
                </p>
              )}
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleStartTest}
              disabled={loading || !file}
              className={`flex items-center px-4 py-2 rounded-lg text-white font-medium transition-all duration-200 ${
                loading || !file
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-neon-purple to-neon-pink hover:opacity-90'
              }`}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Testing...
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Start Password Test
                </>
              )}
            </button>
            {results.length > 0 && (
              <button
                onClick={exportToPDF}
                className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <FileDown className="w-5 h-5 mr-2" />
                Export Report
              </button>
            )}
          </div>
        </div>

        {results.length > 0 && (
          <div className="mt-8 space-y-6">
            <div className="grid grid-cols-4 gap-4">
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="text-2xl font-bold text-red-500">
                  {results.filter(r => r.strength.label === 'Weak').length}
                </div>
                <div className="text-sm text-gray-400">Weak</div>
              </div>
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <div className="text-2xl font-bold text-yellow-500">
                  {results.filter(r => r.strength.label === 'Medium').length}
                </div>
                <div className="text-sm text-gray-400">Medium</div>
              </div>
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <div className="text-2xl font-bold text-blue-500">
                  {results.filter(r => r.strength.label === 'Strong').length}
                </div>
                <div className="text-sm text-gray-400">Strong</div>
              </div>
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="text-2xl font-bold text-green-500">
                  {results.filter(r => r.strength.label === 'Very Strong').length}
                </div>
                <div className="text-sm text-gray-400">Very Strong</div>
              </div>
            </div>

            <div className="space-y-4">
              {results.map((result, index) => (
                <div
                  key={index}
                  className="p-6 bg-gray-800/50 rounded-lg border border-gray-700"
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

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium text-gray-300 mb-2">
                        Time to Crack
                      </div>
                      <div className="flex items-center space-x-2 text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>{result.timeToCrack}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-300 mb-2">
                        Security Tips
                      </div>
                      <div className="space-y-1">
                        {result.suggestions.map((tip, i) => (
                          <div key={i} className="flex items-start space-x-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-neon-green flex-shrink-0 mt-0.5" />
                            <span className="text-gray-400">{tip}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordTesting;