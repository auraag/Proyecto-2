import { ReservationModel, ReservationType } from "../reservation.model";

async function createReservationAction(data: ReservationType) {
  const newRes = await ReservationModel.create(data);
  return newRes;
}

export default createReservationAction;
