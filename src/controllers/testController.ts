import { Request, Response } from 'express';

// Fetch user profile
export const getUserProfile = (req: Request, res: Response) => {
  // Assuming req.user is populated by Passport after successful authentication
  if (!req.user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json({ user: req.user });
};

// Update user profile
export const updateUserProfile = (req: Request, res: Response) => {
  // For demo, let's assume we're only updating the user's email
  const { email } = req.body;
  // Normally, you would update the database here
  res.json({ message: 'Profile updated', email });
};