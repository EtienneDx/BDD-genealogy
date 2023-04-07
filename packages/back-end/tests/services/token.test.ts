import jwt from 'jsonwebtoken';
import { expect } from '../test-helper';
import { TokenService } from '../../src/services';

const PAYLOAD = { id: '123' };
const JWT_SECRET = 'secret';

describe('Token Service', () => {
  const tokenService = new TokenService(JWT_SECRET);

  it(
    'Given a valid token ' +
      'When I verify the token ' +
      'Then I should get the token payload',
    () => {
      // GIVEN
      const token = jwt.sign(PAYLOAD, JWT_SECRET);

      // WHEN
      const payload = tokenService.verifyToken<typeof PAYLOAD>(token);

      // THEN
      expect(payload).to.not.be.false;
      const payloadObject = payload as typeof PAYLOAD;
      expect(payloadObject.id).to.equal(PAYLOAD.id);
    }
  );

  it(
    'Given an invalid token ' +
      'When I verify the token ' +
      'Then I should get false',
    () => {
      // GIVEN
      const token = 'invalid token';

      // WHEN
      const payload = tokenService.verifyToken<typeof PAYLOAD>(token);

      // THEN
      expect(payload).to.be.false;
    }
  );
});
