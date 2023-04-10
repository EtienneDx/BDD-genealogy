import { DatabaseService } from '../entities/database';
import { CreatePerson } from './createPersonValidator';

export default class PersonCreationService {
  public async addPerson(
    databaseService: DatabaseService,
    person: CreatePerson
  ) {
    const { children, partner, mother, father, ...newPerson } = person;
    const savedPerson = await databaseService.createPerson(newPerson);
    if (father) {
      const savedFather = await databaseService.findPersonById(father.id);
      if (savedFather?.properties.id !== undefined)
        await databaseService.setFather(savedPerson, savedFather);
    }
    if (mother) {
      const savedMother = await databaseService.findPersonById(mother.id);
      if (savedMother?.properties.id !== undefined)
        await databaseService.setMother(savedPerson, savedMother);
    }
    if (partner && partner.length > 0) {
      const existingPartners = await Promise.all(
        partner.map(({ id }) => databaseService.findPersonById(id))
      );
      await Promise.all(
        existingPartners.map((existingPartner) => {
          if (!existingPartner) return;
          databaseService.addPartner(savedPerson, existingPartner);
        })
      );
    }

    // TODO: Add children
  }
}
