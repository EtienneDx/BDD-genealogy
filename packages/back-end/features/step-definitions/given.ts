import { Given } from '@cucumber/cucumber';
import createApp from '../../src';
import World from './world';
import { DatabaseServiceImpl, UserProperties } from '../../src/entities';
import { PasswordService, TokenService } from '../../src/services';

Given('a running app', async function (this: World) {
  return new Promise<void>((resolve, reject) => {
    const databaseService = new DatabaseServiceImpl(this.databaseDriver);
    const tokenService = new TokenService('JWT_SECRET');
    const passwordService = new PasswordService();
    this.app = createApp({ databaseService, tokenService, passwordService });
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

    // TODO: hash password

    await databaseService.createUser(user);
  }
);
