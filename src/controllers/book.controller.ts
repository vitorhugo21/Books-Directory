import { Request, Response } from 'express';
import fs from 'fs-extra';
import path from 'path';
import Book from '../models/book.model';
import success from '../models/success.model';
import error from '../models/error.model';

const booksFile = path.join(__dirname, '..', 'data', 'books.json');

const getBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const books = await <Promise<Book[]>>fs.readJson(booksFile);

    if (books.length < 1) {
      throw error[1000];
    }

    res.status(200).json({
      error: false,
      ...success[1000],
      data: {
        books
      }
    });
  } catch (err) {
    res.status(202).send({
      error: true,
      ...err
    });
  }
};

const getBook = async (req: Request, res: Response): Promise<void> => {
  const bookIsbn = req.params.id;

  try {
    const books = await <Promise<Book[]>>fs.readJson(booksFile);

    const book = books.find((book: Book) => book.isbn === parseInt(bookIsbn));

    if (!book) {
      throw error[1001];
    }

    res.status(200).json({
      error: false,
      ...success[1001],
      data: {
        book
      }
    });

  } catch (err) {
    res.status(404).send({
      error: true,
      ...err
    });
  }
};

const insertBook = async (req: Request, res: Response): Promise<void> => {
  const newBook = <Book>req.body;

  try {
    const books = await <Promise<Book[]>>fs.readJson(booksFile);

    const bookExists = books.find((book: Book) => book.isbn === newBook.isbn);

    if (bookExists) {
      throw error[1008];
    }

    books.push(newBook);

    await fs.writeJson(booksFile, books);

    res.status(200).json({
      error: false,
      ...success[1002],
      data: {
        newBook
      }
    });
  } catch (err) {
    res.status(400).send({
      error: true,
      ...err
    });
  }
};

const updateBook = async (req: Request, res: Response): Promise<void> => {
  const updatedBook = <Book>req.body;

  try {
    const books = await <Promise<Book[]>>fs.readJson(booksFile);

    const oldBookIndex = books.findIndex((book: Book) => book.isbn === updatedBook.isbn);

    if (oldBookIndex < 0) {
      throw error[1001];
    }

    books[oldBookIndex] = updatedBook;

    await fs.writeJson(booksFile, books);

    res.status(200).json({
      error: false,
      ...success[1003],
      data: {
        updatedBook
      }
    });
  } catch (err) {
    res.status(400).send({
      error: true,
      ...err
    });
  }
};

const deleteBook = async (req: Request, res: Response): Promise<void> => {
  const bookIsbn = req.params.id;

  try {
    const books = await <Promise<Book[]>>fs.readJson(booksFile);
    const filteredBooks = books.filter((book: Book) => book.isbn !== parseInt(bookIsbn));
    const deletedBook = books.find((book: Book) => book.isbn === parseInt(bookIsbn));

    if (filteredBooks.length === books.length) {
      throw error[1001];
    }

    await fs.writeJson(booksFile, filteredBooks);

    res.status(200).json({
      error: false,
      ...success[1004],
      data: {
        deletedBook
      }
    });

  } catch (err) {
    res.status(404).send({
      error: true,
      ...err
    });
  }
};

export = {
  getBooks,
  getBook,
  insertBook,
  updateBook,
  deleteBook
};
