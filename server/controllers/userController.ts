import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/user';

const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key';

export const signIn = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    console.log(req.body);

    //const hashedPassword = await bcrypt.hash(password, 8);

    const newUser: IUser = new User({
      username,
      email,
      password
    });

    console.log(newUser.email);

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error registering user' });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user!.password);
    if (!isMatch) {
      res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user!._id }, SECRET_KEY, { expiresIn: '1h' });

    res.status(201).json({ token, user: { id: user!._id, username: user!.username, email: user!.email } });
  } catch (err) {
    res.status(500).json({ error: 'Error logging in user' });
  }
};
