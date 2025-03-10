import { createID, readJSON, writeJSON, absolutePath} from "../utils/utils.js";

const FILE_PATH= absolutePath({folder:'data', file:'books.json'});
console.log("File Path:",FILE_PATH);

export class BookModel {
  
  static async getAll({ genre }) {
    const books = await readJSON(FILE_PATH);
    if (genre) {
      return books.filter((book) =>
        book.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
      );
    }
    return books;
  }

  static async getById({ id }) {
    const books = await readJSON(FILE_PATH);
    const book = books.find((b) => b.id === id);
    return book;
  }

  static async createBook({ input }) {
    const books = await readJSON(FILE_PATH);
    const newBook = {
      id: createID(),
      ...input,
    };

    books.push(newBook);
    await writeJSON(FILE_PATH, books);

    return newBook;
  }

  static async deleteBook({ id }) {
    const books = await readJSON(FILE_PATH);
    const index = books.findIndex((b) => b.id === id);
    if (index === -1) return false;

    books.splice(index, 1);

    await writeJSON(FILE_PATH, books);

    return true;
  }

  static async updateBook({ id, input }) {
    const books = await readJSON(FILE_PATH);
    const index = books.findIndex((b) => b.id === id);
    if (index === -1) return false;

    books[index] = {
      ...books[index],
      ...input,
    };

    await writeJSON(FILE_PATH, books);

    return books[index];
  }
}
