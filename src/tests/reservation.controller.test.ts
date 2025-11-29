import {
  reserveBook,
  returnBook,
  getReservationsByBook,
  getReservationsByUser,
} from "../reservation/reservation.controller";

jest.mock("../reservation/actions/create.reservation.action");
jest.mock("../reservation/actions/read.reservationByBook.action");
jest.mock("../reservation/actions/read.reservationByUser.action");
jest.mock("../reservation/actions/close.reservation.action");
jest.mock("../book/actions/update.book.action");
jest.mock("../book/actions/read.bookById.action");

import createReservationAction from "../reservation/actions/create.reservation.action";
import readResByBook from "../reservation/actions/read.reservationByBook.action";
import readResByUser from "../reservation/actions/read.reservationByUser.action";
import closeReservationAction from "../reservation/actions/close.reservation.action";
import updateBookAction from "../book/actions/update.book.action";
import readBookByIdAction from "../book/actions/read.bookById.action";

describe("Reservation Controller Tests", () => {
  test("reserveBook() → caso exitoso", async () => {
    (readBookByIdAction as jest.Mock).mockReturnValue({
      _id: "456",
      title: "HP",
      available: true,
    });

    (updateBookAction as jest.Mock).mockReturnValue(true);

    const requester = { id: "123", name: "Aura" };

    (createReservationAction as jest.Mock).mockReturnValue({
      userId: "123",
      bookId: "456",
      returnDate: null,
    });

    const result = await reserveBook("456", requester);

    expect(result.userId).toBe("123");
    expect(createReservationAction).toHaveBeenCalled();
  });

  test("reserveBook() → libro no disponible", async () => {
    (readBookByIdAction as jest.Mock).mockReturnValue({
      available: false,
    });

    await expect(reserveBook("456", { id: "123" })).rejects.toThrow(
      "Book not available."
    );
  });

  test("reserveBook() → libro no existe", async () => {
    (readBookByIdAction as jest.Mock).mockReturnValue(null);

    await expect(reserveBook("999", { id: "123" })).rejects.toThrow(
      "Book not found."
    );
  });

  test("returnBook() → caso exitoso", async () => {
    (closeReservationAction as jest.Mock).mockReturnValue({
      bookId: "456",
      returnDate: "2024",
    });

    (updateBookAction as jest.Mock).mockReturnValue(true);

    const result = await returnBook("999");

    expect(result!.returnDate).toBe("2024");
    expect(updateBookAction).toHaveBeenCalled();
  });

  test("getReservationsByBook() → caso exitoso", async () => {
    (readResByBook as jest.Mock).mockReturnValue([{ bookId: "456" }]);

    const result = await getReservationsByBook("456");

    expect(result.length).toBe(1);
  });

  test("getReservationsByUser() → caso exitoso", async () => {
    (readResByUser as jest.Mock).mockReturnValue([{ userId: "123" }]);

    const result = await getReservationsByUser("123");

    expect(result.length).toBe(1);
  });
});
