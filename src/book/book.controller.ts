import createBookAction from "./actions/create.book.action";
import readBookByIdAction from "./actions/read.bookById.action";
import readBooksAction from "./actions/read.book.action";
import updateBookAction from "./actions/update.book.action";
import deleteBookAction from "./actions/delete.book.action";
import { BookType } from "./book.model";

async function createBook(
  data: BookType,
  requester: any
): Promise<BookType> {
  if (!requester.permissions.includes("createBook")) {
    throw new Error("Not allowed.");
  }

  const newBook = await createBookAction(data);
  return newBook;
}

async function readBookById(
  id: string
): Promise<BookType | null> {
  const book = await readBookByIdAction(id);
  return book;
}

async function readBooks(
  filters: any,
  page: number,
  limit: number
) {
  const results = await readBooksAction(filters, page, limit);
  return results;
}

async function updateBook(
  id: string,
  data: any,
  requester: any
): Promise<BookType | null> {
  if (!requester.permissions.includes("updateBook")) {
    throw new Error("Not allowed.");
  }

  const updatedBook = await updateBookAction(id, data);
  return updatedBook;
}

async function deleteBook(
  id: string,
  requester: any
): Promise<BookType | null> {
  if (!requester.permissions.includes("deleteBook")) {
    throw new Error("Not allowed.");
  }

  const deleted = await deleteBookAction(id);
  return deleted;
}

export {
  createBook,
  readBookById,
  readBooks,
  updateBook,
  deleteBook
};
