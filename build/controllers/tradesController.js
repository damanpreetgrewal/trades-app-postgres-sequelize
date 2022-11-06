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
exports.deleteTrade = exports.updateTrade = exports.postTrade = exports.getSingleTrade = exports.getTrades = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const express_validator_1 = require("express-validator");
const errorType_1 = __importDefault(require("../customTypes/errorType"));
const formatDate_1 = require("../utils/formatDate");
const trade_1 = __importDefault(require("../models/trade"));
// @desc Get all Trades
// @route GET /api/trades
// @access Public
exports.getTrades = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trades = yield trade_1.default.findAll();
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
// @desc Get Single Trade
// @route GET /api/trades/:id
// @access Public
exports.getSingleTrade = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trade = yield trade_1.default.findByPk(req.params.id);
        if (trade === null) {
            res
                .status(200)
                .json({ message: `Trade with id: ${req.params.id} not found.` });
        }
        else {
            res.status(200).json({
                id: trade.id,
                ticker: trade.ticker,
                amount: Number(trade.amount),
                price: Number(trade.price),
                executionType: trade.executionType,
                executionDate: (0, formatDate_1.formatDate)(trade.executionDate),
                userId: Number(trade.userId),
            });
        }
    }
    catch (err) {
        return next(err);
    }
}));
// @desc Post a trade
// @route POST /api/trades
// @access Public
const postTrade = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            const error = new errorType_1.default(422, 'Validation failed, entered data is incorrect.', errors.array());
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
        trade_1.default.create({
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
                    executionDate: (0, formatDate_1.formatDate)(trade.executionDate),
                    userId: Number(trade.userId),
                },
            });
        });
    }
    catch (err) {
        return next(err);
    }
});
exports.postTrade = postTrade;
// @desc Update a trade
// @route PUT /api/trades/:id
// @access Public
const updateTrade = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            const error = new errorType_1.default(422, 'Validation failed, entered data is incorrect.', errors.array());
            throw error;
        }
        const trade = yield trade_1.default.findByPk(req.params.id);
        if (trade === null) {
            res
                .status(200)
                .json({ message: `Trade with id: ${req.params.id} not found.` });
        }
        else {
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
                        executionDate: (0, formatDate_1.formatDate)(trade.executionDate),
                        userId: Number(trade.userId),
                    },
                });
            });
        }
    }
    catch (err) {
        return next(err);
    }
});
exports.updateTrade = updateTrade;
// @desc Delete a Trade
// @route DELETE /api/trades/:id
// @access Public
const deleteTrade = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            const error = new errorType_1.default(422, 'Validation failed, entered data is incorrect.', errors.array());
            throw error;
        }
        const trade = yield trade_1.default.findByPk(req.params.id);
        if (trade === null) {
            res
                .status(200)
                .json({ message: `Trade with id: ${req.params.id} not found.` });
        }
        else {
            trade.destroy();
            res.status(200).json({
                message: 'Trade deleted successfully.',
                trade: {
                    id: trade.id,
                    ticker: trade.ticker,
                    amount: Number(trade.amount),
                    price: Number(trade.price),
                    executionType: trade.executionType,
                    executionDate: (0, formatDate_1.formatDate)(trade.executionDate),
                    userId: Number(trade.userId),
                },
            });
        }
    }
    catch (err) {
        return next(err);
    }
});
exports.deleteTrade = deleteTrade;
