import { Then } from '@cucumber/cucumber';
Then(
  'I expect to be on the {string} route',
  function(route: string): void {
    if (this.route !== route) {
      throw new Error(`
        Expected route: ${route}
        Received route: ${this.route}
      `);
    }
  },
);

Then(
  'I should see {string}',
  function(text: string): void {
    const element: HTMLElement = this.result.getByText(text, {exact: false});
    if (!element) {
      throw new Error(`Expected to find element with text: ${text}`);
    }
  },
);