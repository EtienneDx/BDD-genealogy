import { Given } from '@cucumber/cucumber';

Given('I am on the homepage route', function(route: string): void {
  this.setRoute(`/${route}`);
});