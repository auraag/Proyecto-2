import { Schema, model } from "mongoose";

export type BookType = {
  title: string;
  author: string;
  genre: string;
  publisher: string;
  publishDate: string;
  available: boolean;
  isDeleted: boolean;
};

const BookSchema = new Schema<BookType>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  publisher: { type: String, required: true },
  publishDate: { type: String, required: true },
  available: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
});

const BookModel = model<BookType>("Book", BookSchema);

export { BookModel, BookSchema };
