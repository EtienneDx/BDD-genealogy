import { When } from '@cucumber/cucumber';
import { expect } from 'chai';
import supertest from 'supertest';
import World from './world';
import { DatabaseServiceImpl, PersonProperties } from '../../src/entities';

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
    const databaseService = new DatabaseServiceImpl(this.databaseDriver);

    const person: PersonProperties = {
      id: this.idCounter++,
      name,
    };

    await databaseService.createPerson(person);
  }
);

When(
  'I post a {string} email and {string} password to {string}',
  async function (
    this: World,
    mailValidity: string,
    passwordValidity: string,
    path: string
  ) {
    const email: string =
      mailValidity === 'valid' ? 'validemail@tdd.org' : 'wrongemail@tdd.org';
    const password: string =
      passwordValidity === 'valid' ? 'validpassword1234' : 'wrongpassword1234';

    expect(this.app).not.to.be.undefined;
    this.response = await supertest(this.app)
      .post(path)
      .send({ email, password });
  }
);
