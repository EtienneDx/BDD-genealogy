import supertest from 'supertest';
import { DatabaseService } from '../../src/entities/database';
import { Person } from '../../src/entities/person';
import { expect, assert } from 'chai';
import { Express } from 'express';

export type Relationships = 'father' | 'mother' | 'child' | 'partner';

export const findOnePersonByRelationship = async (
  databaseService: DatabaseService,
  personId: number,
  relationship: string
) => {
  let relatedPerson: Person;
  switch (relationship) {
    case 'father':
      const father = await databaseService.findFather(personId);
      expect(father).not.to.be.undefined;
      relatedPerson = father as Person;
      break;
    case 'mother':
      const mother = await databaseService.findMother(personId);
      expect(mother).not.to.be.undefined;
      relatedPerson = mother as Person;
      break;
    case 'child':
      const children = await databaseService.findChildren(personId);
      expect(children.length).to.equal(1);
      relatedPerson = children[0];
      break;
    case 'partner':
      const partners = await databaseService.findPartners(personId);
      expect(partners.length).to.equal(1);
      relatedPerson = partners[0];
      break;
    default:
      assert.fail('Expected father, child, mother or partner as relationship');
  }
  return relatedPerson;
};

export const relationshipToCreatePersonKey = {
  child: 'children',
  partner: 'partner',
  mother: 'mother',
  father: 'father',
};

export const getTestRoute = (
  app: Express | undefined,
  method: string,
  path: string
) => {
  switch (method) {
    case 'post':
      return supertest(app).post(path);
    case 'put':
      return supertest(app).put(path);
    case 'get':
      return supertest(app).get(path);
    default:
      assert.fail(`Unexpected method: ${method}`);
  }
};
