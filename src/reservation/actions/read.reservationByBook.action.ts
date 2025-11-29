import { ReservationModel } from "../reservation.model";

async function readReservationByBookAction(bookId: string) {
  return await ReservationModel.find({ bookId });
}

export default readReservationByBookAction;
