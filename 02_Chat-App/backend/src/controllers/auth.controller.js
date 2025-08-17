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
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log('Error in signup controller', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie('jwt', '', { maxAge: 0 });
    console.log('Logged Out');
    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.log('Error in signup controller', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
