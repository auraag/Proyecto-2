import {
  createBook,
  readBookById,
  readBooks,
  updateBook,
  deleteBook,
} from "../book/book.controller";

// Mocks
jest.mock("../book/actions/create.book.action");
jest.mock("../book/actions/read.bookById.action");
jest.mock("../book/actions/read.book.action");
jest.mock("../book/actions/update.book.action");
jest.mock("../book/actions/delete.book.action");

import createBookAction from "../book/actions/create.book.action";
import readBookByIdAction from "../book/actions/read.bookById.action";
import readBooksAction from "../book/actions/read.book.action";
import updateBookAction from "../book/actions/update.book.action";
import deleteBookAction from "../book/actions/delete.book.action";

describe("Book Controller Tests", () => {
  // CREATE
  test("createBook() → caso exitoso", async () => {
    const requester = { permissions: ["createBook"] };
    const data = { title: "Harry Potter"} as any;

    (createBookAction as jest.Mock).mockReturnValue(data);

    const result = await createBook(data, requester);
    expect(result).toEqual(data);
  });

  test("createBook() → sin permisos", async () => {
    const requester = { permissions: [] };

    await expect(createBook({ title: "HP" } as any, requester)).rejects.toThrow(
      "Not allowed."
    );
  });

  // READ BY ID
  test("readBookById() → caso exitoso", async () => {
    (readBookByIdAction as jest.Mock).mockReturnValue({ title: "HP" });

    const result = await readBookById("123");
    expect(result).toEqual({ title: "HP" });
  });

  test("readBookById() → libro no existe", async () => {
    (readBookByIdAction as jest.Mock).mockReturnValue(null);

    const result = await readBookById("999");
    expect(result).toBeNull();
  });

  // READ ALL
  test("readBooks() → caso exitoso", async () => {
    (readBooksAction as jest.Mock).mockReturnValue({
      books: [{ title: "HP" }],
      page: 1,
      totalPages: 1,
    });

    const result = await readBooks({}, 1, 10);
    expect(result.books.length).toBe(1);
  });

  test("readBooks() → error DB", async () => {
    (readBooksAction as jest.Mock).mockImplementation(() => {
      throw new Error("DB error");
    });

    await expect(readBooks({}, 1, 10)).rejects.toThrow("DB error");
  });

  // UPDATE
  test("updateBook() → caso exitoso", async () => {
    const requester = { permissions: ["updateBook"] };
    const data = { title: "Nuevo título" };

    (updateBookAction as jest.Mock).mockReturnValue(data);

    const result = await updateBook("123", data, requester);
    expect(result).toEqual(data);
  });

  test("updateBook() → sin permisos", async () => {
    const requester = { permissions: [] };

    await expect(updateBook("123", { title: "X" }, requester)).rejects.toThrow(
      "Not allowed."
    );
  });

  // DELETE
  test("deleteBook() → caso exitoso", async () => {
    const requester = { permissions: ["deleteBook"] };
    (deleteBookAction as jest.Mock).mockReturnValue({ success: true });

    const result = await deleteBook("123", requester);
    expect(result).toEqual({ success: true });
  });

  test("deleteBook() → sin permisos", async () => {
    const requester = { permissions: [] };

    await expect(deleteBook("123", requester)).rejects.toThrow("Not allowed.");
  });
});
