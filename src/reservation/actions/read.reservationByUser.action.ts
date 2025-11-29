import { ReservationModel } from "../reservation.model";

async function readReservationByUserAction(userId: string) {
  return await ReservationModel.find({ userId });
}

export default readReservationByUserAction;
