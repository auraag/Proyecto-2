import { Router, Request, Response } from "express";
import {
  createBook,
  readBookById,
  readBooks,
  updateBook,
  deleteBook,
} from "./book.controller";
import authMiddleware from "../middlewares/auth.middleware";

const bookRoutes = Router();

bookRoutes.get("/", async (request: Request, response: Response) => {
  try {
    const { page = 1, limit = 10, ...filters } = request.query;
    const results = await readBooks(
      filters,
      Number(page),
      Number(limit)
    );
    response.status(200).json(results);
  } catch (error: any) {
    response.status(500).json({ message: error.message });
  }
});

bookRoutes.get("/:id", async (request: Request, response: Response) => {
  try {
    const book = await readBookById(request.params.id);
    response.status(200).json(book);
  } catch (error: any) {
    response.status(500).json({ message: error.message });
  }
});

bookRoutes.post(
  "/",
  authMiddleware,
  async (request: Request, response: Response) => {
    try {
      const requester = (request as any).user;
      const newBook = await createBook(request.body, requester);
      response.status(201).json(newBook);
    } catch (error: any) {
      response.status(403).json({ message: error.message });
    }
  }
);

bookRoutes.put(
  "//:id",
  authMiddleware,
  async (request: Request, response: Response) => {
    try {
      const requester = (request as any).user;
      const updated = await updateBook(
        request.params.id,
        request.body,
        requester
      );
      response.status(200).json(updated);
    } catch (error: any) {
      response.status(403).json({ message: error.message });
    }
  }
);

bookRoutes.delete(
  "/:id",
  authMiddleware,
  async (request: Request, response: Response) => {
    try {
      const requester = (request as any).user;
      const deleted = await deleteBook(
        request.params.id,
        requester
      );
      response.status(200).json(deleted);
    } catch (error: any) {
      response.status(403).json({ message: error.message });
    }
  }
);

export default bookRoutes;
