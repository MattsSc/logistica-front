import {InjectionToken} from '@angular/core';

export let APP_CONFIG = new InjectionToken('app.config');

export const AppConfig: any = {
  routes: {
    heroes: 'heroes',
    error404: '404'
  },
  endpoints: {
    heroes: 'http://nodejs-example-app.herokuapp.com/heroes',
    login: 'http://logistica-uade-app.herokuapp.com/logistica/user/login',
    user: 'http://logistica-uade-app.herokuapp.com/logistica/user/'
  },
  votesLimit: 3,
  topHeroesLimit: 4,
  snackBarDuration: 3000,
  repositoryURL: 'https://github.com/ismaestro/angular6-example-app'
};
