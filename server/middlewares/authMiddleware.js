import authService from '../services/authService.js';

/**
 * Middleware to protect routes requiring authentication
 * Verifies the Supabase session cookie
 */
export const requireAuth = async (req, res, next) => {
  try {
    // Get the token from cookies or Authorization header
    let token = null;
    let refreshToken = null;
    
    // Check for the Supabase session cookie (new format)
    const cookies = req.cookies;
    const supabaseCookieKey = Object.keys(cookies).find(key => 
      key.startsWith('sb-') && key.endsWith('-auth-token')
    );
    
    if (supabaseCookieKey) {
      try {
        // Parse the Supabase session cookie
        const supabaseSession = JSON.parse(cookies[supabaseCookieKey]);
        token = supabaseSession.access_token;
        refreshToken = supabaseSession.refresh_token;
        console.log('Using token from Supabase session cookie');
      } catch (e) {
        console.error('Error parsing Supabase session cookie:', e);
      }
    }
    
    // Check for legacy cookies
    if (!token) {
      token = req.cookies['sb-access-token'];
      refreshToken = req.cookies['sb-refresh-token'];
      if (token) {
        console.log('Using token from legacy cookies');
      }
    }
    
    // Check Authorization header if no cookie token
    const authHeader = req.headers.authorization;
    if (!token && authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7); // Remove 'Bearer ' prefix
      console.log('Using token from Authorization header');
    }
    
    if (!token) {
      console.log('No authentication token found');
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    // Verify the session token
    const user = await authService.verifyToken(token);
    
    if (!user) {
      console.log('Token verification failed, attempting refresh');
      // Token is invalid or expired, try to refresh
      if (refreshToken) {
        const session = await authService.refreshSession(refreshToken);
        
        if (session) {
          console.log('Session refreshed successfully');
          // Set new cookies and continue
          setAuthCookies(res, session);
          req.user = session.user;
          return next();
        }
      }
      
      // Refresh failed or no refresh token
      console.log('Session refresh failed or no refresh token');
      clearAuthCookies(res);
      return res.status(401).json({ message: 'Session expired' });
    }
    
    // Token is valid, set user on request and proceed
    console.log('Authentication successful for user:', user.email);
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Optional authentication middleware
 * Doesn't reject the request if not authenticated
 */
export const optionalAuth = async (req, res, next) => {
  try {
    const token = req.cookies['sb-access-token'];
    
    if (token) {
      const user = await authService.verifyToken(token);
      if (user) {
        req.user = user;
      }
    }
    
    next();
  } catch (error) {
    // Just proceed without setting user
    next();
  }
};

/**
 * Set auth cookies on response
 */
export const setAuthCookies = (res, session) => {
  // Cookie options for security
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    path: '/'
  };
  
  res.cookie('sb-access-token', session.access_token, cookieOptions);
  res.cookie('sb-refresh-token', session.refresh_token, cookieOptions);
};

/**
 * Clear auth cookies on response
 */
export const clearAuthCookies = (res) => {
  res.clearCookie('sb-access-token');
  res.clearCookie('sb-refresh-token');
}; 