import authService from '../services/authService.js';
import { setAuthCookies, clearAuthCookies } from '../middlewares/authMiddleware.js';
import supabase from '../config/supabase.js';

/**
 * Handle session callback from Supabase
 */
export const handleAuthCallback = async (req, res) => {
  try {
    const { access_token, refresh_token } = req.body;
    
    if (!access_token || !refresh_token) {
      return res.status(400).json({ message: 'Missing tokens' });
    }
    
    // Verify the token
    const { data: { user }, error } = await supabase.auth.getUser(access_token);
    
    if (error || !user) {
      return res.status(401).json({ message: 'Invalid tokens' });
    }
    
    // Set secure cookies for future requests
    setAuthCookies(res, { access_token, refresh_token });
    
    return res.status(200).json({ message: 'Authentication successful', user });
  } catch (error) {
    console.error('Auth callback error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Get current user's profile
 */
export const getProfile = async (req, res) => {
  try {
    // req.user is set by the auth middleware
    const userId = req.user.id;
    
    // Get profile from database
    const profile = await authService.getUserProfile(userId);
    
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    
    return res.status(200).json(profile);
  } catch (error) {
    console.error('Get profile error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Sign out current user
 */
export const signOut = (req, res) => {
  try {
    // Clear auth cookies
    clearAuthCookies(res);
    return res.status(200).json({ message: 'Signed out successfully' });
  } catch (error) {
    console.error('Sign out error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}; 