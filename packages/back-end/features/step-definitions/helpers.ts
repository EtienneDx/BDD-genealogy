import { DatabaseService } from '../../src/entities/database';
import { Person } from '../../src/entities/person';
import { expect, assert } from 'chai';

export type Relationships = 'father' | 'mother' | 'child' | 'partner';

export const findOnePersonByRelationship = async (
  databaseService: DatabaseService,
  personId: number,
  relationship: string
) => {
  let relatedPerson: Person;
  switch (relationship) {
    case 'father':
      relatedPerson = await databaseService.findFather(personId);
      break;
    case 'mother':
      relatedPerson = await databaseService.findMother(personId);
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
