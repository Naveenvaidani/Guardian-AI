import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, ChevronLeft, ShieldCheck, Mail, Lock, Building, 
  AlertCircle, CheckCircle2, ArrowRight, Eye, EyeOff 
} from 'lucide-react';
import { authService } from '../../services/auth';

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const AppleIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.05 20.28c-.96.95-2.04 1.72-3.23 1.72-1.15 0-1.56-.7-2.92-.7-1.37 0-1.84.68-2.92.7-1.13 0-2.31-.86-3.35-2.04-2.12-2.39-3.24-6.3-2.18-8.86 1.11-2.67 3.51-4.08 5.67-4.08 1.15 0 2.14.41 2.86.41.67 0 1.83-.41 3.12-.41 1.34 0 3.32.48 4.6 2.17-2.73 1.58-2.29 5.33.43 6.64-.67 1.76-1.55 3.5-2.08 4.45zM12.03 5.35c-.13-1.78 1.38-3.41 3.01-4.35-.12 1.88-1.5 3.48-3.01 4.35z" fill="currentColor"/>
  </svg>
);

export default function AuthModal({ isOpen, onClose, onLogin }) {
  const [step, setStep] = useState('identify'); // identify, password, 2fa, register, forgot_password, social_picker, social_signup
  const [mode, setMode] = useState('login'); // login, signup
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [socialData, setSocialData] = useState(null);
  const [activeProvider, setActiveProvider] = useState(null);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setStep('identify');
      setMode('login');
      setEmail('');
      setPassword('');
      setCompany('');
      setOtp(['', '', '', '', '', '']);
      setShowPassword(false);
      setError('');
      setSuccess('');
    }
  }, [isOpen]);

  const handleIdentify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const { exists } = await authService.identify(email);
      if (mode === 'login') {
        if (exists) {
          setStep('password');
        } else {
          setError('No account found with this email. Please sign up.');
        }
      } else {
        if (exists) {
          setError('Account already exists. Please sign in.');
        } else {
          setStep('register');
        }
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await authService.verifyCredentials(email, password);
      if (result.success) {
        setStep('2fa');
        setSuccess('Security code sent to your email');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Connection failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await authService.signUp(email, password, company);
      if (result.success) {
        setStep('2fa');
        setSuccess('Account created! Enter the 2FA code sent to your email.');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess('Recovery link sent to your inbox!');
      setTimeout(() => {
        setStep('identify');
        setSuccess('');
      }, 2000);
    } catch (err) {
      setError('Failed to send recovery link.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleSocialSelect = async (provider) => {
    setActiveProvider(provider);
    setStep('social_picker');
  };

  const mockSocialAccounts = [
    { name: 'Naveen Vaidani', email: 'naveen@example.com', avatar: 'N' },
    { name: 'Developer Account', email: 'dev@guardian-ai.com', avatar: 'D' },
  ];

  const handleSocialAccountClick = async (account) => {
    setLoading(true);
    setError('');
    
    try {
      const result = await authService.socialLogin(activeProvider, account);
      if (result.isNewUser) {
        setSocialData(result.socialData);
        setStep('social_signup');
      } else {
        setSuccess(`Welcome back, ${result.user.name}!`);
        setTimeout(() => {
          onLogin(result.user);
        }, 1000);
      }
    } catch (err) {
      setError('Social login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignupSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await authService.completeSocialSignup(socialData, company);
      if (result.success) {
        setSuccess('Profile completed successfully!');
        setTimeout(() => {
          onLogin(result.user);
        }, 1000);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to complete profile.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify2FA = async (e) => {
    if (e) e.preventDefault();
    const code = otp.join('');
    if (code.length < 6) return;

    setLoading(true);
    setError('');

    try {
      const result = await authService.verify2FA(email, code);
      if (result.success) {
        setSuccess('Authentication successful!');
        setTimeout(() => {
          onLogin(result.user);
        }, 1000);
      } else {
        setError(result.error);
        setOtp(['', '', '', '', '', '']);
        const firstInput = document.getElementById('otp-0');
        if (firstInput) firstInput.focus();
      }
    } catch (err) {
      setError('Verification failed.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (otp.every(val => val !== '') && step === '2fa') {
      handleVerify2FA();
    }
  }, [otp]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-guardian-navy/60 backdrop-blur-md"
          />
          
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              className="w-full max-w-md overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-white shadow-2xl pointer-events-auto border border-guardian-border"
            >
              <div className="relative p-6 md:p-10">
                {/* Header Section */}
                <div className="flex items-center justify-between mb-6 md:mb-8">
                  {step !== 'identify' ? (
                    <button onClick={() => setStep('identify')} className="p-2 hover:bg-guardian-section rounded-full transition-colors">
                      <ChevronLeft className="h-5 w-5 text-guardian-navy" />
                    </button>
                  ) : <div className="w-9 h-9" />}
                  
                  <img src="/Logo_transparent.png" alt="Guardian AI" className="h-12 md:h-16 w-auto" />
                  
                  <button onClick={onClose} className="p-2 hover:bg-guardian-section rounded-full transition-colors">
                    <X className="h-5 w-5 text-guardian-secondary" />
                  </button>
                </div>

                {/* Mode Tabs */}
                {step === 'identify' && (
                  <div className="flex p-1 bg-guardian-section rounded-xl md:rounded-2xl mb-6 md:mb-8 border border-guardian-border">
                    <button
                      onClick={() => setMode('login')}
                      className={`flex-1 py-2 md:py-2.5 text-xs md:text-sm font-bold rounded-lg md:rounded-xl transition-all ${
                        mode === 'login' ? 'bg-white text-guardian-navy shadow-sm border border-guardian-border' : 'text-guardian-secondary hover:text-guardian-navy'
                      }`}
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => setMode('signup')}
                      className={`flex-1 py-2 md:py-2.5 text-xs md:text-sm font-bold rounded-lg md:rounded-xl transition-all ${
                        mode === 'signup' ? 'bg-white text-guardian-navy shadow-sm border border-guardian-border' : 'text-guardian-secondary hover:text-guardian-navy'
                      }`}
                    >
                      Create Account
                    </button>
                  </div>
                )}

                <AnimatePresence mode="wait">
                  {step === 'identify' && (
                    <motion.div key="identify" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}>
                      <h2 className="text-xl md:text-2xl font-bold text-guardian-navy text-center mb-2">
                        {mode === 'login' ? 'Platform Access' : 'Join Guardian'}
                      </h2>
                      <p className="text-guardian-secondary text-center mb-6 md:mb-8 text-xs md:text-sm">
                        {mode === 'login' ? 'Enter your enterprise email to continue' : 'Start securing your enterprise intelligence'}
                      </p>
                      
                      <div className="grid grid-cols-1 gap-3 md:gap-4">
                        <button 
                          onClick={() => handleSocialSelect('google')}
                          className="flex w-full items-center justify-center gap-3 rounded-xl md:rounded-2xl border border-guardian-border bg-white px-4 py-3 md:py-4 font-bold text-guardian-navy transition-all hover:bg-slate-50 hover:shadow-sm active:scale-[0.98]"
                        >
                          <GoogleIcon />
                          <span className="text-sm md:text-base">{mode === 'login' ? 'Continue' : 'Sign up'} with Google</span>
                        </button>
                        <button 
                          onClick={() => handleSocialSelect('apple')}
                          className="flex w-full items-center justify-center gap-3 rounded-xl md:rounded-2xl bg-guardian-navy px-4 py-3 md:py-4 font-bold text-white transition-all hover:bg-[#0F2A4D] hover:shadow-lg active:scale-[0.98]"
                        >
                          <AppleIcon />
                          <span className="text-sm md:text-base">{mode === 'login' ? 'Continue' : 'Sign up'} with Apple</span>
                        </button>
                      </div>

                      <div className="relative my-8 md:my-10">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-guardian-border"></div></div>
                        <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest text-guardian-secondary bg-white px-4">Or use email</div>
                      </div>

                      <form onSubmit={handleIdentify} className="space-y-4">
                        <div className="relative group">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-guardian-secondary group-focus-within:text-guardian-blue transition-colors" />
                          <input
                            type="email"
                            placeholder="work@company.com"
                            className="w-full rounded-xl md:rounded-2xl border border-guardian-border bg-guardian-section pl-12 pr-4 py-3 md:py-4 text-sm md:text-base text-guardian-navy font-medium focus:border-guardian-blue focus:ring-4 focus:ring-guardian-blue/5 outline-none transition-all"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                        <button disabled={loading} className="w-full flex items-center justify-center gap-2 rounded-xl md:rounded-2xl bg-guardian-blue px-4 py-3 md:py-4 font-bold text-white transition-all hover:bg-blue-700 hover:shadow-lg disabled:opacity-50">
                          <span className="text-sm md:text-base">{loading ? 'Validating...' : 'Continue'}</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </form>
                    </motion.div>
                  )}

                  {step === 'password' && (
                    <motion.div key="password" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}>
                      <h2 className="text-xl md:text-2xl font-bold text-guardian-navy text-center mb-2">Welcome Back</h2>
                      <p className="text-guardian-secondary text-center mb-6 md:mb-8 text-xs md:text-sm font-medium truncate px-4">{email}</p>
                      
                      <form onSubmit={handleLoginSubmit} className="space-y-6">
                        <div className="relative group">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-guardian-secondary group-focus-within:text-guardian-blue transition-colors" />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter password"
                            className="w-full rounded-xl md:rounded-2xl border border-guardian-border bg-guardian-section pl-12 pr-12 py-3 md:py-4 text-sm md:text-base text-guardian-navy font-medium focus:border-guardian-blue focus:ring-4 focus:ring-guardian-blue/5 outline-none transition-all"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoFocus
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 text-guardian-secondary hover:text-guardian-blue transition-colors"
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                        <button disabled={loading} className="w-full rounded-xl md:rounded-2xl bg-guardian-blue px-4 py-3 md:py-4 font-bold text-white transition-all hover:bg-blue-700 hover:shadow-lg disabled:opacity-50">
                          <span className="text-sm md:text-base">{loading ? 'Verifying...' : 'Sign In'}</span>
                        </button>
                        <button 
                          type="button" 
                          onClick={() => setStep('forgot_password')}
                          className="w-full text-xs md:text-sm font-bold text-guardian-blue hover:underline"
                        >
                          Forgot password?
                        </button>
                      </form>
                    </motion.div>
                  )}

                  {step === 'forgot_password' && (
                    <motion.div key="forgot_password" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}>
                      <h2 className="text-xl md:text-2xl font-bold text-guardian-navy text-center mb-2">Recover Access</h2>
                      <p className="text-guardian-secondary text-center mb-6 md:mb-8 text-xs md:text-sm">We'll send a secure reset link to your email</p>
                      
                      <form onSubmit={handleForgotPasswordSubmit} className="space-y-6">
                        <div className="relative group">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-guardian-secondary group-focus-within:text-guardian-blue transition-colors" />
                          <input
                            type="email"
                            placeholder="work@company.com"
                            className="w-full rounded-xl md:rounded-2xl border border-guardian-border bg-guardian-section pl-12 pr-4 py-3 md:py-4 text-sm md:text-base text-guardian-navy font-medium focus:border-guardian-blue focus:ring-4 focus:ring-guardian-blue/5 outline-none transition-all"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                        <button disabled={loading} className="w-full rounded-xl md:rounded-2xl bg-guardian-blue px-4 py-3 md:py-4 font-bold text-white transition-all hover:bg-blue-700 hover:shadow-lg disabled:opacity-50">
                          <span className="text-sm md:text-base">{loading ? 'Sending Link...' : 'Send Recovery Email'}</span>
                        </button>
                      </form>
                    </motion.div>
                  )}

                  {step === 'register' && (
                    <motion.div key="register" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}>
                      <h2 className="text-xl md:text-2xl font-bold text-guardian-navy text-center mb-2">Create Account</h2>
                      <p className="text-guardian-secondary text-center mb-6 md:mb-8 text-xs md:text-sm">Join the intelligent shield network</p>
                      
                      <form onSubmit={handleRegisterSubmit} className="space-y-4">
                        <div className="relative group">
                          <Building className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-guardian-secondary group-focus-within:text-guardian-blue transition-colors" />
                          <input
                            type="text"
                            placeholder="Company Name"
                            className="w-full rounded-xl md:rounded-2xl border border-guardian-border bg-guardian-section pl-12 pr-4 py-3 md:py-4 text-sm md:text-base text-guardian-navy font-medium focus:border-guardian-blue focus:ring-4 focus:ring-guardian-blue/5 outline-none transition-all"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            required
                          />
                        </div>
                        <div className="relative group">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-guardian-secondary group-focus-within:text-guardian-blue transition-colors" />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Create password"
                            className="w-full rounded-xl md:rounded-2xl border border-guardian-border bg-guardian-section pl-12 pr-12 py-3 md:py-4 text-sm md:text-base text-guardian-navy font-medium focus:border-guardian-blue focus:ring-4 focus:ring-guardian-blue/5 outline-none transition-all"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 text-guardian-secondary hover:text-guardian-blue transition-colors"
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                        <button disabled={loading} className="w-full rounded-xl md:rounded-2xl bg-guardian-blue px-4 py-3 md:py-4 font-bold text-white transition-all hover:bg-blue-700 hover:shadow-lg disabled:opacity-50">
                          <span className="text-sm md:text-base">{loading ? 'Creating...' : 'Secure My Organization'}</span>
                        </button>
                      </form>
                    </motion.div>
                  )}

                  {step === '2fa' && (
                    <motion.div key="2fa" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}>
                      <div className="flex justify-center mb-4 md:mb-6">
                        <div className="p-3 md:p-4 bg-guardian-blue/10 rounded-full">
                          <ShieldCheck className="h-8 w-8 md:h-10 md:w-10 text-guardian-blue" />
                        </div>
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold text-guardian-navy text-center mb-2">Two-Factor Auth</h2>
                      <p className="text-guardian-secondary text-center mb-8 md:mb-10 text-xs md:text-sm">
                        Enter the 6-digit code sent to <br/><span className="font-bold text-guardian-navy truncate block px-4">{email}</span>
                      </p>
                      
                      <div className="flex justify-center gap-1.5 md:gap-2 mb-8 md:mb-10">
                        {otp.map((digit, index) => (
                          <input
                            key={index}
                            id={`otp-${index}`}
                            type="text"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            className="w-10 h-12 md:w-12 md:h-14 text-center text-lg md:text-xl font-bold rounded-lg md:rounded-xl border border-guardian-border bg-guardian-section focus:border-guardian-blue focus:ring-4 focus:ring-guardian-blue/5 outline-none transition-all"
                            autoFocus={index === 0}
                          />
                        ))}
                      </div>
                      
                      <button 
                        onClick={handleVerify2FA}
                        disabled={loading || otp.some(val => val === '')}
                        className="w-full rounded-xl md:rounded-2xl bg-guardian-blue px-4 py-3 md:py-4 font-bold text-white transition-all hover:bg-blue-700 hover:shadow-lg disabled:opacity-50"
                      >
                        <span className="text-sm md:text-base">{loading ? 'Verifying...' : 'Complete Secure Login'}</span>
                      </button>
                      
                      <p className="mt-6 md:mt-8 text-center text-[10px] md:text-xs text-guardian-secondary">
                        Didn't receive a code? <button className="font-bold text-guardian-blue hover:underline">Resend code</button>
                      </p>
                    </motion.div>
                  )}

                  {step === 'social_picker' && (
                    <motion.div key="social_picker" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}>
                      <h2 className="text-xl md:text-2xl font-bold text-guardian-navy text-center mb-2 uppercase tracking-tight">Choose an account</h2>
                      <p className="text-guardian-secondary text-center mb-6 md:mb-8 text-xs md:text-sm">to continue to <span className="font-bold text-guardian-navy">Guardian AI</span></p>
                      
                      <div className="space-y-3">
                        {mockSocialAccounts.map((account) => (
                          <button
                            key={account.email}
                            onClick={() => handleSocialAccountClick(account)}
                            className="flex w-full items-center gap-4 p-4 rounded-2xl border border-guardian-border hover:bg-guardian-section transition-all group"
                          >
                            <div className="h-10 w-10 rounded-full bg-guardian-navy text-white flex items-center justify-center font-bold text-sm">
                              {account.avatar}
                            </div>
                            <div className="flex flex-col items-start">
                              <span className="text-sm font-bold text-guardian-navy group-hover:text-guardian-blue transition-colors">{account.name}</span>
                              <span className="text-xs text-guardian-secondary">{account.email}</span>
                            </div>
                            <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                              <ArrowRight className="h-4 w-4 text-guardian-blue" />
                            </div>
                          </button>
                        ))}
                        
                        <button className="flex w-full items-center gap-4 p-4 rounded-2xl border border-dashed border-guardian-border hover:bg-guardian-section transition-all group mt-4">
                          <div className="h-10 w-10 rounded-full border border-guardian-border flex items-center justify-center text-guardian-secondary">
                            <X className="h-4 w-4" />
                          </div>
                          <span className="text-sm font-bold text-guardian-secondary">Use another account</span>
                        </button>
                      </div>
                      
                      <p className="mt-8 text-[10px] text-guardian-secondary text-center leading-relaxed">
                        To continue, {activeProvider === 'google' ? 'Google' : 'Apple'} will share your name, email address, and profile picture with Guardian AI.
                      </p>
                    </motion.div>
                  )}

                  {step === 'social_signup' && (
                    <motion.div key="social_signup" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}>
                      <div className="flex justify-center mb-6">
                        <div className="h-16 w-16 rounded-full bg-guardian-blue/10 flex items-center justify-center">
                          <CheckCircle2 className="h-8 w-8 text-guardian-blue" />
                        </div>
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold text-guardian-navy text-center mb-2">Almost there, {socialData?.name.split(' ')[0]}</h2>
                      <p className="text-guardian-secondary text-center mb-8 text-xs md:text-sm">Complete your enterprise profile to start using Guardian AI</p>
                      
                      <form onSubmit={handleSocialSignupSubmit} className="space-y-6">
                        <div className="relative group">
                          <Building className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-guardian-secondary group-focus-within:text-guardian-blue transition-colors" />
                          <input
                            type="text"
                            placeholder="Organization Name"
                            className="w-full rounded-xl md:rounded-2xl border border-guardian-border bg-guardian-section pl-12 pr-4 py-3 md:py-4 text-sm md:text-base text-guardian-navy font-medium focus:border-guardian-blue focus:ring-4 focus:ring-guardian-blue/5 outline-none transition-all"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            required
                            autoFocus
                          />
                        </div>
                        
                        <div className="flex items-center gap-3 p-4 bg-guardian-section rounded-2xl border border-guardian-border">
                          <div className="h-8 w-8 rounded-full bg-guardian-navy/10 flex items-center justify-center text-xs font-bold text-guardian-navy">
                            {activeProvider === 'google' ? 'G' : 'A'}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-guardian-navy">Linked Email</span>
                            <span className="text-[10px] text-guardian-secondary">{socialData?.email}</span>
                          </div>
                        </div>

                        <button disabled={loading} className="w-full rounded-xl md:rounded-2xl bg-guardian-blue px-4 py-3 md:py-4 font-bold text-white transition-all hover:bg-blue-700 hover:shadow-lg disabled:opacity-50">
                          <span className="text-sm md:text-base">{loading ? 'Finalizing...' : 'Get Started'}</span>
                        </button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Status Messages */}
                <AnimatePresence>
                  {error && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-6 flex items-center gap-2 rounded-lg md:rounded-xl bg-red-50 p-3 md:p-4 text-xs md:text-sm font-bold text-red-600 border border-red-100">
                      <AlertCircle className="h-4 w-4 md:h-5 md:w-5 shrink-0" />
                      {error}
                    </motion.div>
                  )}
                  {success && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-6 flex items-center gap-2 rounded-lg md:rounded-xl bg-green-50 p-3 md:p-4 text-xs md:text-sm font-bold text-green-600 border border-green-100">
                      <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 shrink-0" />
                      {success}
                    </motion.div>
                  )}
                </AnimatePresence>

                <p className="mt-6 md:mt-8 text-center text-[8px] md:text-[10px] uppercase tracking-widest font-bold text-guardian-secondary leading-relaxed opacity-60">
                  Secured by Guardian Shield Engine 2.0
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}



