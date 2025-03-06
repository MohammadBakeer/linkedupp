import { Router } from 'express';
import { handleAuthCallback, getProfile, signOut } from '../controllers/authController.js';
import { requireAuth } from '../middlewares/authMiddleware.js';

const router = Router();

// Public routes
router.post('/callback', handleAuthCallback);

// Protected routes
router.get('/profile', requireAuth, getProfile);
router.post('/signout', requireAuth, signOut);

export default router; 