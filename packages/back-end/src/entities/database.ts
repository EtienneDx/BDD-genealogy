import neo4j, { Driver } from 'neo4j-driver';
import { Person, PersonProperties } from './person';
import { User, UserProperties } from './user';

export interface DatabaseService {
  findPersonById(id: number): Promise<Person | undefined>;
  findPersonsByName(name: string): Promise<Person[]>;

  findFather(id: number): Promise<Person | undefined>;
  findFather(person: Person): Promise<Person | undefined>;

  findMother(id: number): Promise<Person | undefined>;
  findMother(person: Person): Promise<Person | undefined>;

  findPartners(id: number): Promise<Person[]>;
  findPartners(person: Person): Promise<Person[]>;

  findChildren(id: number): Promise<Person[]>;
  findChildren(person: Person): Promise<Person[]>;

  updatePerson(person: Partial<PersonProperties>): Promise<void>;
  createPerson(person: Partial<PersonProperties>): Promise<void>;
  setFather(person: Person, father: Person): Promise<void>;
  removeFather(person: Person): Promise<void>;
  setMother(person: Person, mother: Person): Promise<void>;
  removeMother(person: Person): Promise<void>;
  addPartner(person: Person, partner: Person): Promise<void>;
  removePartner(person: Person, partner: Person): Promise<void>;

  createUser(user: UserProperties): Promise<void>;
  getUserByEmail(email: string): Promise<User | undefined>;
}

export class DatabaseServiceImpl implements DatabaseService {
  private driver: Driver;

  constructor(driver: Driver) {
    this.driver = driver;
  }

  async findPersonById(id: number): Promise<Person | undefined> {
    const session = this.driver.session();

    try {
      const result = await session.run(
        'MATCH (p:Person) WHERE p.id = $id RETURN p',
        { id }
      );

      const person = result.records[0].get('p');

      return person;
    } catch {
      return undefined;
    } finally {
      await session.close();
    }
  }

  async findPersonsByName(name: string): Promise<Person[]> {
    const session = this.driver.session();

    try {
      const result = await session.run(
        'MATCH (p:Person) WHERE p.name = $name RETURN p',
        { name }
      );

      const persons = result.records.map((record) => record.get('p'));

      return persons;
    } finally {
      await session.close();
    }
  }

  async findFather(person: number | Person): Promise<Person | undefined> {
    const session = this.driver.session();
    const id = typeof person === 'number' ? person : person.properties.id;

    try {
      const result = await session.run(
        'MATCH (p:Person)-[:FATHER]->(f:Person) WHERE p.id = $id RETURN f',
        { id: id }
      );

      const father = result.records[0].get('f');

      return father;
    } catch {
      return undefined;
    } finally {
      await session.close();
    }
  }

  async findMother(person: number | Person): Promise<Person | undefined> {
    const session = this.driver.session();
    const id = typeof person === 'number' ? person : person.properties.id;

    try {
      const result = await session.run(
        'MATCH (p:Person)-[:MOTHER]->(m:Person) WHERE p.id = $id RETURN m',
        { id: id }
      );

      const mother = result.records[0].get('m');

      return mother;
    } finally {
      await session.close();
    }
  }

  async findPartners(person: number | Person): Promise<Person[]> {
    const session = this.driver.session();
    const id = typeof person === 'number' ? person : person.properties.id;

    try {
      const result = await session.run(
        'MATCH (p:Person)-[:PARTNER]-(partner:Person) WHERE p.id = $id RETURN partner',
        { id: id }
      );

      const partners = result.records.map((record) => record.get('partner'));

      return partners;
    } finally {
      await session.close();
    }
  }

  async findChildren(person: number | Person): Promise<Person[]> {
    const session = this.driver.session();
    const id = typeof person === 'number' ? person : person.properties.id;

    try {
      const result = await session.run(
        'MATCH (p:Person)<-[:FATHER|:MOTHER]-(child:Person) WHERE p.id = $id RETURN child',
        { id: id }
      );

      const children = result.records.map((record) => record.get('child'));

      return children;
    } finally {
      await session.close();
    }
  }

  async updatePerson(person: Partial<PersonProperties>): Promise<void> {
    const session = this.driver.session();

    try {
      await session.run('MATCH (p:Person) WHERE p.id = $id SET p = $person', {
        id: person.id,
        person,
      });
    } finally {
      await session.close();
    }
  }

  async createPerson(person: Partial<PersonProperties>): Promise<void> {
    const session = this.driver.session();

    try {
      await session.run('CREATE (p:Person $person)', { person });
    } finally {
      await session.close();
    }
  }

  async setFather(person: Person, father: Person): Promise<void> {
    const session = this.driver.session();

    try {
      await session.run(
        'MATCH (p:Person)-[r:FATHER]->(f:Person) WHERE p.id = $personId DELETE r',
        { personId: person.properties.id }
      );
      await session.run(
        'MATCH (p:Person), (f:Person) WHERE p.id = $personId AND f.id = $fatherId CREATE (p)-[:FATHER]->(f)',
        { personId: person.properties.id, fatherId: father.properties.id }
      );
    } finally {
      await session.close();
    }
  }

  async removeFather(person: Person): Promise<void> {
    const session = this.driver.session();

    try {
      await session.run(
        'MATCH (p:Person)-[r:FATHER]->(f:Person) WHERE p.id = $personId DELETE r',
        { personId: person.properties.id }
      );
    } finally {
      await session.close();
    }
  }

  async setMother(person: Person, mother: Person): Promise<void> {
    const session = this.driver.session();

    try {
      await session.run(
        'MATCH (p:Person)-[r:MOTHER]->(m:Person) WHERE p.id = $personId DELETE r',
        { personId: person.properties.id }
      );
      await session.run(
        'MATCH (p:Person), (m:Person) WHERE p.id = $personId AND m.id = $motherId CREATE (p)-[:MOTHER]->(m)',
        { personId: person.properties.id, motherId: mother.properties.id }
      );
    } finally {
      await session.close();
    }
  }

  async removeMother(person: Person): Promise<void> {
    const session = this.driver.session();

    try {
      await session.run(
        'MATCH (p:Person)-[r:MOTHER]->(m:Person) WHERE p.id = $personId DELETE r',
        { personId: person.properties.id }
      );
    } finally {
      await session.close();
    }
  }

  async addPartner(person: Person, partner: Person): Promise<void> {
    const session = this.driver.session();

    try {
      await session.run(
        'MATCH (p:Person), (partner:Person) WHERE p.id = $personId AND partner.id = $partnerId CREATE (p)-[:PARTNER]->(partner)',
        { personId: person.properties.id, partnerId: partner.properties.id }
      );
    } finally {
      await session.close();
    }
  }

  async removePartner(person: Person, partner: Person): Promise<void> {
    const session = this.driver.session();

    try {
      await session.run(
        'MATCH (p:Person)-[r:PARTNER]-(partner:Person) WHERE p.id = $personId AND partner.id = $partnerId DELETE r',
        { personId: person.properties.id, partnerId: partner.properties.id }
      );
    } finally {
      await session.close();
    }
  }

  async createUser(user: UserProperties): Promise<void> {
    const session = this.driver.session();

    try {
      await session.run('CREATE (u:User $user)', { user });
    } finally {
      await session.close();
    }
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const session = this.driver.session();

    try {
      const result = await session.run(
        'MATCH (u:User) WHERE u.email = $email RETURN u',
        { email }
      );

      const user = result.records[0].get('u');

      return user;
    } catch {
      return undefined;
    } finally {
      await session.close();
    }
  }
}

export function connectToDatabase(): DatabaseService {
  const driver = neo4j.driver('bolt://localhost:7687');
  return new DatabaseServiceImpl(driver);
}
