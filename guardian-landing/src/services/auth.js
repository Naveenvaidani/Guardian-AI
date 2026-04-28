import { db } from './db';

/**
 * Authentication Service
 * Handles login, registration, and 2FA verification.
 */

// Simulated 2FA Code (In real mail, this would be generated and sent via SMTP/SendGrid)
let current2FACode = "123456"; 

export const authService = {
  /**
   * Step 1: Identity Check
   */
  async identify(email) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const user = db.users.find(email);
    return { exists: !!user, email };
  },

  /**
   * Step 2: Credential Verification
   */
  async verifyCredentials(email, password) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = db.users.find(email);
    
    // In a real app, use bcrypt to compare hashes
    if (user && user.password === password) {
      // Generate a new 2FA code
      current2FACode = Math.floor(100000 + Math.random() * 900000).toString();
      
      // LOGIC FOR REAL MAIL:
      // if (process.env.SENDGRID_API_KEY) {
      //   await sendEmail(email, "Your 2FA Code", `Your code is ${current2FACode}`);
      // }
      
      console.log(`[SECURITY] 2FA Code for ${email}: ${current2FACode}`); // For dev testing
      
      return { success: true, user };
    }
    
    return { success: false, error: 'Invalid credentials' };
  },

  /**
   * Step 3: 2FA Verification
   */
  async verify2FA(email, code) {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    if (code === current2FACode || code === "123456") { // 123456 is a fallback for demo
      const user = db.users.find(email);
      db.logs.add(user.id, 'LOGIN_SUCCESS', { method: 'email_password' });
      return { success: true, user };
    }
    
    return { success: false, error: 'Invalid verification code' };
  },

  /**
   * Registration
   */
  async signUp(email, password, companyName) {
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    if (db.users.find(email)) {
      return { success: false, error: 'User already exists' };
    }

    const company = db.companies.create({ name: companyName });
    const user = db.users.create({ 
      email, 
      password, // In real app, hash this!
      companyId: company.id,
      role: 'admin',
      name: email.split('@')[0]
    });

    db.logs.add(user.id, 'ACCOUNT_CREATED', { companyId: company.id });
    
    return { success: true, user };
  },

  /**
   * Social Login (Mock)
   */
  async socialLogin(provider, socialData) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const { email, name } = socialData;
    const existingUser = db.users.find(email);
    
    if (existingUser) {
      db.logs.add(existingUser.id, 'SOCIAL_LOGIN_SUCCESS', { provider });
      return { success: true, user: existingUser, isNewUser: false };
    }
    
    // For new users via social, we need company info and confirmation
    return { success: true, isNewUser: true, socialData: { email, name, provider } };
  },

  /**
   * Complete Social Registration
   */
  async completeSocialSignup(socialData, companyName) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const { email, name, provider } = socialData;
    const company = db.companies.create({ name: companyName });
    const user = db.users.create({ 
      email, 
      name,
      companyId: company.id,
      role: 'admin',
      provider: provider,
      authMethod: 'social'
    });

    db.logs.add(user.id, 'SOCIAL_ACCOUNT_CREATED', { companyId: company.id, provider });
    
    return { success: true, user };
  }
};
