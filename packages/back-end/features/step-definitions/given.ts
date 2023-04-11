import { Given } from '@cucumber/cucumber';
import sinon from 'sinon';
import createApp from '../../src';
import World from './world';
import {
  DatabaseServiceImpl,
  PersonProperties,
  UserProperties,
} from '../../src/entities';
import {
  PasswordService,
  PersonCreationService,
  TokenService,
} from '../../src/services';

Given('a running app', async function (this: World) {
  return new Promise<void>((resolve, reject) => {
    const databaseService = this.parameters['mock-database']
      ? sinon.createStubInstance(DatabaseServiceImpl)
      : new DatabaseServiceImpl(this.databaseDriver);
    const tokenService = new TokenService('JWT_SECRET');
    const passwordService = new PasswordService();
    const personCreationService = new PersonCreationService();
    this.app = createApp({
      databaseService,
      tokenService,
      passwordService,
      personCreationService,
    });
    this.app.listen(function (err: unknown) {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
});

Given('a clean database', async function (this: World) {
  if (this.parameters['mock-database'] !== true) {
    const session = this.databaseDriver.session();
    try {
      await session.run('MATCH (n) DETACH DELETE n');
    } finally {
      await session.close();
    }
  }
});

Given(
  'an existing user {string}',
  async function (this: World, userData: string) {
    if (this.parameters['mock-database'] === true) {
      return;
    }
    const databaseService = new DatabaseServiceImpl(this.databaseDriver);

    const user: UserProperties = JSON.parse(userData);
    if (user.id === undefined) {
      user.id = this.idCounter++;
    } else {
      this.idCounter = user.id + 1;
    }

    const passwordService = new PasswordService();
    if (user.password !== undefined) {
      user.password = await passwordService.hashPassword(user.password);
    }

    await databaseService.createUser(user);
  }
);
Given(
  'an existing person {string}',
  async function (this: World, personData: string) {
    if (this.parameters['mock-database'] === true) {
      return;
    }
    const databaseService = new DatabaseServiceImpl(this.databaseDriver);

    const person: PersonProperties = JSON.parse(personData);
    if (person.id === undefined) {
      person.id = this.idCounter++;
    } else {
      this.idCounter = person.id + 1;
    }

    await databaseService.createPerson(person);
  }
);

Given(
  'I am an authenticated user {int}',
  function (this: World, userId: number) {
    const tokenService = new TokenService('JWT_SECRET');
    const jwtToken = tokenService.generateToken({ id: userId });
    this.requestHeaders['authorization'] = `Bearer ${jwtToken}`;
  }
);
