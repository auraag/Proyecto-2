import createReservationAction from "./actions/create.reservation.action";
import readResByBook from "./actions/read.reservationByBook.action";
import readResByUser from "./actions/read.reservationByUser.action";
import closeReservationAction from "./actions/close.reservation.action";
import updateBookAction from "../book/actions/update.book.action";
import readBookByIdAction from "../book/actions/read.bookById.action";

async function reserveBook(bookId: string, requester: any) {
  const book = await readBookByIdAction(bookId);
  if (!book) throw new Error("Book not found.");
  if (!book.available) throw new Error("Book not available.");

  await updateBookAction(bookId, { available: false });

  const data = {
    userId: requester.id,
    userName: requester.name,
    bookId,
    bookTitle: book.title,
    reserveDate: new Date().toISOString(),
    returnDate: null,
  };

  return await createReservationAction(data);
}

async function returnBook(reservationId: string) {
  const date = new Date().toISOString();
  const reservation = await closeReservationAction(reservationId, date);
  if (reservation) {
    await updateBookAction(reservation.bookId, { available: true });
  }
  return reservation;
}

async function getReservationsByBook(bookId: string) {
  return await readResByBook(bookId);
}

async function getReservationsByUser(userId: string) {
  return await readResByUser(userId);
}

export {
  reserveBook,
  returnBook,
  getReservationsByBook,
  getReservationsByUser
};
