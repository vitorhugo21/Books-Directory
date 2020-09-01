import { Router } from 'express';
import bookController from '../controllers/book.controller';
import helpers from '../helpers/middleware.helper';

const router = Router();

router.get('/books', bookController.getBooks);
router.get('/books/:id', helpers.isbnMustBeInteger, bookController.getBook);
router.post('/books', helpers.checkRequestBody, bookController.insertBook);
router.put('/books/:id', helpers.isbnMustBeInteger, helpers.checkRequestBody, bookController.updateBook);
router.delete('/books/:id', helpers.isbnMustBeInteger, bookController.deleteBook);

export = router;