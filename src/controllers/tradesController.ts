import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { validationResult } from 'express-validator';
import CustomError from '../customTypes/errorType';
import { formatDate } from '../utils/formatDate';
import Trade from '../models/trade';

// @desc Get all Trades
// @route GET /api/trades
// @access Public
export const getTrades = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const trades = await Trade.findAll();

      if (trades.length === 0) {
        res.status(200).json({ message: 'No Trades found.' });
      }

      const transformedTrades = trades.map(trade => {
        return {
          id: trade.id,
          ticker: trade.ticker,
          amount: Number(trade.amount),
          price: Number(trade.price),
          executionType: trade.executionType,
          executionDate: formatDate(trade.executionDate),
          userId: Number(trade.userId),
        };
      });

      res.status(200).json(transformedTrades);
    } catch (err) {
      return next(err);
    }
  }
);

// @desc Get Single Trade
// @route GET /api/trades/:id
// @access Public
export const getSingleTrade = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const trade = await Trade.findByPk(req.params.id);
      if (trade === null) {
        res
          .status(200)
          .json({ message: `Trade with id: ${req.params.id} not found.` });
      } else {
        res.status(200).json({
          id: trade.id,
          ticker: trade.ticker,
          amount: Number(trade.amount),
          price: Number(trade.price),
          executionType: trade.executionType,
          executionDate: formatDate(trade.executionDate),
          userId: Number(trade.userId),
        });
      }
    } catch (err) {
      return next(err);
    }
  }
);

// @desc Post a trade
// @route POST /api/trades
// @access Public
export const postTrade = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
    const values = [
      req.body.ticker,
      req.body.amount,
      req.body.price,
      req.body.executionType,
      req.body.executionDate,
      req.body.userId,
    ];

    Trade.create({
      ticker: req.body.ticker,
      amount: req.body.amount,
      price: req.body.price,
      executionType: req.body.executionType,
      executionDate: req.body.executionDate,
      userId: req.body.userId,
    }).then(trade => {
      res.status(201).json({
        message: 'Trade posted successfully.',
        trade: {
          id: trade.id,
          ticker: trade.ticker,
          amount: Number(trade.amount),
          price: Number(trade.price),
          executionType: trade.executionType,
          executionDate: formatDate(trade.executionDate),
          userId: Number(trade.userId),
        },
      });
    });
  } catch (err) {
    return next(err);
  }
};

// @desc Update a trade
// @route PUT /api/trades/:id
// @access Public
export const updateTrade = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

    const trade = await Trade.findByPk(req.params.id);
    if (trade === null) {
      res
        .status(200)
        .json({ message: `Trade with id: ${req.params.id} not found.` });
    } else {
      trade.ticker = req.body.ticker;
      trade.amount = req.body.amount;
      trade.price = req.body.price;
      trade.executionType = req.body.executionType;
      trade.executionDate = req.body.executionDate;
      trade.userId = req.body.userId;

      trade.save().then(trade => {
        res.status(200).json({
          message: 'Trade updated successfully.',
          trade: {
            id: trade.id,
            ticker: trade.ticker,
            amount: Number(trade.amount),
            price: Number(trade.price),
            executionType: trade.executionType,
            executionDate: formatDate(trade.executionDate),
            userId: Number(trade.userId),
          },
        });
      });
    }
  } catch (err) {
    return next(err);
  }
};

// @desc Delete a Trade
// @route DELETE /api/trades/:id
// @access Public
export const deleteTrade = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

    const trade = await Trade.findByPk(req.params.id);
    if (trade === null) {
      res
        .status(200)
        .json({ message: `Trade with id: ${req.params.id} not found.` });
    } else {
      trade.destroy();
      res.status(200).json({
        message: 'Trade deleted successfully.',
        trade: {
          id: trade.id,
          ticker: trade.ticker,
          amount: Number(trade.amount),
          price: Number(trade.price),
          executionType: trade.executionType,
          executionDate: formatDate(trade.executionDate),
          userId: Number(trade.userId),
        },
      });
    }
  } catch (err) {
    return next(err);
  }
};
