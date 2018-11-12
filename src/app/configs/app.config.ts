import {InjectionToken} from '@angular/core';

export let APP_CONFIG = new InjectionToken('app.config');

export const AppConfig: any = {
  routes: {
    heroes: 'heroes',
    error404: '404'
  },
  endpoints: {
    heroes: 'https://nodejs-example-app.herokuapp.com/heroes',
    login: 'https://logistica-uade-app.herokuapp.com/logistica/user/login',
    user: 'https://logistica-uade-app.herokuapp.com/logistica/user/',
    orders: 'https://logistica-uade-app.herokuapp.com/logistica/order/',
    movil: 'https://logistica-uade-app.herokuapp.com/logistica/movil/',
    delivery: 'https://logistica-uade-app.herokuapp.com/logistica/delivery/createList'
  }
};
