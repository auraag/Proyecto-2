import { BookModel, BookType } from "../book.model";

async function updateBookAction(id: string, data: Partial<BookType>) {
  const updated = await BookModel.findOneAndUpdate(
    { _id: id, isDeleted: false },
    data,
    { new: true }
  );
  return updated;
}

export default updateBookAction;
