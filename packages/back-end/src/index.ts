import express from 'express';
import { DatabaseService } from './entities/database';
import { authorizationMiddleware } from './middlewares';
import { PasswordService, TokenService } from './services';
import loginController from './controllers/login';

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
  passwordService: PasswordService;
};
export default function createApp(options: CreateAppOptions) {
  const app = express();
  app.databaseService = options.databaseService;

  app.use(express.json());

  app.get('/', (_, res) => {
    res.json({ message: 'Hello World' });
  });
  app.post('/login', loginController(options));
  app.use(authorizationMiddleware(options));

  return app;
}
