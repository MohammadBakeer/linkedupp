import authService from '../services/authService.js';
import { setAuthCookies, clearAuthCookies } from '../middlewares/authMiddleware.js';
import supabase from '../config/supabase.js';


export const getProfile = async (req, res) => {
  try {
    // req.user is set by the auth middleware
    const userId = req.user.id;
    console.log("Fetching profile for user ID:", userId);
    
    // Get profile from database
    const { data, error } = await supabase
      .from('profiles')
      .select('full_name, email')
      .eq('id', userId);
    
    if (error) {
      console.error('Error fetching profile:', error);
      return res.status(500).json({ message: 'Error fetching profile data' });
    }
    
    // Check if we got any results
    if (!data || data.length === 0) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    
    // Use the first result
    const profile = data[0];
    console.log('Profile:', profile);
    
    // Return only non-sensitive information
    return res.status(200).json({
      name: profile.full_name,
      email: profile.email
    });
  } catch (error) {
    console.error('Get profile error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

