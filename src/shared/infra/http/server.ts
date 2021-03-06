import 'reflect-metadata';
import { config } from 'dotenv';

import cors from 'cors';
import { errors } from 'celebrate';
import 'express-async-errors';

import express, { Response, Request, NextFunction } from 'express';

import AppError from '../../errors/AppError';
import routes from './routes';

import '../../../shared/infra/typeorm';
import '../../../shared/container';

config()
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server error',
  });
});

app.listen(3333, () => {
  console.log('🚀Server started on port 3333');
});
