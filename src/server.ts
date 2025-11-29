import { Request, Response } from "express";
import cors from "cors";
import express from "express";
import authRoutes from "./auth/auth.routes";
import bookRoutes from "./book/book.routes";
import reservationRoutes from "./reservation/reservation.routes";




import { connectDB } from "./config/db";

import userRoutes from "./user/v1/user.routes";

const app = express();
app.use(cors());
app.use(express.json());

const SERVER_VERSION = "/api/v1/";
app.use(SERVER_VERSION + "users", userRoutes);
app.use(SERVER_VERSION + "auth", authRoutes);
app.use(SERVER_VERSION + "books", bookRoutes);
app.use(SERVER_VERSION + "reservations", reservationRoutes);




function routeNotFound(request: Request, response: Response) {
  response.status(404).json({
    message: "Route not found.",
  });
}

app.use(routeNotFound);

app.listen(8080, async () => {
  await connectDB(); 
  console.log("Server listening to port 8080.");
});
