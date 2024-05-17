import { PassportStatic } from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { findUserById } from '../models/user';
import dotenv from 'dotenv';

dotenv.config();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

export default (passport: PassportStatic) => {
  passport.use(new JwtStrategy(options, async (jwt_payload, done) => {
    try {
      const user = await findUserById(jwt_payload.id);
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  }));
};