import { Router, Request, Response } from "express";
import {
  reserveBook,
  returnBook,
  getReservationsByBook,
  getReservationsByUser
} from "./reservation.controller";
import authMiddleware from "../middlewares/auth.middleware";

const reservationRoutes = Router();

reservationRoutes.post("/:bookId", authMiddleware, async (request: Request, response: Response) => {
  try {
    const requester = (request as any).user;
    const result = await reserveBook(request.params.bookId, requester);
    response.status(201).json(result);
  } catch (error: any) {
    response.status(400).json({ message: error.message });
  }
});

reservationRoutes.put("/return/:reservationId", async (request: Request, response: Response) => {
  try {
    const result = await returnBook(request.params.reservationId);
    response.status(200).json(result);
  } catch (error: any) {
    response.status(400).json({ message: error.message });
  }
});

reservationRoutes.get("/book/:id", async (request: Request, response: Response) => {
  const res = await getReservationsByBook(request.params.id);
  response.status(200).json(res);
});

reservationRoutes.get("/user/:id", async (request: Request, response: Response) => {
  const res = await getReservationsByUser(request.params.id);
  response.status(200).json(res);
});

export default reservationRoutes;
