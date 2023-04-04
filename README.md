# README

## Understand this workspace

This workspace is an [Nx](https://nx.dev) monorepo. It contains multiple apps and libraries.

Our specific worspace holds two projects:
- `front-end`: A React typescript application holding the view part of the application
- `back-end`: An express-js typescript application holding the business logic of the application

## Installation

After cloning the repository, run `npm ci` (clean install) to install all dependencies with the persisted versions.

To run the front-end, you can use the Nx cli: `npx nx serve front-end --configuration=development`
To run the back-end, you can use the Nx cli: `npx nx serve back-end --configuration=development`

## Behavior driven development

This project uses cucumber for behavior driven development. The feature files for the front-end are located in the `front-end` project under `packages/front-end/src/features`. The step definitions are located in `packages/front-end/src/features/step_definitions`. The step definitions are written in typescript.

The feature files are written in Gherkin. The Gherkin syntax is described [here](https://cucumber.io/docs/gherkin/reference/). These feature files are then used by cucumber to run tests on the application.

To run the cucumber tests, you can use the Nx cli: `npx nx bdd front-end` and `npx nx bdd back-end`

## Running unit tests

Run `npx nx test front-end` to run the unit tests for the front-end.

Run `npx nx test back-end` to run the unit tests for the back-end.

## Starting the apps

Run `npx nx start front-end` to start the front-end.

Run `npx nx start back-end` to start the back-end.

The back end uses a neo4j database. You can start it using docker-compose with the following command: `docker-compose up`

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.
