import { Request, Response } from 'express';
import { CreateAppOptions } from '..';
import { UserProperties } from '../entities';

export const registerUser =
  ({ tokenService, databaseService }: CreateAppOptions) =>
  async (req: Request, res: Response) => {
    if (
      typeof req.body !== 'object' ||
      typeof req.body.name !== 'string' ||
      typeof req.body.email !== 'string' ||
      typeof req.body.password !== 'string'
    ) {
      res.status(400).json({ message: 'Invalid request body.' });
      return;
    }

    const { name, email, password } = req.body;
    const user: Partial<UserProperties> = {
      name,
      email,
      password,
    };

    const userProperties = await databaseService
      .createUser(user)
      .then((user) => user?.properties);

    const token = tokenService.generateToken({
      id: userProperties.id,
      name: userProperties.name,
      email: userProperties.email,
    });

    res.status(200);
    res.json({ token });
  };
