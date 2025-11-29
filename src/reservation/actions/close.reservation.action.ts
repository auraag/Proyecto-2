import { ReservationModel } from "../reservation.model";

async function closeReservationAction(id: string, date: string) {
  return await ReservationModel.findByIdAndUpdate(
    id,
    { returnDate: date },
    { new: true }
  );
}

export default closeReservationAction;
