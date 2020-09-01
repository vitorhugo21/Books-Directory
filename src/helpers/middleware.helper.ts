import { Request, Response, NextFunction } from 'express';
import error from '../models/error.model';
import globalFunctions from './global-functions.helper';
import Book from '../models/book.model';

const isbnMustBeInteger = (req: Request, res: Response, next: NextFunction): void => {
  const bookIsbn = req.params.id;

  try {
    if (!globalFunctions.numberIsInteger(parseInt(bookIsbn))) {
      throw error[1002];
    } else {
        next();
    }
  } catch (err) {
    res.status(400).json({
      error: true,
      ...err
    });
  }
};

const checkRequestBody = (req: Request, res: Response, next: NextFunction): void => {
  const { isbn, name, numberOfPages } = <Book>req.body;

  const errorArray: { code: number[], message: string[] } = {
    code: [],
    message: []
  };

  if (typeof isbn === 'undefined') {
    errorArray.code.push(error[1005].code);
    errorArray.message.push(error[1005].message);
  } else {
    if (!globalFunctions.numberIsInteger(isbn)) {
      errorArray.code.push(error[1002].code);
      errorArray.message.push(error[1002].message);
    }
  }

  if (typeof name === 'undefined') {
    errorArray.code.push(error[1006].code);
    errorArray.message.push(error[1006].message);
  } else {
    if (!globalFunctions.nameIsString(name)) {
      errorArray.code.push(error[1003].code);
      errorArray.message.push(error[1003].message);
    }
  }

  if (typeof numberOfPages === 'undefined') {
    errorArray.code.push(error[1007].code);
    errorArray.message.push(error[1007].message);
  } else {
    if (!globalFunctions.numberIsInteger(numberOfPages)) {
      errorArray.code.push(error[1004].code);
      errorArray.message.push(error[1004].message);
    }
  }

  try {
    if (errorArray.code.length > 0 && errorArray.message.length > 0) {
      throw errorArray;
    }

    next();
  } catch (err) {
    res.status(400).json({
      error: true,
      ...err
    });
  }
};

export = { isbnMustBeInteger, checkRequestBody };