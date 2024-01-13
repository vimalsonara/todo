import jwt from "jsonwebtoken";
import { Response } from "express";

const generateToken = (res: Response, userId: number) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "30d",
  });

  return token;
};

export default generateToken;
