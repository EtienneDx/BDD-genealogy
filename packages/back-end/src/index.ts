import express from 'express';
import { DatabaseService } from './entities/database';

declare module 'express-serve-static-core' {
  export interface Express {
    databaseService: DatabaseService;
  }
}

export default function createApp(databaseService: DatabaseService) {
  const app = express();
  app.databaseService = databaseService;

  app.get('/', (_, res) => {
    res.json({ message: 'Hello World' });
  });

  return app;
}
