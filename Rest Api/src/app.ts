import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import airportRouter from './routes/airports';

export function createApp() {
  const app = express();
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.use('/api/airports', airportRouter);

  return app;
}

export default createApp;
