import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import db from "../config/db.js";

export interface IRequest extends Request {
  id?: number;
}

type UserType = {
  id: number;
  email: string;
  name: string | null;
  password: string;
};

export const protect = asyncHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies.token;

      if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        userId: number;
      };

      const user: UserType | null = await db.user.findUnique({
        where: {
          id: decoded.userId,
        },
      });

      if (user) {
        req.headers["user"] = user.id.toString();
        next();
      } else {
        res.status(401);
        throw new Error("User not found");
      }
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, invalid token");
    }
  }
);
