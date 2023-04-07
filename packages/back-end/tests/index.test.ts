import supertest from 'supertest';
import { Express as ExpressApp } from 'express-serve-static-core';
import { expect } from './test-helper';
import createApp from '../src';
import { DatabaseServiceImpl } from '../src/entities';
import { Driver } from 'neo4j-driver';
import Sinon from 'sinon';
import { TokenService } from '../src/services';

describe('App', () => {
  let app: ExpressApp;

  before((done) => {
    const driver = Sinon.createStubInstance(Driver);
    const databaseService = new DatabaseServiceImpl(driver);
    const tokenService = new TokenService('JWT_SECRET');
    app = createApp({ databaseService, tokenService });
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
