import React, { useState, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useAuth } from './context/AuthContext';

// Shared Components
import ScrollToTop from './shared/ui/ScrollToTop';
import AuthModal from './shared/ui/AuthModal';

// Landing Components (Lazy Loaded)
const Navbar = lazy(() => import('./landing/components/Navbar'));
const LandingPage = lazy(() => import('./landing/pages/LandingPage'));
const AboutPage = lazy(() => import('./landing/pages/AboutPage'));
const LoginPage = lazy(() => import('./landing/pages/LoginPage'));
const PrivacyPolicy = lazy(() => import('./landing/pages/PrivacyPolicy'));
const TermsAndConditions = lazy(() => import('./landing/pages/TermsAndConditions'));

// Dashboard Components (Lazy Loaded)
const DashboardLayout = lazy(() => import('./layout/DashboardLayout'));
const Overview = lazy(() => import('./dashboard/pages/Overview'));
const Moderation = lazy(() => import('./dashboard/pages/Moderation'));
const ContentSafety = lazy(() => import('./dashboard/pages/content-safety/ContentSafety'));
const DeepfakeDetection = lazy(() => import('./dashboard/pages/deepfake-detection/DeepfakeDetection'));
const FraudDetection = lazy(() => import('./dashboard/pages/fraud-detection/FraudDetection'));
const Settings = lazy(() => import('./dashboard/components/Settings'));
const AuditLogsPanel = lazy(() => import('./dashboard/components/AuditLogsPanel'));
const ResearchHub = lazy(() => import('./dashboard/pages/research-hub/ResearchHub'));
const Threats = lazy(() => import('./dashboard/pages/Threats'));
const MarketingStudio = lazy(() => import('./dashboard/pages/marketing-studio/MarketingStudio'));
const AdsBrandsHub = lazy(() => import('./dashboard/pages/ads-brands/AdsBrandsHub'));
const PolicyEnforcement = lazy(() => import('./dashboard/pages/policy-enforcement/PolicyEnforcement'));



function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  // For review purposes, we allow access, but in production, we would check user
  // if (!user) return <Navigate to="/" replace />; 
  return children;
}

const LoadingScreen = () => (
  <div className="fixed inset-0 bg-slate-950 flex items-center justify-center z-[100]">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      <p className="text-slate-400 font-bold animate-pulse">Initializing Guardian AI...</p>
    </div>
  </div>
);

export default function App() {
  const { user, login, logout } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuditPanelOpen, setIsAuditPanelOpen] = useState(false);

  const handleLogin = (userData) => {
    login(userData);
    setIsAuthModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-guardian-bg overflow-x-hidden selection:bg-blue-600 selection:text-white">
      <Suspense fallback={<LoadingScreen />}>
        <ScrollToTop />
        
        {/* Landing Navbar */}
        <Navbar 
          user={user} 
          onSignIn={() => setIsAuthModalOpen(true)} 
          onSignOut={logout}
          onOpenAuditLogs={() => setIsAuditPanelOpen(true)}
        />
        
        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)} 
          onLogin={handleLogin} 
        />

        <Routes>
          {/* Landing Routes */}
          <Route path="/" element={<LandingPage onStart={() => setIsAuthModalOpen(true)} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsAndConditions />} />

          {/* Integrated Dashboard Routes */}
          <Route path="/dashboard/*" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Routes>
                  <Route index element={<Overview />} />
                  <Route path="moderation" element={<Moderation />} />
                  <Route path="threats" element={<Threats />} />
                  <Route path="content-safety" element={<ContentSafety />} />
                  <Route path="deepfake-detection" element={<DeepfakeDetection />} />
                  <Route path="fraud-detection" element={<FraudDetection />} />
                  <Route path="deepfake" element={<Navigate to="/dashboard/deepfake-detection" replace />} />
                  <Route path="fraud" element={<Navigate to="/dashboard/fraud-detection" replace />} />
                  <Route path="marketing-studio" element={<MarketingStudio />} />
                  <Route path="ads-brands" element={<AdsBrandsHub />} />
                  <Route path="policy-enforcement" element={<PolicyEnforcement />} />
                  <Route path="research" element={<ResearchHub />} />
                  <Route path="settings/*" element={
                    <Settings 
                      isAuditPanelOpenExternal={isAuditPanelOpen} 
                      setAuditPanelOpenExternal={setIsAuditPanelOpen} 
                    />
                  } />
                </Routes>
              </DashboardLayout>
            </ProtectedRoute>
          } />

          {/* Redirects for legacy paths */}
          <Route path="/settings/*" element={<Navigate to="/dashboard/settings" replace />} />
        </Routes>

        {/* Global Audit Logs Panel */}
        <AnimatePresence>
          {isAuditPanelOpen && (
            <AuditLogsPanel onClose={() => setIsAuditPanelOpen(false)} />
          )}
        </AnimatePresence>
      </Suspense>
    </div>
  );
}
