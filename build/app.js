"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const tradesRoutes_1 = __importDefault(require("./routes/tradesRoutes"));
const queryRoutes_1 = __importDefault(require("./routes/queryRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const errorMiddleware_1 = __importDefault(require("./middleware/errorMiddleware"));
const user_1 = __importDefault(require("./models/user"));
const trade_1 = __importDefault(require("./models/trade"));
const database_1 = __importDefault(require("./utils/database"));
const error_1 = require("./controllers/error");
const app = (0, express_1.default)();
const PORT = parseInt(process.env.PORT, 10);
/**
 *  App Configuration
 */
//Enable All CORS Requests
app.use((0, cors_1.default)());
//Set Security HTTP Headers
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
//Create a write stream (in append mode)
const accessLogStream = fs_1.default.createWriteStream(path_1.default.join(__dirname, 'logs', 'access.log'), { flags: 'a' });
//Setup the logger
app.use((0, morgan_1.default)('combined', { stream: accessLogStream }));
app.use('/api/trades', tradesRoutes_1.default);
app.use('/api/query', queryRoutes_1.default);
app.use('/api/users', userRoutes_1.default);
app.get('/', (req, res, next) => {
    res.status(200).json({ message: 'API is running...' });
});
app.use(error_1.get404);
app.use(errorMiddleware_1.default);
trade_1.default.belongsTo(user_1.default, { constraints: true, onDelete: 'CASCADE' });
user_1.default.hasMany(trade_1.default);
/**
 * Server Activation
 */
database_1.default
    .sync()
    .then(result => {
    app.listen(PORT, () => {
        console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT} `);
    });
})
    .catch(err => {
    console.log('Error in connecting to the DB: ', err);
});
