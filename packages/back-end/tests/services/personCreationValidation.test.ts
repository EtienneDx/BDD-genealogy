import PersonCreationValidationService, {
  CreatePerson,
} from '../../src/services/personCreationValidation';
import { expect } from 'chai';

describe('PersonCreationValidationService', () => {
  let personCreationValidationService: PersonCreationValidationService;

  before((done) => {
    personCreationValidationService = new PersonCreationValidationService();
    done();
  });

  describe('Validating an object to create a person', async () => {
    it(
      'Given an object representing a person of birthDate 01/01/1980 ' +
        'When I validate the person ' +
        'Then an error is raised because the name is missing.',
      async () => {
        // GIVEN
        const person = {
          birthDate: '01/01/1980',
        };

        // WHEN
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore - Happens if the body is not well defined.
        const errors = personCreationValidationService.validate(person);

        // THEN
        expect(errors).to.be.have.length(1);
        expect(errors[0]).to.equal('Name is required.');
      }
    );
    it(
      'Given an object representing John Doe with invalid date ' +
        'When I validate the person ' +
        'Then an error is raised because the date is not valid.',
      async () => {
        // GIVEN
        const person: CreatePerson = {
          name: 'John Doe',
          birthDate: 'foo',
          deathDate: 'bar',
        };

        // WHEN
        const errors = personCreationValidationService.validate(person);

        // THEN
        expect(errors).to.be.have.length(2);
        expect(errors).to.contains('Invalid birthDate.');
        expect(errors).to.contains('Invalid deathDate.');
      }
    );
    it(
      'Given an object representing John Doe with a father not represented by id ' +
        'When I validate the person ' +
        'Then an error is raised.',
      async () => {
        // GIVEN
        const person = {
          name: 'John Doe',
          father: { name: 'Timmy Doe' },
        };

        // WHEN
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore - Happens if the body is not well defined.
        const errors = personCreationValidationService.validate(person);

        // THEN
        expect(errors).to.be.have.length(1);
        expect(errors[0]).to.equals('Invalid father: id is required.');
      }
    );
    it(
      'Given an object representing John Doe with a mother not represented by id ' +
        'When I validate the person ' +
        'Then an error is raised.',
      async () => {
        // GIVEN
        const person = {
          name: 'John Doe',
          mother: { name: 'Jammy Doe' },
        };

        // WHEN
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore - Happens if the body is not well defined.
        const errors = personCreationValidationService.validate(person);

        // THEN
        expect(errors).to.be.have.length(1);
        expect(errors[0]).to.equals('Invalid mother: id is required.');
      }
    );
    it(
      'Given an object representing John Doe with a child not in an array ' +
        'When I validate the person ' +
        'Then an error is raised.',
      async () => {
        // GIVEN
        const person = {
          name: 'John Doe',
          children: { id: 3 },
        };

        // WHEN
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore - Happens if the body is not well defined.
        const errors = personCreationValidationService.validate(person);

        // THEN
        expect(errors).to.be.have.length(1);
        expect(errors[0]).to.equals('Invalid children: should be an array.');
      }
    );
    it(
      'Given an object representing John Doe with a child not represented by id ' +
        'When I validate the person ' +
        'Then an error is raised.',
      async () => {
        // GIVEN
        const person = {
          name: 'John Doe',
          children: [{ id: 1 }, { name: 'Jammy Doe' }],
        };

        // WHEN
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore - Happens if the body is not well defined.
        const errors = personCreationValidationService.validate(person);

        // THEN
        expect(errors).to.be.have.length(1);
        expect(errors[0]).to.equals('Invalid children: id is required.');
      }
    );
    it(
      'Given an object representing John Doe with a partner not in an array ' +
        'When I validate the person ' +
        'Then an error is raised.',
      async () => {
        // GIVEN
        const person = {
          name: 'John Doe',
          partner: { id: 1 },
        };

        // WHEN
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore - Happens if the body is not well defined.
        const errors = personCreationValidationService.validate(person);

        // THEN
        expect(errors).to.be.have.length(1);
        expect(errors[0]).to.equals('Invalid partner: should be an array.');
      }
    );
    it(
      'Given an object representing John Doe with a partner not represented by id ' +
        'When I validate the person ' +
        'Then an error is raised.',
      async () => {
        // GIVEN
        const person = {
          name: 'John Doe',
          partner: [{ id: 1 }, { name: 'Jammy Doe' }],
        };

        // WHEN
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore - Happens if the body is not well defined.
        const errors = personCreationValidationService.validate(person);

        // THEN
        expect(errors).to.be.have.length(1);
        expect(errors[0]).to.equals('Invalid partner: id is required.');
      }
    );

    it(
      'Given an object representing John Doe with relatives represented by their id ' +
        'When I validate the person ' +
        'Then no error is raised.',
      async () => {
        // GIVEN
        const person: CreatePerson = {
          name: 'John Doe',
          mother: { id: 0 },
          father: { id: 1 },
          children: [{ id: 2 }],
          partner: [{ id: 3 }],
        };

        // WHEN
        const errors = personCreationValidationService.validate(person);

        // THEN
        expect(errors).to.be.have.length(0);
      }
    );
  });
});
