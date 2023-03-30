import {
  SelectorMatcherOptions,
} from '@testing-library/react/pure';
import 'cucumber';
import { Location } from 'history';

declare module 'cucumber' {
  export interface World {
    click(element: HTMLElement): void;
    getButtonByText(text: string): HTMLButtonElement;
    getByText(
      text: string,
      options?: SelectorMatcherOptions,
    ): HTMLElement;
    getInputByLabel(label: string): HTMLInputElement;
    location: Location;
    setRoute(route: string): void;
    type(input: HTMLInputElement, value: string): void;
  }
}
