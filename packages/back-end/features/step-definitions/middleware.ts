import { Given, When, Then } from '@cucumber/cucumber';
import World from './world';
import { authorizationMiddleware } from '../../src/middlewares';
import { DatabaseServiceImpl } from '../../src/entities';
import sinon from 'sinon';
import { TokenService } from '../../src/services';
import { Request, Response } from 'express';
import { expect } from 'chai';

const authTypes = {
  valid: 'Bearer validtoken',
  invalid: 'Bearer invalidtoken',
};

Given(
  'a {string} Authorization header',
  function (this: World, authType: string) {
    if (Object.keys(authTypes).includes(authType)) {
      this.requestHeaders['authorization'] =
        authTypes[authType as keyof typeof authTypes];
    }
  }
);

When('the middleware processes the request', function (this: World) {
  const tokenService = sinon.createStubInstance(TokenService);
  // tokenService.verifyToken returns a valid user id when the token is valid and false when the token is invalid.
  tokenService.verifyToken.callsFake((token: string) => {
    if (token === 'validtoken') {
      return { id: 'validuserid' };
    }
    return false;
  });
  const middleware = authorizationMiddleware({
    tokenService,
  });

  this.middlewareRequest = {
    headers: this.requestHeaders,
  } as Request;
  this.middlewareResponse = {
    status: sinon.stub().returnsThis(),
    json: sinon.stub().returnsThis(),
  };
  this.middlewareNext = sinon.stub();

  middleware(
    this.middlewareRequest,
    this.middlewareResponse as unknown as Response,
    this.middlewareNext
  );
});

Then(
  'the middleware should return a {int} response',
  function (this: World, statusCode: number) {
    expect(this.middlewareResponse).to.be.an('object');
    expect(this.middlewareResponse?.status.calledWith(statusCode)).to.be.true;
  }
);

Then('the middleware should call the next handler', function (this: World) {
  expect(this.middlewareResponse?.status.called).to.be.false;
  expect(this.middlewareNext?.called).to.be.true;
});

Then(
  'the middleware should set the user property on the request',
  function (this: World) {
    expect(this.middlewareRequest?.user).to.be.an('object');
    expect(this.middlewareRequest?.user?.id).to.equal('validuserid');
  }
);
