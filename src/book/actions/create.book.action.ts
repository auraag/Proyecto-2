import { BookModel, BookType } from "../book.model";

async function createBookAction(data: BookType) {
  const newBook = await BookModel.create(data);
  return newBook;
}

export default createBookAction;
