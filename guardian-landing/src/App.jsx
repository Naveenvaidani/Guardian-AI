import React, { useState } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import Settings from './components/dashboard/Settings';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import ScrollToTop from './components/ui/ScrollToTop';
import AuthModal from './components/ui/AuthModal';
import { useAuth } from './context/AuthContext';
import { LogOut, Menu, X as CloseIcon } from 'lucide-react';

function Navbar({ user, onSignIn, onSignOut }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Platform', path: '/', type: 'link' },
    { name: 'About', path: '/about', type: 'link' },
    { name: 'Pricing', path: '/#pricing', type: 'anchor' },
    { name: 'Contact', path: '/#contact', type: 'anchor' },
  ];

  return (
    <header className="absolute inset-x-0 top-0 z-50 border-b border-guardian-border bg-white px-4 md:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between py-1 md:py-2">
        <div className="flex flex-1 items-center">
          <Link to="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
            <img src="/Logo_transparent.png" alt="Guardian AI Logo" className="h-24 md:h-32 w-auto object-contain" />
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            link.type === 'link' ? (
              <Link key={link.name} to={link.path} className="text-base font-bold text-guardian-secondary transition-colors hover:text-guardian-blue">
                {link.name}
              </Link>
            ) : (
              <a key={link.name} href={link.path} className="text-base font-bold text-guardian-secondary transition-colors hover:text-guardian-blue">
                {link.name}
              </a>
            )
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-3 md:gap-6">
          <Link to="/settings" className="hidden text-base font-bold text-guardian-navy hover:text-guardian-blue transition-colors lg:block">
            Settings
          </Link>
          
          {user ? (
            <div className="flex items-center gap-3 md:gap-4">
              <div className="hidden h-8 w-px bg-guardian-border lg:block"></div>
              <div className="hidden items-center gap-3 lg:flex">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-guardian-navy text-white">
                  <span className="text-xs font-bold">{user.name ? user.name.charAt(0) : 'U'}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-guardian-navy leading-none">{user.name || 'User'}</span>
                  <span className="text-[9px] font-medium text-guardian-secondary uppercase tracking-wider mt-0.5">{user.provider || 'enterprise'}</span>
                </div>
              </div>
              <button 
                onClick={onSignOut}
                className="flex items-center gap-2 text-sm md:text-base font-bold text-guardian-navy hover:text-guardian-danger transition-colors lg:ml-2"
              >
                <LogOut className="h-4 w-4 md:h-5 md:w-5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          ) : (
            <button 
              onClick={onSignIn}
              className="hidden text-sm md:text-base font-bold text-guardian-navy hover:text-guardian-blue transition-colors md:block"
            >
              Sign In
            </button>
          )}

          <button className="rounded-lg md:rounded-xl bg-guardian-navy px-4 md:px-8 py-2 md:py-3.5 text-sm md:text-lg font-bold text-white shadow-md transition-all hover:bg-[#0F2A4D] hover:scale-[1.02] active:scale-[0.98]">
            <span className="hidden sm:inline">Launch Platform</span>
            <span className="sm:hidden">Launch</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-guardian-navy lg:hidden"
          >
            {isMenuOpen ? <CloseIcon size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Side Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-40 bg-guardian-navy/40 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-white p-8 shadow-2xl lg:hidden"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-12">
                  <img src="/Logo_transparent.png" alt="Guardian AI" className="h-20 w-auto" />
                  <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-guardian-section rounded-full transition-colors">
                    <CloseIcon size={24} className="text-guardian-secondary" />
                  </button>
                </div>

                <nav className="flex flex-col gap-6">
                  {navLinks.map((link) => (
                    link.type === 'link' ? (
                      <Link 
                        key={link.name} 
                        to={link.path} 
                        onClick={() => setIsMenuOpen(false)}
                        className="text-xl font-bold text-guardian-navy hover:text-guardian-blue transition-colors"
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <a 
                        key={link.name} 
                        href={link.path} 
                        onClick={() => setIsMenuOpen(false)}
                        className="text-xl font-bold text-guardian-navy hover:text-guardian-blue transition-colors"
                      >
                        {link.name}
                      </a>
                    )
                  ))}
                  <div className="h-px bg-guardian-border my-2" />
                  <Link 
                    to="/settings" 
                    onClick={() => setIsMenuOpen(false)}
                    className="text-xl font-bold text-guardian-navy hover:text-guardian-blue transition-colors"
                  >
                    Settings
                  </Link>
                  {!user && (
                    <button 
                      onClick={() => { setIsMenuOpen(false); onSignIn(); }}
                      className="text-left text-xl font-bold text-guardian-blue"
                    >
                      Sign In
                    </button>
                  )}
                </nav>

                <div className="mt-auto pt-8">
                  <button className="w-full rounded-2xl bg-guardian-navy py-4 text-lg font-bold text-white shadow-lg">
                    Launch Platform
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  const { user, login, logout } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleLogin = (userData) => {
    login(userData);
    setIsAuthModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-guardian-bg overflow-x-hidden">
      <ScrollToTop />
      <Navbar 
        user={user} 
        onSignIn={() => setIsAuthModalOpen(true)} 
        onSignOut={logout} 
      />
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onLogin={handleLogin} 
      />

      <main className="pt-24 md:pt-32">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/settings/*" element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsAndConditions />} />
        </Routes>
      </main>
    </div>
  );
}


