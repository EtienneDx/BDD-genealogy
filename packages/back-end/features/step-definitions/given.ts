import { Given } from '@cucumber/cucumber';
import createApp from '../../src';
import World from './world';

Given('a running app', async function (this: World) {
  return new Promise<void>((resolve, reject) => {
    this.app = createApp();
    this.app.listen(function (err: unknown) {
      if (err) { return reject(err); }
      resolve();
    });
  });
});

Given('a clean database', async function (this: World) {
  if(this.parameters['mock-database'] !== true) {
    const session = this.databaseDriver.session();
    try {
      await session.run('MATCH (n) DETACH DELETE n');
    } finally {
      await session.close();
    }
  }
});