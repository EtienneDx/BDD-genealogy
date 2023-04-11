import { Node, Integer, Relationship } from 'neo4j-driver';

export interface PersonProperties {
  id: number;
  name?: string;
  gender?: string;
  img?: string;
  birthDate?: string;
  deathDate?: string;
}

export type Person = Node<Integer, PersonProperties>;

export type Father = Relationship<Integer, Record<string, never>>;
export type Mother = Relationship<Integer, Record<string, never>>;
export type Partner = Relationship<Integer, Record<string, never>>;

export type PersonFather = {
  person: Person;
  father: Father;
  otherPerson: Person;
};
export type PersonMother = {
  person: Person;
  mother: Mother;
  otherPerson: Person;
};
export type PersonPartner = {
  person: Person;
  partners: Partner[];
  otherPersons: Person[];
};
