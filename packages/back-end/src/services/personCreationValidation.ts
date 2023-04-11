import { PersonProperties } from '../entities/person';

export type CreatePerson = {
  name: string;
  birthDate?: string;
  deathDate?: string;
  children?: PersonProperties[];
  partner?: PersonProperties[];
  father?: PersonProperties;
  mother?: PersonProperties;
};

export default class PersonCreationValidationService {
  private validateRelative(
    relative: PersonProperties | undefined,
    propertyName: string
  ) {
    if (relative && relative.id === undefined)
      return `Invalid ${propertyName}: id is required.`;
    return '';
  }

  private validateRelatives(
    relatives: PersonProperties[] | undefined,
    propertyName: string
  ) {
    const errors = [];
    if (relatives) {
      if (!Array.isArray(relatives))
        errors.push(`Invalid ${propertyName}: should be an array.`);
      else
        relatives.some((relative) => {
          const validationError = this.validateRelative(relative, propertyName);
          validationError !== '' && errors.push(validationError);
          return validationError !== '';
        });
    }
    return errors;
  }

  private validatePerson(person: Partial<PersonProperties>) {
    const { name, birthDate, deathDate } = person;
    const errors = [];

    if (!name) errors.push('Name is required.');
    if (birthDate && isNaN(Date.parse(birthDate)))
      errors.push('Invalid birthDate.');
    if (deathDate && isNaN(Date.parse(deathDate)))
      errors.push('Invalid deathDate.');
    return errors;
  }

  public validate(createPersonData: CreatePerson) {
    let errors: string[] = [];
    const { name, birthDate, deathDate, children, partner, father, mother } =
      createPersonData;

    errors = errors.concat(this.validatePerson({ name, birthDate, deathDate }));
    errors = errors.concat(this.validateRelatives(children, 'children'));
    errors = errors.concat(this.validateRelatives(partner, 'partner'));
    errors.push(this.validateRelative(father, 'father'));
    errors.push(this.validateRelative(mother, 'mother'));
    return errors.filter(Boolean);
  }
}
