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
