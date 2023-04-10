import { When } from '@cucumber/cucumber';
import { expect } from 'chai';
import supertest from 'supertest';
import World from './world';
import { DatabaseServiceImpl, PersonProperties } from '../../src/entities';
import { CreatePerson } from '../../src/services/createPersonValidator';
import { Relationships, relationshipToCreatePersonKey } from './helpers';

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

    switch (method) {
      case 'post':
        this.response = await supertest(this.app)
          .post(path)
          .send(JSON.parse(objectData));
        break;

      case 'put':
        this.response = await supertest(this.app)
          .put(path)
          .send(JSON.parse(objectData));
        break;

      case 'get':
        this.response = await supertest(this.app)
          .get(path)
          .send(JSON.parse(objectData));
        break;
    }
  }
);
When(
  'I post a person named {string} whose {string} is the person with id {int} to {string} as connected user with id {int}',
  async function (
    this: World,
    name: string,
    relationship: Relationships,
    relatedId: number,
    path: string,
    userId: number
  ) {
    // TODO: use user id and create jwt Token
    const jwtToken =
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWQiOjAsImlhdCI6MTUxNjIzOTAyMn0._Lg12A5PSFc8xIb1sgHq1KAE9RHw7W1fgKq5n6QmCuY';

    const newPerson: CreatePerson = { name };
    const createPersonRelationshipKey =
      relationshipToCreatePersonKey[relationship];

    if (
      createPersonRelationshipKey === 'children' ||
      createPersonRelationshipKey === 'partner'
    ) {
      newPerson[createPersonRelationshipKey] = [{ id: relatedId }];
    } else if (
      createPersonRelationshipKey === 'father' ||
      createPersonRelationshipKey === 'mother'
    ) {
      newPerson[createPersonRelationshipKey] = { id: relatedId };
    }

    await supertest(this.app)
      .post(path)
      .set('Authorization', jwtToken)
      .send(newPerson);
  }
);

When(
  'I post a person named {string} to {string} as connected user with id {int}',
  async function (this: World, name: string, path: string, userId: number) {
    // TODO: use user id and create jwt Token
    const jwtToken =
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWQiOjAsImlhdCI6MTUxNjIzOTAyMn0._Lg12A5PSFc8xIb1sgHq1KAE9RHw7W1fgKq5n6QmCuY';

    const newPerson: CreatePerson = { name };

    await supertest(this.app)
      .post(path)
      .set('Authorization', jwtToken)
      .send(newPerson);
  }
);
