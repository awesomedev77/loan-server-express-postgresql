import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from 'passport';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import testRoutes from './routes/testRoutes';
import passportConfig from './config/passport';
import { checkConnection } from './utils/db';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
passportConfig(passport);

app.use('/api/auth', authRoutes);
app.use('/api/profile', testRoutes);

const startServer = async () => {
    try {
      await checkConnection(); // Ensure DB connection is established
      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    } catch (error) {
      console.error('Failed to start the server due to database connection error:', error);
      process.exit(1); // Exit the process with an error code
    }
  };
  
  startServer();