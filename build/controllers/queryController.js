"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTradesSummary = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const express_validator_1 = require("express-validator");
const errorType_1 = __importDefault(require("../customTypes/errorType"));
const formatDate_1 = require("../utils/formatDate");
const trade_1 = __importDefault(require("../models/trade"));
const sequelize_1 = require("sequelize");
// @desc Get Trades Summary
// @route GET /api/query
// @access Public
exports.getTradesSummary = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            const error = new errorType_1.default(422, 'Validation failed, entered data is incorrect.', errors.array());
            throw error;
        }
        const { userId, executionType, executionStartDate, executionEndDate } = req.body;
        const whereCondition = {};
        if (userId) {
            whereCondition['userId'] = userId;
        }
        if (executionType) {
            whereCondition['executionType'] = executionType;
        }
        if (executionStartDate && executionEndDate) {
            whereCondition['executionDate'] = {
                [sequelize_1.Op.between]: [executionStartDate, executionEndDate],
            };
        }
        else if (executionStartDate && !executionEndDate) {
            whereCondition['executionDate'] = {
                [sequelize_1.Op.gte]: executionStartDate,
            };
        }
        else if (!executionStartDate && executionEndDate) {
            whereCondition['executionDate'] = {
                [sequelize_1.Op.lte]: executionEndDate,
            };
        }
        const trades = yield trade_1.default.findAll({ where: whereCondition });
        const transformedTrades = trades.map(trade => {
            return {
                id: trade.id,
                ticker: trade.ticker,
                amount: Number(trade.amount),
                price: Number(trade.price),
                executionType: trade.executionType,
                executionDate: (0, formatDate_1.formatDate)(trade.executionDate),
                userId: Number(trade.userId),
            };
        });
        res.status(200).json(transformedTrades);
    }
    catch (err) {
        return next(err);
    }
}));
