import { expect } from '../test-helper';
import { PasswordService } from '../../src/services';

describe('Password Service', () => {
  const passwordService = new PasswordService();
  it(
    'Given a password ' +
      'When I hash the password ' +
      'Then I should get a hashed password',
    async () => {
      // GIVEN
      const password = 'password';

      // WHEN
      const hashedPassword = await passwordService.hashPassword(password);

      // THEN
      expect(hashedPassword).to.not.equal(password);
    }
  );

  it(
    'Given a password and a hashed password ' +
      'When I compare the password and the hashed password ' +
      'Then I should get true',
    async () => {
      // GIVEN
      const password = 'password';
      const hashedPassword = await passwordService.hashPassword(password);

      // WHEN
      const isPasswordMatch = await passwordService.comparePassword(
        password,
        hashedPassword
      );

      // THEN
      expect(isPasswordMatch).to.be.true;
    }
  );

  it(
    'Given a password and another hashed password ' +
      'When I compare the password and the hashed password ' +
      'Then I should get false',
    async () => {
      // GIVEN
      const password = 'password';
      const hashedPassword = await passwordService.hashPassword(password);
      const anotherPassword = 'another password';

      // WHEN
      const isPasswordMatch = await passwordService.comparePassword(
        anotherPassword,
        hashedPassword
      );

      // THEN
      expect(isPasswordMatch).to.be.false;
    }
  );
});
