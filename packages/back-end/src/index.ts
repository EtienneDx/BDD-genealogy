import express from 'express';
import { DatabaseService } from './entities/database';
import { authorizationMiddleware } from './middlewares';
import {
  PasswordService,
  PersonCreationService,
  PersonCreationValidationService,
  TokenService,
} from './services';
import {
  loginUser,
  registerUser,
  createPerson,
  getPersonById,
  getPersonsByName,
} from './controllers';

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
  personCreationValidationService: PersonCreationValidationService;
};
export default function createApp(options: CreateAppOptions) {
  const app = express();

  app.use(express.json());

  app.get('/', (_, res) => {
    res.json({ message: 'Hello World' });
  });
  app.post('/login', loginUser(options));
  app.post('/register', registerUser(options));
  app.use(authorizationMiddleware(options));

  app.post('/person', createPerson(options));

  app.get('/person/id/:id', getPersonById(options));
  app.get('/person/name/:name', getPersonsByName(options));

  return app;
}
