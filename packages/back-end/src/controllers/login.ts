import { Request, Response } from 'express';
import { CreateAppOptions } from '..';

export const loginUser =
  ({ tokenService, passwordService, databaseService }: CreateAppOptions) =>
  async (req: Request, res: Response) => {
    if (typeof req.body !== 'object') {
      res.status(400).json({ message: 'Invalid request body' });
      return;
    }
    if (typeof req.body.email !== 'string') {
      res.status(400).json({ message: 'Invalid request body' });
      return;
    }
    if (typeof req.body.password !== 'string') {
      res.status(400).json({ message: 'Invalid request body' });
      return;
    }

    const { email, password } = req.body;

    const resUser = await databaseService.getUserByEmail(email);
    if (resUser === undefined) {
      res.status(403).json({ message: 'Invalid credentials' });
      return;
    }
    const userProperties = resUser.properties;

    if (userProperties.password === undefined) {
      res.status(403).json({ message: 'Disabled user' });
      return;
    }

    const passwordMatches = await passwordService.comparePassword(
      password,
      userProperties.password ?? ''
    );

    if (!passwordMatches) {
      res.status(403).json({ message: 'Invalid credentials' });
      return;
    }

    const token = tokenService.generateToken({
      id: userProperties.id,
      name: userProperties.name,
      email: userProperties.email,
    });

    res.json({ token });
  };
