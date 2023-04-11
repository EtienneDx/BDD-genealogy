import { Request, Response } from 'express';
import { CreateAppOptions } from '..';

export const createPerson =
  ({ databaseService, personCreationService }: CreateAppOptions) =>
  async (req: Request, res: Response) => {
    const person = req.body;
    await personCreationService.addPerson(databaseService, person);
    res.sendStatus(200);
  };
