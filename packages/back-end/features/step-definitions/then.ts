import { Then } from '@cucumber/cucumber';
import { expect, assert } from 'chai';
import World from './world';
import { Person } from '../../src/entities/person';

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
Then('I should see a {string} field', function (this: World, field: string) {
  expect(this.response).not.to.be.undefined;
  expect(this.response?.body[field]).to.not.be.undefined;
});

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

Then(
  '{string} is saved in the database',
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

Then(
  '{string} is the {string} of the person of id {int}',
  async function (this: World, name: string, relationship: string, id: number) {
    if (this.parameters['mock-database'] === true) {
      // when mocking, we consider that the person is always found
      return;
    }
    const databaseService = new DatabaseServiceImpl(this.databaseDriver);
    const person = await databaseService.findPersonById(id);
    expect(person).not.to.be.undefined;

    let relatedPerson: Person;
    switch (relationship) {
      case 'father':
        relatedPerson = await databaseService.findFather(id);
        break;
      case 'mother':
        relatedPerson = await databaseService.findMother(id);
        break;
      case 'child':
        const children = await databaseService.findChildren(id);
        expect(children.length).to.equal(1);
        relatedPerson = children[0];
        break;
      case 'partner':
        const partners = await databaseService.findPartners(id);
        expect(partners.length).to.equal(1);
        relatedPerson = partners[0];
        break;
      default:
        assert.fail(
          'Expected father, child, mother or partner as relationship'
        );
    }
    expect(relatedPerson).to.not.be.undefined;
    expect(relatedPerson.properties.name).to.be(name);
  }
);
