import { BookModel, BookType } from "../book.model";

async function readBookByIdAction(id: string): Promise<BookType | null> {
  const book = await BookModel.findOne({ _id: id, isDeleted: false });
  return book;
}

export default readBookByIdAction;
