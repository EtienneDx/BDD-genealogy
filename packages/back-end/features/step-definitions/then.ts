import { Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import DatabaseServiceImpl from '../../src/entities/database';
import World from './world';

Then(
  'I should see a {int} status code',
  function (this: World, statusCode: number) {
    expect(this.response).not.to.be.undefined;
    expect(this.response?.status).to.equal(statusCode);
  }
);
Then(
  'I should see a {string} content type',
  function (this: World, contentType: string) {
    expect(this.response).not.to.be.undefined;
    expect(this.response?.type).to.equal(contentType);
  }
);
Then(
  'I should see a {string} field containing {string}',
  function (this: World, field: string, value: string) {
    expect(this.response).not.to.be.undefined;
    expect(this.response?.body[field]).to.equal(value);
  }
);

Then(
  'I should be able to retrieve the person with name {string}',
  async function (this: World, name: string) {
    if (this.parameters['mock-database'] === true) {
      // when mocking, we consider that the person is always found
      return;
    }
    const databaseService = new DatabaseServiceImpl(this.databaseDriver);
    const persons = await databaseService.findPersonsByName(name);

    expect(persons).not.to.be.undefined;
    expect(persons.length).to.equal(1);
    expect(persons[0].properties.name).to.equal(name);
  }
);
