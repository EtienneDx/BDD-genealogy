import jwt from 'jsonwebtoken';

export default class TokenService {
  jwtSecret: string;

  constructor(jwtSecret?: string) {
    this.jwtSecret = jwtSecret ?? process.env['JWT_SECRET'] ?? '';
    if (!this.jwtSecret) {
      throw new Error('JWT_SECRET is not defined');
    }
  }

  public verifyToken<T extends object>(token: string): T | boolean {
    try {
      const payload = jwt.verify(token, this.jwtSecret);
      if (typeof payload === 'string') {
        return false;
      }
      return payload as T;
    } catch (error) {
      return false;
    }
  }

  public generateToken(payload: object): string {
    return jwt.sign(payload, this.jwtSecret);
  }
}
