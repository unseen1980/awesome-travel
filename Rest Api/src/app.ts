import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';
import airportRouter from './routes/airports';
import airlineRouter from './routes/airlines';
import countryRouter from './routes/countries';

export function createApp() {
  const app = express();
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  // Serve static files
  app.use(express.static(path.join(__dirname, '../public')));

  app.use('/api/airports', airportRouter);
  app.use('/api/airlines', airlineRouter);
  app.use('/api/countries', countryRouter);

  return app;
}

export default createApp;
