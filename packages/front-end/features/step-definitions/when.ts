import { When } from '@cucumber/cucumber';

When(
  'I click the {string} button',
  function(buttonText: string): void {
    const button: HTMLButtonElement =
      this.getButtonByText(buttonText);
    this.click(button);
  },
);
