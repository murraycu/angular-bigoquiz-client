# AngularBigoquizClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Deploying to AppEngine

Run 'ng build --prod' then:
Run `gcloud app deploy`, assuming that the gcloud SDK has been configure correctly for the correct project, and that project is active.

This uses the app.yaml file.

## Deploying the project-wide Dispatch rules:

Run `gcloud app deploy dispatch.yaml`

This specifes the subdomain-to-service mappings for both the client (this project) and the server (go-bigoquiz-server).
TODO: Find a way to split the dispatch rules into two files, one in each project.
