import express from 'express';
import { DatabaseService } from './entities/database';

declare module 'express-serve-static-core' {
  export interface Express {
    databaseService: DatabaseService;
  }
}

export type CreateAppOptions = {
  databaseService: DatabaseService
};
export default function createApp(options: CreateAppOptions) {
  const app = express();
  app.databaseService = options.databaseService;

  app.get('/', (_, res) => {
    res.json({ message: 'Hello World' });
  });

  return app;
}
