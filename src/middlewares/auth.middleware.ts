import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../auth/jwt";

function authMiddleware(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ message: "Missing authorization header." });
  }

  const token = authHeader.split(" ")[1];
  const payload = verifyToken(token);

  if (!payload) {
    return response.status(401).json({ message: "Invalid or expired token." });
  }

  (request as any).user = payload;
  next();
}

export default authMiddleware;
