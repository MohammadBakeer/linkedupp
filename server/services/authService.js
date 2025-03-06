import supabase from '../config/supabase.js';

class AuthService {
  /**
   * Verifies a Supabase session token
   * @param {string} token - Supabase session token
   * @returns {Promise<object|null>} The user data or null if invalid
   */
  async verifyToken(token) {
    try {
      const { data, error } = await supabase.auth.getUser(token);
      
      if (error) {
        console.error('Token verification error:', error.message);
        return null;
      }
      
      return data?.user || null;
    } catch (error) {
      console.error('Token verification exception:', error.message);
      return null;
    }
  }

  /**
   * Refresh a user session with a refresh token
   * @param {string} refreshToken - The refresh token
   * @returns {Promise<object|null>} New session data or null if failed
   */
  async refreshSession(refreshToken) {
    try {
      const { data, error } = await supabase.auth.refreshSession({
        refresh_token: refreshToken,
      });
      
      if (error) {
        console.error('Session refresh error:', error.message);
        return null;
      }
      
      return data?.session || null;
    } catch (error) {
      console.error('Session refresh exception:', error.message);
      return null;
    }
  }

  /**
   * Get user profile from database
   * @param {string} userId - The user's ID
   * @returns {Promise<object|null>} User profile or null if not found
   */
  async getUserProfile(userId) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Get profile error:', error.message);
        return null;
      }
      
      return data;
    } catch (error) {
      console.error('Get profile exception:', error.message);
      return null;
    }
  }
}

export default new AuthService(); 