import { When } from '@cucumber/cucumber';
import { expect } from 'chai';
import supertest from 'supertest';
import World from './world';
import { DatabaseServiceImpl, PersonProperties } from '../../src/entities';
import { getTestRoute } from './helpers';
import { TokenService } from '../../src/services';

When('I visit {string}', async function (this: World, path: string) {
  expect(this.app).not.to.be.undefined;
  this.response = await supertest(this.app).get(path);
});

When(
  'I add a person with name {string}',
  async function (this: World, name: string) {
    if (this.parameters['mock-database'] === true) {
      // when mocking, we consider that the person is successfully added
      return;
    }

    const person: PersonProperties = {
      id: this.idCounter++,
      name,
    };

    const databaseService = new DatabaseServiceImpl(this.databaseDriver);
    await databaseService.createPerson(person);
  }
);

When(
  // When I "post/get/put" a "jsonData" object to "path"
  'I {string} a {string} object to {string}',
  async function (
    this: World,
    method: string,
    objectData: string,
    path: string
  ) {
    expect(this.app).not.to.be.undefined;
    expect(method).to.be.oneOf(['post', 'put', 'get']);

    this.response = await getTestRoute(this.app, method, path).send(
      JSON.parse(objectData)
    );
  }
);

When(
  // When I "post/get/put" a "jsonData" object to "path" authenticated as user "userId"
  'I {string} a {string} object to {string} authenticated as user {int}',
  async function (
    this: World,
    method: string,
    objectData: string,
    path: string,
    userId: number
  ) {
    expect(this.app).not.to.be.undefined;
    expect(method).to.be.oneOf(['post', 'put', 'get']);

    const tokenService = new TokenService('JWT_SECRET');
    const jwtToken = tokenService.generateToken({ id: userId });

    this.response = await getTestRoute(this.app, method, path)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send(JSON.parse(objectData));
  }
);
