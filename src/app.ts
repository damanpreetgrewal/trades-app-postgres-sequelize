import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
dotenv.config();

import fs from 'fs';
import path from 'path';
import morgan from 'morgan';
import { poolDB } from './db/connection';

import tradesRoutes from './routes/tradesRoutes';
import queryRoutes from './routes/queryRoutes';
import userRoutes from './routes/userRoutes';
import errorHandler from './middleware/errorMiddleware';

import User from './models/User';
import Trade from './models/Trade';
import sequelize from './utils/database';

import { get404 } from './controllers/error';

const app: Application = express();
const PORT: number = parseInt(process.env.PORT as string, 10);

/**
 *  App Configuration
 */

//Enable All CORS Requests
app.use(cors());
//Set Security HTTP Headers
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'logs', 'access.log'),
  { flags: 'a' }
);
//Setup the logger
app.use(morgan('combined', { stream: accessLogStream }));

app.use('/api/trades', tradesRoutes);
app.use('/api/query', queryRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: 'API is running...' });
});

app.use(get404);

app.use(errorHandler);

Trade.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Trade);

/**
 * Server Activation
 */
sequelize
  .sync()
  .then(result => {
    app.listen(PORT, () => {
      console.log(
        `server running in ${process.env.NODE_ENV} mode on port ${PORT} `
      );
    });
  })
  .catch(err => {
    console.log('Error in connecting to the DB: ', err);
  });
