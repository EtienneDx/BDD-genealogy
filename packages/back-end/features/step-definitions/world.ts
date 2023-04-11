import { World, IWorldOptions } from '@cucumber/cucumber';
import { Express as ExpressApp } from 'express-serve-static-core';
import supertest from 'supertest';
import neo4j, { Driver } from 'neo4j-driver';
import sinon from 'sinon';
import { DatabaseServiceImpl, UserProperties } from '../../src/entities';
import { Request } from 'express';

process.env['NODE_ENV'] = 'test';

interface WorldParameters {
  'mock-database'?: boolean;
}

export default class MyWorld extends World<WorldParameters> {
  app?: ExpressApp;
  response?: supertest.Response;
  databaseDriver: Driver;
  mockDatabaseService?: sinon.SinonStubbedInstance<DatabaseServiceImpl>;
  idCounter = 0;
  user?: UserProperties;
  requestHeaders: Record<string, string> = {};
  middlewareRequest?: Request;
  middlewareResponse?: {
    status: sinon.SinonStub;
    json: sinon.SinonStub;
  };
  middlewareNext?: sinon.SinonStub;

  constructor(options: IWorldOptions<WorldParameters>) {
    super(options);
    if (this.parameters['mock-database'] === true) {
      this.databaseDriver = sinon.createStubInstance(Driver);
    } else {
      this.databaseDriver = neo4j.driver('bolt://localhost:7687');
    }
  }
}
