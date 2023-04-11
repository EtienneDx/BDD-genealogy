import createApp from './src';
import { DatabaseServiceImpl } from './src/entities/database';
import neo4j from 'neo4j-driver';
import {
  PasswordService,
  PersonCreationService,
  PersonCreationValidationService,
  TokenService,
} from './src/services';

const databaseService = new DatabaseServiceImpl(
  neo4j.driver('bolt://localhost:7687')
);
const tokenService = new TokenService(
  process.env['JWT_SECRET'] ?? 'JWT_SECRET'
);
const passwordService = new PasswordService();
const personCreationService = new PersonCreationService();
const personCreationValidationService = new PersonCreationValidationService();

const app = createApp({
  databaseService,
  tokenService,
  passwordService,
  personCreationService,
  personCreationValidationService,
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
