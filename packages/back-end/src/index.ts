import express from 'express';
import { DatabaseService } from './entities/database';
import { authorizationMiddleware } from './middlewares';
import { TokenService } from './services';

declare module 'express-serve-static-core' {
  export interface Express {
    databaseService: DatabaseService;
  }
}

declare module 'express' {
  export interface Request {
    user?: {
      id: string;
    };
  }
}

export type CreateAppOptions = {
  databaseService: DatabaseService;
  tokenService: TokenService;
};
export default function createApp(options: CreateAppOptions) {
  const app = express();
  app.databaseService = options.databaseService;

  app.get('/', (_, res) => {
    res.json({ message: 'Hello World' });
  });
  app.post('/login', (_, res) => {
    res.json({ message: 'Access Denied' });
  });
  app.use(authorizationMiddleware);

  return app;
}
