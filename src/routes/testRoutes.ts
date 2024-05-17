import express from 'express';
import passport from 'passport';
import { getUserProfile, updateUserProfile } from '../controllers/testController';

const router = express.Router();

// Apply Passport JWT authentication middleware to all routes in this router
router.use(passport.authenticate('jwt', { session: false }));

// GET profile route - accessible only for authenticated users
router.get('/', getUserProfile);

// POST update profile - also only accessible for authenticated users
router.post('/update', updateUserProfile);

export default router;