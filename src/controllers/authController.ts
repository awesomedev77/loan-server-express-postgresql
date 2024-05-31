import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, findUserByUsername } from '../models/user';
import dotenv from 'dotenv';
import { AppDataSource } from '../utils/db';
import { User } from '../entity/User';

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error('JWT_SECRET is not defined in the environment variables');
}

export const register = async (req: Request, res: Response) => {
  const { email, fullName, role, password } = req.body;
  try {
    const user = await findUserByUsername(email);
    if (user) {
      return res.status(400).json({ message: 'Username already exists. Please try again.' });
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    await createUser(email, fullName, role, hash);
    return res.status(201).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: 'Error registering newuser', error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await findUserByUsername(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found. Please try again.' });
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if (isMatch) {
      const payload = { id: user.id, email: user.email, fullName: user.fullName, role: user.role };
      const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

      return res.status(201).json({
        success: true,
        token: 'Bearer ' + token
      });
    } else {
      return res.status(400).json({ message: 'Password incorrect. Please try again.' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error during authentication', error });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();
    return res.status(201).json(users);
  } catch (error) {
    return res.status(500).json({ message: 'Unexpected error occured' });
  }

}