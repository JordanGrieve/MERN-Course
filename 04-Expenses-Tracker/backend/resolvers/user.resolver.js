import { users } from '../dummyData/data.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

const UserResolvers = {
  Mutation: {
    signUp: async (_, { input }, context) => {
      try {
        const { username, name, password, gender } = input;

        if (!username || !name || !gender || !password) {
          throw new Error('All fields are required');
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
          throw new Error('User already exists');
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // applying a picture
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        // creating a new user
        const newUser = new User({
          username,
          name,
          password: hashPassword,
          gender,
          profilePic: gender === 'male' ? boyProfilePic : girlProfilePic,
        });

        await newUser.save();
        await context.login(newUser);
        return newUser;
      } catch (e) {
        console.log('Error in signUp resolver:', e);
        throw new Error(e.message);
      }
    },

    // login mutation
    login: async (_, { input }, context) => {
      try {
        const { username, password } = input;
        const { user } = await context.authenticate('graphql-local', { username, password });

        await context.login(user);
        return user;
      } catch (error) {
        console.log('Error in login resolver:', error);
        throw new Error(error.message);
      }
    },

    // logout mutation
    logout: async (_, context) => {
      try {
        await context.logout();
        req.session.destroy((err) => {
          if (err) throw err;
        });
        res.clearCookie('connect.sid');
        return { message: 'Logged out successfully' };
      } catch (error) {
        console.log('Error in logout mutation:', error);
        throw new Error(error.message);
      }
    },
  },
  Query: {
    users: (_, { req, res }) => {
      return users;
    },
    user: (_, { userId }) => {
      return users.find((user) => user._id === userId);
    },
  },
};

export default UserResolvers;
