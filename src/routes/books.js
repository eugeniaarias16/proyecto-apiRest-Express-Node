import { Router } from "express";
import { BooksController } from "../controller/books.js";

export const bookRouter=Router();


bookRouter.get('/',BooksController.getAll);
bookRouter.get('/:id',BooksController.getById);
bookRouter.delete('/:id', BooksController.deleteBook);
bookRouter.post('/',BooksController.createBook);
bookRouter.patch('/:id',BooksController.updateBook);