import { CreatePerson } from '../../src/services/personCreationValidation';
import { expect } from 'chai';
import sinon from 'sinon';
import { PersonCreationService } from '../../src/services';
import {
  DatabaseService,
  DatabaseServiceImpl,
  Person,
} from '../../src/entities';

describe('AddPersonService', () => {
  let databaseService: DatabaseService;
  let personCreationService: PersonCreationService;

  before((done) => {
    databaseService = sinon.createStubInstance(DatabaseServiceImpl);
    personCreationService = new PersonCreationService();
    done();
  });

  describe('Adding a person in database', async () => {
    it(
      'Given an object representing a person, named John Doe and of birthDate 01/01/1980 ' +
        'When I add John Doe in the database ' +
        'Then John Doe is persisted.',
      async () => {
        // GIVEN
        const person: CreatePerson = {
          name: 'John Doe',
          birthDate: '01/01/1980',
        };

        // WHEN
        await personCreationService.addPerson(databaseService, person);

        // THEN
        expect(databaseService.createPerson).to.be.calledWith(person);
      }
    );
    it(
      'Given a person named John Doe and their father with id 0 ' +
        'When I add John Doe in the database ' +
        'Then the person with id 0 is John Does father.',
      async () => {
        // GIVEN
        const existingFather = { properties: { id: 0 } };
        const expectedCreatedPerson = {
          properties: { id: 0, name: 'John Doe' },
        };
        const person: CreatePerson = {
          name: expectedCreatedPerson.properties.name,
          father: existingFather.properties,
        };
        sinon
          .stub(databaseService, 'findPersonById')
          .resolves(existingFather as Person);
        const createPersonStub = sinon
          .stub(databaseService, 'createPerson')
          .resolves(expectedCreatedPerson as Person);
        const setFatherStub = sinon.stub(databaseService, 'setFather');

        // WHEN
        await personCreationService.addPerson(databaseService, person);

        // THEN
        expect(createPersonStub).to.be.calledWith({
          name: person.name,
        });
        expect(setFatherStub).to.be.calledWith(
          expectedCreatedPerson,
          existingFather
        );
      }
    );
    it(
      'Given a person named John Doe and their mother with id 0 ' +
        'When I add John Doe in the database ' +
        'Then the person with id 0 is John Does mother.',
      async () => {
        // GIVEN
        const existingMother = { properties: { id: 0 } };
        const expectedCreatedPerson = {
          properties: { id: 0, name: 'John Doe' },
        };
        const person: CreatePerson = {
          name: expectedCreatedPerson.properties.name,
          mother: existingMother.properties,
        };
        sinon
          .stub(databaseService, 'findPersonById')
          .resolves(existingMother as Person);
        const createPersonStub = sinon
          .stub(databaseService, 'createPerson')
          .resolves(expectedCreatedPerson as Person);
        const setMotherStub = sinon.stub(databaseService, 'setMother');

        // WHEN
        await personCreationService.addPerson(databaseService, person);

        // THEN
        expect(createPersonStub).to.be.calledWith({
          name: person.name,
        });
        expect(setMotherStub).to.be.calledWith(
          expectedCreatedPerson,
          existingMother
        );
      }
    );
    it(
      'Given a person named John Doe and their partner with id 0 ' +
        'When I add John Doe in the database ' +
        'Then the person with id 0 is one of John Does partner.',
      async () => {
        // GIVEN
        const existingPartner = { properties: { id: 0 } };
        const anotherExistingPartner = { properties: { id: 1 } };
        const expectedCreatedPerson = {
          properties: { id: 0, name: 'John Doe' },
        };
        const person: CreatePerson = {
          name: expectedCreatedPerson.properties.name,
          partner: [
            existingPartner.properties,
            anotherExistingPartner.properties,
          ],
        };
        sinon
          .stub(databaseService, 'findPersonById')
          .callsFake((id) =>
            Promise.resolve(
              (id === 0 ? existingPartner : anotherExistingPartner) as Person
            )
          );
        const createPersonStub = sinon
          .stub(databaseService, 'createPerson')
          .resolves(expectedCreatedPerson as Person);
        const addPartnerStub = sinon.stub(databaseService, 'addPartner');

        // WHEN
        await personCreationService.addPerson(databaseService, person);

        // THEN
        expect(createPersonStub).to.be.calledWith({
          name: person.name,
        });
        expect(addPartnerStub).to.be.calledWith(
          expectedCreatedPerson,
          existingPartner
        );
        expect(addPartnerStub).to.be.calledWith(
          expectedCreatedPerson,
          anotherExistingPartner
        );
      }
    );
  });
});
