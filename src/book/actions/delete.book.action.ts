import { BookModel } from "../book.model";

async function deleteBookAction(id: string) {
  const deleted = await BookModel.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true },
    { new: true }
  );
  return deleted;
}

export default deleteBookAction;
