import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { validationResult } from 'express-validator';
import CustomError from '../customTypes/errorType';
import { formatDate } from '../utils/formatDate';
import Trade from '../models/trade';
import { Op } from 'sequelize';

// @desc Get Trades Summary
// @route GET /api/query
// @access Public
export const getTradesSummary = asyncHandler(
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
      const { userId, executionType, executionStartDate, executionEndDate } =
        req.body;

      const whereCondition: any = {};
      if (userId) {
        whereCondition['userId'] = userId;
      }
      if (executionType) {
        whereCondition['executionType'] = executionType;
      }
      if (executionStartDate && executionEndDate) {
        whereCondition['executionDate'] = {
          [Op.between]: [executionStartDate, executionEndDate],
        };
      } else if (executionStartDate && !executionEndDate) {
        whereCondition['executionDate'] = {
          [Op.gte]: executionStartDate,
        };
      } else if (!executionStartDate && executionEndDate) {
        whereCondition['executionDate'] = {
          [Op.lte]: executionEndDate,
        };
      }

      console.log(whereCondition);

      const trades = await Trade.findAll({ where: whereCondition });

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
