import { BookModel, BookType } from "../book.model";

async function readBooksAction(filters: any, page: number, limit: number) {
  const query: any = { isDeleted: false };

  if (filters.title) query.title = { $regex: filters.title, $options: "i" };
  if (filters.author) query.author = { $regex: filters.author, $options: "i" };
  if (filters.genre) query.genre = filters.genre;
  if (filters.publisher) query.publisher = filters.publisher;
  if (filters.publishDate) query.publishDate = filters.publishDate;
  if (filters.available !== undefined) query.available = filters.available;

  const skip = (page - 1) * limit;

  const books = await BookModel.find(query)
    .skip(skip)
    .limit(limit)
    .select("title");

  const total = await BookModel.countDocuments(query);

  const totalPages = Math.ceil(total / limit);

  return {
    books,
    page,
    totalPages,
    limit,
    total,
  };
}

export default readBooksAction;
