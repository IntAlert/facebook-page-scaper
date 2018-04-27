# Scraper Admin

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.7.

http://alert-dialogger.s3-website-eu-west-1.amazonaws.com/

## To Do:
- create export CSV endpoint
- make export button
- Reation summary always NONE?
- show that deleted
- link profile pics
- post reaction summary
- post export
- get reach?
- password

## Nice to have
- Add tagging




## Deploy
```aws s3 cp ./dist s3://alert-dialogger --recursive --acl public-read --profile alert_fb_scraper```


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
