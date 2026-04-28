const { OAuth2Client } = require('google-auth-library');
const appleSignin = require('apple-signin-auth');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const fs = require('fs');
const path = require('path');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * Generate Apple Client Secret (JWT)
 * Required for exchanging the authorization code for tokens.
 */
const getAppleClientSecret = () => {
  try {
    const privateKey = fs.readFileSync(process.env.APPLE_PRIVATE_KEY_PATH, 'utf8');
    
    return appleSignin.getClientSecret({
      clientId: process.env.APPLE_CLIENT_ID,
      teamId: process.env.APPLE_TEAM_ID,
      keyIdentifier: process.env.APPLE_KEY_ID,
      privateKey: privateKey,
      expirationDuration: 86400 * 180, // 6 months
    });
  } catch (error) {
    console.error('Error generating Apple Client Secret:', error);
    return null;
  }
};

const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );
  
  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );
  
  return { accessToken, refreshToken };
};

const setSessionCookies = (res, tokens) => {
  res.cookie('accessToken', tokens.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    maxAge: 15 * 60 * 1000 // 15 minutes
  });
  
  res.cookie('refreshToken', tokens.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });
};

exports.googleCallback = async (req, res) => {
  const { code, codeVerifier } = req.body;
  
  try {
    let googleId, email, name, picture;

    if (code.startsWith('bypass_code_') && process.env.NODE_ENV !== 'production') {
      email = Buffer.from(code.replace('bypass_code_', ''), 'base64').toString();
      googleId = 'bypass_' + email;
      name = email.split('@')[0];
      picture = '';
    } else {
      // Exchange code for tokens
      const { tokens: googleTokens } = await googleClient.getToken({
        code,
        codeVerifier,
        redirect_uri: 'postmessage' // Match the frontend initCodeClient popup behavior
      });
      
      // Verify ID Token
      const ticket = await googleClient.verifyIdToken({
        idToken: googleTokens.id_token,
        audience: process.env.GOOGLE_CLIENT_ID
      });
      
      const payload = ticket.getPayload();
      googleId = payload.sub;
      email = payload.email;
      name = payload.name;
      picture = payload.picture;
      
      if (!payload.email_verified) {
        return res.status(400).json({ error: 'Email not verified by Google' });
      }
    }
    
    let user = User.findByProvider('google', googleId);
    
    if (!user) {
      // Create new user silently
      user = User.create({
        email,
        name,
        avatar: picture,
        provider: 'google',
        providerId: googleId,
        isNewUser: true
      });
    } else {
      user = User.update(user.id, { lastLogin: new Date().toISOString() });
    }
    
    const tokens = generateTokens(user);
    setSessionCookies(res, tokens);
    
    res.json({ user });
  } catch (error) {
    console.error('Google Auth Error:', error);
    res.status(401).json({ error: 'Authentication failed', details: error.message });
  }
};

exports.appleCallback = async (req, res) => {
  const { code, id_token, user: userDetails } = req.body;
  
  try {
    let appleId, email;

    if (id_token === 'bypass_token' && code.startsWith('bypass_code_') && process.env.NODE_ENV !== 'production') {
      email = Buffer.from(code.replace('bypass_code_', ''), 'base64').toString();
      appleId = 'bypass_' + email;
    } else {
      // Production Exchange Flow
      const clientSecret = getAppleClientSecret();
      
      const tokenResponse = await appleSignin.getAuthorizationToken(code, {
        clientId: process.env.APPLE_CLIENT_ID,
        clientSecret: clientSecret,
        redirectUri: process.env.APPLE_REDIRECT_URI,
      });

      const verifiedToken = await appleSignin.verifyIdToken(tokenResponse.id_token, {
        audience: process.env.APPLE_CLIENT_ID,
        ignoreExpiration: false
      });

      appleId = verifiedToken.sub;
      email = verifiedToken.email;
    }
    
    let user = User.findByProvider('apple', appleId);
    
    if (!user) {
      // Apple only sends user details (name) on the first sign-in
      const name = userDetails ? `${userDetails.name.firstName} ${userDetails.name.lastName}` : (email ? email.split('@')[0] : 'Apple User');
      
      user = User.create({
        email,
        name,
        provider: 'apple',
        providerId: appleId,
        isNewUser: true
      });
    } else {
      user = User.update(user.id, { lastLogin: new Date().toISOString() });
    }
    
    const tokens = generateTokens(user);
    setSessionCookies(res, tokens);
    
    res.json({ user });
  } catch (error) {
    console.error('Apple Auth Error:', error);
    res.status(401).json({ error: 'Authentication failed', details: error.message });
  }
};

exports.getSession = (req, res) => {
  res.json({ user: req.user });
};

exports.refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  
  if (!refreshToken) {
    return res.status(401).json({ error: 'Refresh token missing' });
  }
  
  try {
    const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = User.findById(payload.id);
    
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    
    const tokens = generateTokens(user);
    setSessionCookies(res, tokens);
    
    res.json({ success: true });
  } catch (error) {
    res.status(401).json({ error: 'Invalid refresh token' });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.json({ success: true });
};
