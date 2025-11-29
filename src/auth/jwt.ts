import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

const secret = process.env.JWT_SECRET!;


function generateToken(payload: any) {
  return jwt.sign(payload, secret, { expiresIn: "7d" });
}

function verifyToken(token: string) {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}

export { generateToken, verifyToken };
