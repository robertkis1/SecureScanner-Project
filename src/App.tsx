import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import About from './pages/About';
import History from './pages/History';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import WebScan from './pages/WebScan';
import PasswordTesting from './pages/PasswordTesting';
import VulnerabilityReports from './pages/VulnerabilityReports';
import AutomatedScan from './pages/AutomatedScan';
import ConnectionSecurity from './pages/ConnectionSecurity';
import UserManagement from './pages/UserManagement';
import Settings from './pages/Settings';
import Help from './pages/Help';
import VulnerabilityScanning from './pages/services/VulnerabilityScanning';
import PenetrationTesting from './pages/services/PenetrationTesting';
import AccessManagement from './pages/services/AccessManagement';
import RealTimeMonitoring from './pages/services/RealTimeMonitoring';
import PasswordTestingImportance from './pages/services/PasswordTestingImportance';
import ConnectionSecurityService from './pages/services/ConnectionSecurity';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Cookies from './pages/Cookies';
import { useAuthStore } from './store/authStore';

function App() {
  const { initializeAuth, user, isLoading } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-neon-pink"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/history" element={<History />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/forgot-password" element={user ? <Navigate to="/dashboard" /> : <ForgotPassword />} />
        
        {/* Service pages */}
        <Route path="/services/vulnerability-scanning" element={<VulnerabilityScanning />} />
        <Route path="/services/penetration-testing" element={<PenetrationTesting />} />
        <Route path="/services/password-testing" element={<PasswordTesting />} />
        <Route path="/services/password-testing-importance" element={<PasswordTestingImportance />} />
        <Route path="/services/access-management" element={<AccessManagement />} />
        <Route path="/services/monitoring" element={<RealTimeMonitoring />} />
        <Route path="/services/connection-security" element={<ConnectionSecurityService />} />

        {/* Legal and Contact pages */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/cookies" element={<Cookies />} />

        {/* Protected routes */}
        <Route element={<PrivateRoute><Layout /></PrivateRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/web-scan" element={<WebScan />} />
          <Route path="/password-testing" element={<PasswordTesting />} />
          <Route path="/reports" element={<VulnerabilityReports />} />
          <Route path="/automated-scan" element={<AutomatedScan />} />
          <Route path="/connection-security" element={<ConnectionSecurity />} />
          
          {/* Admin-only route */}
          <Route path="/users" element={
            <PrivateRoute requireAdmin>
              <UserManagement />
            </PrivateRoute>
          } />
          
          <Route path="/settings" element={<Settings />} />
          <Route path="/help" element={<Help />} />
        </Route>

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
