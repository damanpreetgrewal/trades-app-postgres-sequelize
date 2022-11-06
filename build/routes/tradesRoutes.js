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
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const trade_1 = __importDefault(require("../models/trade"));
const user_1 = __importDefault(require("../models/user"));
const tradesController_1 = require("../controllers/tradesController");
const router = express_1.default.Router();
router
    .route('/')
    .get(tradesController_1.getTrades)
    .post([
    (0, express_validator_1.body)('ticker')
        .not()
        .isEmpty()
        .trim()
        .withMessage('ticker symbol is required')
        .matches(/^[A-Z]+$/)
        .withMessage('ticker symbol must contain all uppercase letters'),
    (0, express_validator_1.body)('amount')
        .not()
        .isEmpty()
        .withMessage('Amount is required')
        .matches(/^[0-9.]+$/)
        .withMessage('Amount must be a positive Integer'),
    (0, express_validator_1.body)('price')
        .not()
        .isEmpty()
        .withMessage('Price is required')
        .matches(/^[0-9.]+$/)
        .withMessage('Price must be a positive Integer'),
    (0, express_validator_1.check)('executionType')
        .isIn(['buy', 'sell'])
        .withMessage('Execution Type must be either buy or sell (case sensitive)'),
    (0, express_validator_1.check)('userId').custom((value, { req }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield user_1.default.findByPk(value).then(userData => {
            if (userData === null) {
                return Promise.reject(`User with id : ${value} doesnt exist`);
            }
        });
    })),
    (0, express_validator_1.check)('executionDate')
        .isISO8601()
        .toDate()
        .withMessage('Execution Date must be of format: YYYY-MM-DD HH:MM:SS'),
], tradesController_1.postTrade);
router
    .route('/:id')
    .get(tradesController_1.getSingleTrade)
    .put([
    (0, express_validator_1.check)('userId').custom((value, { req }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield user_1.default.findByPk(value).then(userData => {
            var _a;
            if (userData === null) {
                return Promise.reject(`User with id : ${value} doesnt exist`);
            }
            const trade = trade_1.default.findByPk((_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id).then(tradeData => {
                if ((tradeData === null || tradeData === void 0 ? void 0 : tradeData.userId) !== value) {
                    return Promise.reject(`User with id : ${value} is not the owner of this trade.`);
                }
                if (tradeData === null || tradeData === void 0 ? void 0 : tradeData.executionDate) {
                    if (tradeData.executionDate < new Date()) {
                        return Promise.reject(`Trade with executionDate in the past cannot be updated.`);
                    }
                }
            });
        });
    })),
    (0, express_validator_1.body)('ticker')
        .not()
        .isEmpty()
        .trim()
        .withMessage('ticker symbol is required')
        .matches(/^[A-Z]+$/)
        .withMessage('ticker symbol must contain all uppercase letters'),
    (0, express_validator_1.body)('amount')
        .not()
        .isEmpty()
        .withMessage('Amount is required')
        .matches(/^[0-9.]+$/)
        .withMessage('Amount must be a postive Integer'),
    (0, express_validator_1.body)('price')
        .not()
        .isEmpty()
        .withMessage('Price is required')
        .matches(/^[0-9.]+$/)
        .withMessage('Price must be a postive Integer'),
    (0, express_validator_1.check)('executionType')
        .isIn(['buy', 'sell'])
        .withMessage('Execution Type must be either buy or sell (case sensitive)'),
    (0, express_validator_1.check)('executionDate')
        .isISO8601()
        .toDate()
        .withMessage('Execution Date must be of format: YYYY-MM-DD HH:MM:SS'),
], tradesController_1.updateTrade)
    .delete([
    (0, express_validator_1.check)('userId').custom((value, { req }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield user_1.default.findByPk(value).then(userData => {
            var _a;
            if (userData === null) {
                return Promise.reject(`User with id : ${value} doesnt exist`);
            }
            const trade = trade_1.default.findByPk((_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id).then(tradeData => {
                if ((tradeData === null || tradeData === void 0 ? void 0 : tradeData.userId) !== value) {
                    return Promise.reject(`User with id : ${value} is not the owner of this trade`);
                }
                if (tradeData === null || tradeData === void 0 ? void 0 : tradeData.executionDate) {
                    if (tradeData.executionDate < new Date()) {
                        return Promise.reject(`Trade with executionDate in the past cannot be deleted`);
                    }
                }
            });
        });
    })),
], tradesController_1.deleteTrade);
exports.default = router;
