import { NextFunction, Request, Response } from 'express';
import { CreateAppOptions } from '..';

export const authorizationMiddleware =
  ({ tokenService }: CreateAppOptions) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    const [bearer, token] = authorization.split(' ');
    if (bearer !== 'Bearer' || !token) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const user = tokenService.verifyToken<{ id: string }>(token);
    if (!user) {
      res.status(403).json({ message: 'Unauthorized' });
      return;
    }

    req.user = user as { id: string };

    next();
  };
