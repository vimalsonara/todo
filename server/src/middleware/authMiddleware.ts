import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User, { UserType } from "../models/userModel.js";
import { Schema } from "mongoose";
import { Request, Response, NextFunction } from "express";

export interface IRequest extends Request {
  userId?: Schema.Types.ObjectId;
}

export const protect = asyncHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
          userId: Schema.Types.ObjectId;
        };

        const user: UserType = await User.findById(decoded.userId).select(
          "-password"
        );

        if (user) {
          req.headers["user"] = user._id;
          next();
        }
        res.status(401);
        throw new Error("Not authorized, invalid token");
      } catch (error) {
        res.status(401);
        throw new Error("Not authorized, invalid token");
      }
    } else {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }
);
