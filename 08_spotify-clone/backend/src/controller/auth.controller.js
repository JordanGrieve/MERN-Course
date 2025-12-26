import { User } from "../models/user.model.js";

export const authCallBack = async (req, res, next) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;

    // Check if user exists in the database
    const user = await User.findOne({ clerkId: id });

    if (!user) {
      // Sign up new user
      await User.create({
        clerkId: id,
        fullName: `${firstName} ${lastName}`,
        imageUrl,
      });
      res.status(200).json({ message: "User signed up successfully" });
    }
  } catch (error) {
    next(error);
  }
};
