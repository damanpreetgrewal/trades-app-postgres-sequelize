import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { validationResult } from 'express-validator';
import CustomError from '../customTypes/errorType';

import user from '../models/user';
import trade from '../models/trade';

// @desc Get All Users
// @route GET /api/users
// @access Public
export const getUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await user.findAll();
      res.status(200).json(users);
    } catch (err) {
      return next(err);
    }
  }
);

// @desc Post a User
// @route POST /api/users
// @access Public
export const postUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error = new CustomError(
          422,
          'Validation failed, entered data is incorrect.',
          errors.array() as []
        );
        throw error;
      }

      user
        .create({
          name: req.body.name,
        })
        .then(user => {
          res.status(201).json({
            message: 'User posted successfully.',
            user: {
              id: user.id,
              name: user.name,
            },
          });
        });
    } catch (err) {
      return next(err);
    }
  }
);
