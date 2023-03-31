import {
  RenderResult,
  SelectorMatcherOptions,
  act,
  render,
} from '@testing-library/react/pure';
import { World } from '@cucumber/cucumber';
import { Location } from 'history';
import React, { ComponentType, PropsWithChildren } from 'react';
import { MemoryRouter } from 'react-router';
import App from '../../src/app/app';
import { useLocation } from 'react-router-dom';
import { Readable } from 'stream';

interface WorldParams {
  attach(
    content: Buffer | string | Readable,
    mimeType?: string,
  ): Promise<void>;
  parameters: Record<string, unknown>;
}
export default class AppWorld implements World {
  private _location: Location = {
    key: 'initial',
    hash: '',
    pathname: '/',
    search: '',
    state: {},
  };
  private _result: null | RenderResult = null;
  private _route = '/';
  public attach: WorldParams['attach'];
  public parameters: WorldParams['parameters'];

  public constructor({ attach, parameters }: WorldParams) {
    this._RouterSpy = this._RouterSpy.bind(this);
    this.click = this.click.bind(this);
    this.getButtonByText = this.getButtonByText.bind(this);
    this.getByText = this.getByText.bind(this);
    this.render = this.render.bind(this);
    this.setRoute = this.setRoute.bind(this);
    this.attach = attach;
    this.parameters = parameters;
  }
  public log(message: string): void {
    this.attach(message, 'text/plain');
  }

  private _RouterSpy({
    children,
  }: PropsWithChildren<object>): JSX.Element {
    // rule shouldn't be applied, this is actually a function component
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const location = useLocation();
    if (this._location !== location) {
      this._location = location;
    }
    return children as JSX.Element;
  }

  private get result(): RenderResult {
    if (this._result) {
      return this._result;
    }
    this._result = this.render();
    return this._result;
  }

  public click(element: HTMLElement): void {
    act((): void => {
      element.click();
    });
  }

  public getButtonByText(text: string): HTMLButtonElement {
    return this.getByText(
      text,
      { selector: 'button' },
    ) as HTMLButtonElement;
  }

  public getByText(
    text: string,
    options?: SelectorMatcherOptions,
  ): HTMLElement {
    return this.result.getByText(text, options);
  }

  public get location(): Location {
    return this._location;
  }

  public get route(): string {
    return (
      this._location.pathname +
      this._location.search +
      this._location.hash
    );
  }

  public setRoute(route: string): void {
    console.log("setRoute", route)
    this._route = route;
  }
  
  public render(): RenderResult {
    const route: string = this._route;
    const RouterSpy: ComponentType<PropsWithChildren<object>> =
      this._RouterSpy;
    return render(
      <App />,
      {
        wrapper({ children }: PropsWithChildren<object>): JSX.Element {
          return (
            <MemoryRouter initialEntries={[route]} initialIndex={0}>
              <RouterSpy>
                {children}
              </RouterSpy>
            </MemoryRouter>
          );
        },
      },
    );
  }
}