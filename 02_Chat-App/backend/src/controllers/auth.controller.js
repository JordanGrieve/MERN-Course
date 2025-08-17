import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../lib/utils.js';

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'Please enter all feilds' });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .send({ message: 'Password must be at least 6 characters' });
    }

    const user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .send({ message: 'User already exists (email check)' });

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashPassword,
    });

    if (newUser) {
      // generate jwt token
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        email: newUser.email,
        password: newUser.password,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: 'Invalid Credentials' });
    }
  } catch (error) {
    console.log('Error in signup controller', error);
    res.status(500).json({ message: 'Internal Server Error HERER' });
  }
};

export const login = (req, res) => {
  res.send('login route');
};

export const logout = (req, res) => {
  res.send('logout route');
};
