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
