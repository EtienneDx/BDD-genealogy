import { Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import World from './world';

Then('I should see a {int} status code', function (this: World, statusCode: number) {
  expect(this.response).not.to.be.undefined;
  expect(this.response?.status).to.equal(statusCode);
});
Then('I should see a {string} content type', function (this: World, contentType: string) {
  expect(this.response).not.to.be.undefined;
  expect(this.response?.type).to.equal(contentType);
});
Then('I should see a {string} field containing {string}', function (this: World, field: string, value: string) {
  expect(this.response).not.to.be.undefined;
  expect(this.response?.body[field]).to.equal(value);
});
