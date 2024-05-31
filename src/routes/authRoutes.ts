import express from 'express';
import passport from 'passport';
import { register, login, getUsers } from '../controllers/authController';
import {authenticate} from '../middleware/authenticate'; 

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/users', passport.authenticate('jwt', { session: false }), authenticate, getUsers);

export default router;