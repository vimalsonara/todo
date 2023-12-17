import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import db from "../config/db";
import generateToken from "../utils/generateToken";

// @desc    Auth user/set token
// route    POST api/user/auth
// @access  public
export const authUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json("Any details can't be empty");
    }

    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      res.status(400);
      throw new Error("User not found");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      generateToken(res, user.id);
      res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400);
      throw new Error("Invalid password");
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
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
  try {
    const { userId } = req.body;

    if (!userId) {
      res.status(400).json("User id can't be empty");
    }

    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (user) {
      res.status(200).json({
        user,
      });
    } else {
      res.status(400);
      throw new Error("User not found");
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// @desc    Update user profile
// route    PUT api/users/profile
// @access  private
export const updateUserProfile = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      res.status(400).json("User id required");
    }

    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    console.log(user, "user");

    if (user) {
      const updateUserData = {
        name: req.body.name || user.name,
        email: req.body.email || user.email,
        password: req.body.password
          ? await bcrypt.hash(req.body.password, 10)
          : user.password,
      };

      const updateUser = await db.user.update({
        where: { id: userId },
        data: updateUserData,
      });

      res.status(200).json({
        id: updateUser.id,
        name: updateUser.name,
        email: updateUser.email,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});
