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
