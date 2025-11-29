import { Router, Request, Response } from "express";
import {
  readUsers,
  readUserById,
  createUser,
  updateUser,
  deleteUser,
} from "./user.controller";
import authMiddleware from "../../middlewares/auth.middleware";

const userRoutes = Router();

async function GetUsers(request: Request, response: Response) {
  try {
    const users = await readUsers();
    response.status(200).json({
      message: "Success.",
      users: users,
    });
  } catch (error: any) {
    response.status(500).json({ message: error.message });
  }
}

async function GetUserById(request: Request, response: Response) {
  try {
    const requester = (request as any).user;
    const user = await readUserById(request.params.id, requester);
    response.status(200).json({
      message: "Success.",
      user: user,
    });
  } catch (error: any) {
    response.status(403).json({
      message: error.message || "Not allowed.",
    });
  }
}

async function CreateUser(request: Request, response: Response) {
  try {
    const newUser = await createUser(request.body);
    response.status(201).json({
      message: "User created.",
      user: newUser,
    });
  } catch (error: any) {
    response.status(500).json({ message: error.message });
  }
}

async function UpdateUser(request: Request, response: Response) {
  try {
    const requester = (request as any).user;
    const updatedUser = await updateUser(
      request.params.id,
      request.body,
      requester
    );
    response.status(200).json({
      message: "User updated.",
      user: updatedUser,
    });
  } catch (error: any) {
    response.status(403).json({
      message: error.message || "Not allowed.",
    });
  }
}

async function DeleteUser(request: Request, response: Response) {
  try {
    const requester = (request as any).user;
    const deleted = await deleteUser(request.params.id, requester);
    response.status(200).json({
      message: "User deleted.",
      deleted: deleted,
    });
  } catch (error: any) {
    response.status(403).json({
      message: error.message || "Not allowed.",
    });
  }
}

userRoutes.get("/", GetUsers);
userRoutes.get("/:id", authMiddleware, GetUserById);
userRoutes.post("/", CreateUser);
userRoutes.put("/:id", authMiddleware, UpdateUser);
userRoutes.delete("/:id", authMiddleware, DeleteUser);

export default userRoutes;
