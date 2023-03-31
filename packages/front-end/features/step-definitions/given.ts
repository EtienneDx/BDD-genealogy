import { Given } from '@cucumber/cucumber';

Given('I am on the {string} route', function(route: string): void {
  this.setRoute(`/${route}`);
});