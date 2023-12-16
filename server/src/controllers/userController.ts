import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken";
import User, { UserType } from "../models/userModel";
import db from "../config/db";
import bcrypt from "bcryptjs";

// @desc    Auth user/set token
// route    POST api/user/auth
// @access  public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user: UserType | null = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register new user
// route    POST api/users
// @access  public
export const registerUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json("Any details can't be empty");
    }

    const userExist = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (userExist) {
      res.status(400);
      throw new Error("Email already exist");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    if (user) {
      generateToken(res, user.id);
      res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// @desc    Logout user
// route    POST api/users/logout
// @access  public
export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "User Logged Out" });
});

// @desc    Get user profile
// route    GET api/usersd/profile
// @access  private
export const getUserProfile = asyncHandler(async (req, res) => {
  // const user = {
  //   _id: req.user._id,
  //   name: req.user.name,
  //   email: req.user.email,
  // };

  res.status(200).json("profile");
});

// @desc    Update user profile
// route    PUT api/users/profile
// @access  private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
