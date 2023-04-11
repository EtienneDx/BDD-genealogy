import { Request, Response } from 'express';
import { CreateAppOptions } from '..';

export const createPerson =
  ({
    databaseService,
    personCreationService,
    personCreationValidationService,
  }: CreateAppOptions) =>
  async (req: Request, res: Response) => {
    const person = req.body;
    const errors = personCreationValidationService.validate(person);
    if (errors.length > 0) {
      res
        .status(500)
        .json({ message: `Invalid request: ${errors.join(', ')}` });
    } else {
      try {
        await personCreationService.addPerson(databaseService, person);
        res.sendStatus(200);
      } catch (error) {
        const message = (error as Error).message;
        res.status(404).json({ message });
      }
    }
    return res;
  };

export const getPersonById =
  ({ databaseService }: CreateAppOptions) =>
  async (req: Request, res: Response) => {
    const idParam = req.params['id'];
    try {
      const id = parseInt(idParam, 10);
      const person = await databaseService.findPersonById(id);
      if (person === undefined) {
        res.status(404).json({ message: 'Person not found' });
      } else {
        res.status(200).json({ person: person?.properties });
      }
    } catch (error) {
      res.status(404).json({ message: 'Person not found' });
    }
    return res;
  };

export const getPersonsByName =
  ({ databaseService }: CreateAppOptions) =>
  async (req: Request, res: Response) => {
    const nameParam = req.params['name'];
    try {
      const persons = await databaseService.findPersonsByName(nameParam);
      res.status(200).json({ persons: persons.map((p) => p.properties) });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
    return res;
  };
