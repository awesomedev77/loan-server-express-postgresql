import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from 'passport';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import testRoutes from './routes/testRoutes';
import passportConfig from './config/passport';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
passportConfig(passport);

app.use('/api/auth', authRoutes);
app.use('/api/profile', testRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});