import { Router, Request, Response } from "express";
import { login } from "./auth.controller";

const authRoutes = Router();

async function Login(request: Request, response: Response) {
  const { email, password } = request.body;

  const result = await login(email, password);

  if (!result) {
    return response.status(401).json({ message: "Invalid credentials." });
  }

  response.status(200).json({
    message: "Login successful.",
    user: result.user,
    token: result.token,
  });
}

authRoutes.post("/login", Login);

export default authRoutes;
