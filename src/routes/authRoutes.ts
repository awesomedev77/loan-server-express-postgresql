import express from 'express';
import passport from 'passport';
import { register, login } from '../controllers/authController';
import {authenticate} from '../middleware/authenticate'; 

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Example protected route
router.get('/profile', passport.authenticate('jwt', { session: false }), authenticate, (req, res) => {
  res.json({ message: 'You are authorized to see this', user: req.user });
});

export default router;