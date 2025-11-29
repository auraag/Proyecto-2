import { Schema, model } from "mongoose";

export type ReservationType = {
  userId: string;
  userName: string;
  bookId: string;
  bookTitle: string;
  reserveDate: string;
  returnDate: string | null;
};

const ReservationSchema = new Schema<ReservationType>({
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  bookId: { type: String, required: true },
  bookTitle: { type: String, required: true },
  reserveDate: { type: String, required: true },
  returnDate: { type: String, default: null },
});

const ReservationModel = model<ReservationType>("Reservation", ReservationSchema);

export { ReservationModel, ReservationSchema };
