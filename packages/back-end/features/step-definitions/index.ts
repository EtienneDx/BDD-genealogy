import { Given, When, Then } from '@cucumber/cucumber';
import { Express as ExpressApp } from "express-serve-static-core";
import supertest from 'supertest';
import { expect } from 'chai';
import createApp from '../../src';

let app: ExpressApp;
let response: supertest.Response;

Given('a running app', async function () {
  app = createApp();
  return new Promise<void>((resolve, reject) => {
    app.listen(function(err: unknown) {
      if (err) { return reject(err); }
      resolve();
    });
  });
});

When('I visit {string}', async function (path: string) {
  response = await supertest(app)
    .get(path);
});

Then('I should see a {int} status code', function (statusCode: number) {
  expect(response.status).to.equal(statusCode);
});

Then('I should see a {string} content type', function (contentType: string) {
  expect(response.type).to.equal(contentType);
});

Then('I should see a {string} field containing {string}', function (field: string, value: string) {
  expect(response.body[field]).to.equal(value);
});