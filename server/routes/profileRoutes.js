import express from 'express';
import { getProfile } from '../controllers/profileController.js';
import { requireAuth, optionalAuth } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/profile', requireAuth, getProfile);

export default router; 