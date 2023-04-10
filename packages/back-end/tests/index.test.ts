import supertest from 'supertest';
import { Express as ExpressApp } from 'express-serve-static-core';
import { expect } from './test-helper';
import createApp from '../src';
import { DatabaseServiceImpl } from '../src/entities';
import {
  PasswordService,
  PersonCreationService,
  TokenService,
} from '../src/services';
import sinon from 'sinon';

describe('App', () => {
  let app: ExpressApp;

  before((done) => {
    const databaseService = sinon.createStubInstance(DatabaseServiceImpl);
    const tokenService = new TokenService('JWT_SECRET');
    const passwordService = new PasswordService();
    const personCreationService = new PersonCreationService();

    app = createApp({
      databaseService,
      tokenService,
      passwordService,
      personCreationService,
    });
    app.listen(function (err: unknown) {
      if (err) {
        return done(err);
      }
      done();
    });
  });

  describe('Default route', () => {
    it(
      'Given a running app ' +
        'When I visit the root path ' +
        'Then I should get a hello world json message',
      async () => {
        // GIVEN

        // WHEN
        await supertest(app)
          .get('/')

          // THEN
          .expect(200)
          .expect('Content-Type', /application\/json/)
          .then((response) => {
            expect(response.body).to.deep.equal({ message: 'Hello World' });
          });
      }
    );
  });
});
