import express from 'express';
import { DatabaseService } from './entities/database';
import { authorizationMiddleware } from './middlewares';
import {
  PasswordService,
  PersonCreationService,
  TokenService,
} from './services';
import loginController from './controllers/login';
import { createPerson } from './controllers/person';

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
  personCreationService: PersonCreationService;
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

  app.post('/person', createPerson(options));

  return app;
}
