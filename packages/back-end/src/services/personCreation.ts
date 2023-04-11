import { DatabaseService } from '../entities/database';
import { CreatePerson } from './personCreationValidation';

export default class PersonCreationService {
  private maxJavascriptInt = Number.MAX_SAFE_INTEGER;
  private maxNeo4JInt = Math.pow(2, 63) - 1;

  public async addPerson(
    databaseService: DatabaseService,
    person: CreatePerson
  ) {
    const { children, partner, mother, father, ...newPerson } = person;
    const savedPerson = await databaseService.createPerson({
      ...newPerson,
      id: Math.floor(
        Math.random() * Math.min(this.maxJavascriptInt, this.maxNeo4JInt)
      ),
    });
    if (father) {
      const savedFather = await databaseService.findPersonById(father.id);
      if (!savedFather) throw Error('Father not found.');
      if (savedFather?.properties.id !== undefined)
        await databaseService.setFather(savedPerson, savedFather);
    }
    if (mother) {
      const savedMother = await databaseService.findPersonById(mother.id);
      if (!savedMother) throw Error('Mother not found.');
      if (savedMother?.properties.id !== undefined)
        await databaseService.setMother(savedPerson, savedMother);
    }
    if (partner && partner.length > 0) {
      const existingPartners = await Promise.all(
        partner.map(({ id }) => databaseService.findPersonById(id))
      );
      await Promise.all(
        existingPartners.map((existingPartner) => {
          if (!existingPartner) throw Error('Partner not found.');
          databaseService.addPartner(savedPerson, existingPartner);
        })
      );
    }

    // TODO: Add children
  }
}
