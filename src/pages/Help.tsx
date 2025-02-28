import React, { useState, useEffect } from 'react';
import { 
  HelpCircle, 
  MessageCircle, 
  Book, 
  Send, 
  Search,
  ChevronDown,
  ChevronUp,
  Globe,
  Shield,
  Key,
  Clock,
  AlertTriangle,
  FileText,
  Mail,
  ExternalLink,
  X,
  Loader,
  CheckCircle
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';

interface ChatMessage {
  id: string;
  sender: 'user' | 'support';
  message: string;
  timestamp: Date;
}

interface FAQItem {
  question: string;
  answer: string;
  category: 'general' | 'security' | 'account' | 'technical';
}

const Help: React.FC = () => {
  const { user } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'general' | 'security' | 'account' | 'technical'>('all');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [showFeedbackSuccess, setShowFeedbackSuccess] = useState(false);
  const [showLiveChat, setShowLiveChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailForm, setEmailForm] = useState({
    subject: '',
    message: ''
  });
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [showDocumentation, setShowDocumentation] = useState(false);

  const faqs: FAQItem[] = [
    {
      question: 'How do I start a security scan?',
      answer: 'Navigate to the Web Scan page from your dashboard. Enter your target URL, select the scan type (Quick, Full, or Custom), configure any additional options if needed, and click "Start Scan". The scan will begin automatically and you\'ll be notified when it\'s complete.',
      category: 'general'
    },
    {
      question: 'What\'s the difference between scan types?',
      answer: 'Quick Scan: Basic security assessment focusing on critical vulnerabilities (2-5 minutes)\nFull Security Audit: Comprehensive assessment including authentication, CSRF, and file upload security (10-15 minutes)\nCustom Scan: Tailored assessment where you choose specific security checks and configurations',
      category: 'technical'
    },
    {
      question: 'How often should I run security scans?',
      answer: 'We recommend running automated scans at least weekly, with additional scans after major updates or changes to your application. Critical systems should be scanned daily. You can set up automated recurring scans in the Automated Scan section.',
      category: 'security'
    },
    {
      question: 'How do I interpret scan results?',
      answer: 'Scan results are categorized by severity (Critical, High, Medium, Low). Each finding includes a description of the vulnerability, evidence found, and recommended fixes. The security score provides an overall assessment of your application\'s security posture.',
      category: 'technical'
    },
    {
      question: 'What should I do if vulnerabilities are found?',
      answer: 'Address Critical and High severity issues immediately. Follow the provided recommendations for each finding. If you need assistance, our support team can help explain the vulnerabilities and suggest specific solutions.',
      category: 'security'
    },
    {
      question: 'How do I test password strength?',
      answer: 'Use the Password Testing tool to check password security. Upload a list of passwords (one per line) and the system will analyze each password\'s strength, check for breaches, and provide improvement recommendations.',
      category: 'security'
    },
    {
      question: 'Can I export scan reports?',
      answer: 'Yes, you can export scan reports in PDF or CSV format. Go to the Vulnerability Reports section, find the desired report, and click the export button. Reports include all findings, recommendations, and technical details.',
      category: 'technical'
    },
    {
      question: 'How do I manage my account settings?',
      answer: 'Access your account settings through the Settings page. Here you can update your profile information, change your password, manage notification preferences, and customize your dashboard theme.',
      category: 'account'
    },
    {
      question: 'What should I do if I forget my password?',
      answer: 'Click the "Forgot Password" link on the login page. Enter your email address and you\'ll receive instructions to reset your password. For security reasons, password reset links expire after 24 hours.',
      category: 'account'
    },
    {
      question: 'How do I set up automated scans?',
      answer: 'Go to the Automated Scan section, click "Add Schedule", enter your target URL and preferred schedule (daily, weekly, or monthly). You can configure notification preferences and specific security checks for each scheduled scan.',
      category: 'technical'
    }
  ];

  // Simulate chat connection
  useEffect(() => {
    if (showLiveChat) {
      setIsChatLoading(true);
      // Simulate connection delay
      setTimeout(() => {
        setChatMessages([
          {
            id: '1',
            sender: 'support',
            message: 'Hello! How can I help you today?',
            timestamp: new Date()
          }
        ]);
        setIsChatLoading(false);
      }, 1500);
    }
  }, [showLiveChat]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      message: newMessage.trim(),
      timestamp: new Date()
    };
    setChatMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Simulate support response
    setIsChatLoading(true);
    setTimeout(() => {
      const supportMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'support',
        message: 'Thank you for your message. One of our support agents will respond shortly.',
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, supportMessage]);
      setIsChatLoading(false);
    }, 1000);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailLoading(true);

    try {
      // Save support request to database
      const { error } = await supabase
        .from('support_requests')
        .insert({
          user_id: user?.id,
          subject: emailForm.subject,
          message: emailForm.message,
          status: 'pending'
        });

      if (error) throw error;

      setEmailSuccess(true);
      setEmailForm({ subject: '', message: '' });
    } catch (error) {
      console.error('Failed to send support request:', error);
    } finally {
      setEmailLoading(false);
    }
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackMessage.trim()) return;

    try {
      const { error } = await supabase
        .from('security_feedback')
        .insert({
          user_id: user?.id,
          message: feedbackMessage.trim()
        });

      if (error) throw error;

      setShowFeedbackSuccess(true);
      setFeedbackMessage('');
      setTimeout(() => setShowFeedbackSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    }
  };

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700 p-8">
        <div className="flex items-center space-x-4 mb-8">
          <div className="p-3 bg-gradient-to-r from-neon-purple to-neon-pink rounded-xl">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">Help & Support</h1>
            <p className="text-gray-300">
              Find answers to common questions or get in touch with our support team
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search and Filters */}
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search help articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-neon-pink focus:border-transparent pl-10"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              </div>

              <div className="flex flex-wrap gap-2">
                {(['all', 'general', 'security', 'account', 'technical'] as const).map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                      selectedCategory === category
                        ? 'bg-neon-pink/20 text-neon-pink'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <div
                  key={index}
                  className={`p-4 bg-gray-800/50 rounded-lg border ${
                    expandedQuestion === index
                      ? 'border-neon-pink'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <button
                    onClick={() => setExpandedQuestion(expandedQuestion === index ? null : index)}
                    className="w-full flex items-center justify-between text-left"
                  >
                    <span className="font-medium text-white">{faq.question}</span>
                    {expandedQuestion === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                  {expandedQuestion === index && (
                    <div className="mt-4 text-gray-300 whitespace-pre-line">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Support Options */}
          <div className="space-y-6">
            {/* Live Chat */}
            <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-neon-purple/20 rounded-lg">
                  <MessageCircle className="w-5 h-5 text-neon-purple" />
                </div>
                <h3 className="text-lg font-semibold text-white">Live Chat Support</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Get instant help from our security experts through live chat.
              </p>
              <button 
                onClick={() => setShowLiveChat(true)}
                className="w-full flex items-center justify-center px-4 py-2 bg-neon-purple/20 text-neon-purple rounded-lg hover:bg-neon-purple/30 transition-colors"
              >
                Start Chat
              </button>
            </div>

            {/* Email Support */}
            <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-neon-pink/20 rounded-lg">
                  <Mail className="w-5 h-5 text-neon-pink" />
                </div>
                <h3 className="text-lg font-semibold text-white">Email Support</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Send us a detailed message and we'll respond within 24 hours.
              </p>
              <button
                onClick={() => setShowEmailForm(true)}
                className="w-full flex items-center justify-center px-4 py-2 bg-neon-pink/20 text-neon-pink rounded-lg hover:bg-neon-pink/30 transition-colors"
              >
                Contact Support
              </button>
            </div>

            {/* Documentation */}
            <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-neon-blue/20 rounded-lg">
                  <Book className="w-5 h-5 text-neon-blue" />
                </div>
                <h3 className="text-lg font-semibold text-white">Documentation</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Browse our comprehensive guides and API documentation.
              </p>
              <button
                onClick={() => setShowDocumentation(true)}
                className="w-full flex items-center justify-center px-4 py-2 bg-neon-blue/20 text-neon-blue rounded-lg hover:bg-neon-blue/30 transition-colors"
              >
                View Documentation
              </button>
            </div>

            {/* Feedback Form */}
            <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-neon-green/20 rounded-lg">
                  <Send className="w-5 h-5 text-neon-green" />
                </div>
                <h3 className="text-lg font-semibold text-white">Send Feedback</h3>
              </div>
              <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                <textarea
                  value={feedbackMessage}
                  onChange={(e) => setFeedbackMessage(e.target.value)}
                  placeholder="Tell us how we can improve..."
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-neon-pink focus:border-transparent resize-none"
                  rows={4}
                ></textarea>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg text-white hover:opacity-90 transition-opacity"
                >
                  Submit Feedback
                </button>
              </form>
              {showFeedbackSuccess && (
                <div className="mt-4 p-2 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 text-sm text-center">
                  Thank you for your feedback!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Live Chat Modal */}
      {showLiveChat && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-xl max-w-md w-full h-[600px] border border-gray-800 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-5 h-5 text-neon-purple" />
                <h3 className="font-semibold text-white">Live Support Chat</h3>
              </div>
              <button
                onClick={() => setShowLiveChat(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-neon-purple/20 text-white ml-auto'
                        : 'bg-gray-800 text-white'
                    }`}
                  >
                    {message.message}
                  </div>
                </div>
              ))}
              {isChatLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-800 p-3 rounded-lg text-white">
                    <Loader className="w-5 h-5 animate-spin" />
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-gray-800">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-neon-pink focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 bg-neon-purple text-white rounded-lg hover:bg-opacity-90 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Email Support Modal */}
      {showEmailForm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-xl max-w-md w-full border border-gray-800 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Contact Support</h3>
              <button
                onClick={() => {
                  setShowEmailForm(false);
                  setEmailSuccess(false);
                  setEmailForm({ subject: '', message: '' });
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {emailSuccess ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-white mb-2">Message Sent!</h4>
                <p className="text-gray-300 mb-6">
                  We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setShowEmailForm(false);
                    setEmailSuccess(false);
                  }}
                  className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={emailForm.subject}
                    onChange={(e) => setEmailForm({ ...emailForm, subject: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-neon-pink focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    value={emailForm.message}
                    onChange={(e) => setEmailForm({ ...emailForm, message: e.target.value })}
                    required
                    rows={6}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-neon-pink focus:border-transparent resize-none"
                  ></textarea>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowEmailForm(false)}
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={emailLoading}
                    className="px-4 py-2 bg-gradient-to-r from-neon-purple to-neon-pink text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center"
                  >
                    {emailLoading ? (
                      <>
                        <Loader className="w-4 h-4 animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Documentation Modal */}
      {showDocumentation && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-xl max-w-4xl w-full h-[80vh] border border-gray-800 flex flex-col">
            <div className="p-4 border-b border-gray-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Book className="w-5 h-5 text-neon-blue" />
                <h3 className="font-semibold text-white">Documentation</h3>
              </div>
              <button
                onClick={() => setShowDocumentation(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="prose prose-invert max-w-none">
                <h2>Getting Started</h2>
                <p>
                  Welcome to the SecureScanner documentation. Here you'll find comprehensive guides and documentation to help you start working with our security tools as quickly as possible.
                </p>

                <h3>Quick Start Guide</h3>
                <ol>
                  <li>Sign up for an account</li>
                  <li>Configure your security settings</li>
                  <li>Run your first security scan</li>
                  <li>Review and act on the results</li>
                </ol>

                <h3>Security Features</h3>
                <ul>
                  <li>Web Application Scanning</li>
                  <li>Password Security Testing</li>
                  <li>Network Security Analysis</li>
                  <li>Real-time Monitoring</li>
                </ul>

                <h3>API Documentation</h3>
                <p>
                  Our REST API lets you integrate SecureScanner's security features directly into your applications.
                </p>

                <div className="bg-gray-800 p-4 rounded-lg">
  <code>
    curl -X POST https://api.securescanner.com/v1/scan <br />
    &nbsp;&nbsp;-H "Authorization: Bearer YOUR_API_KEY" <br />
    &nbsp;&nbsp;-d &#123;&quot;url&quot;: &quot;https://example.com&quot;&#125;
  </code>
</div>


                <h3>Best Practices</h3>
                <ul>
                  <li>Regular security scans</li>
                  <li>Proper access control</li>
                  <li>Secure configuration</li>
                  <li>Incident response planning</li>
                </ul>

                <h3>Support</h3>
                <p>
                  Need help? Our support team is available 24/7 to assist you with any questions or issues.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Help;