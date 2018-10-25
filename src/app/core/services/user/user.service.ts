import {Injectable, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { User } from '../../models/User';
import {AppConfig} from '../../../configs/app.config';
import {LoggerService} from '../logger.service';
import {tap} from 'rxjs/operators';
import * as moment from 'moment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class UserService{

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userUrl = AppConfig.endpoints.user;
    this.orderUrl = AppConfig.endpoints.orders;
  }

  private userUrl: string ;
  private orderUrl: string;

  private static handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      LoggerService.log(`${operation} failed: ${error.message}`);

      if (error.status >= 500) {
        throw error;
      }

      return of(result as T);
    };
  }

  createUser(user: User): Observable<any> {
    if (user.email !== '' && user.password !== '' ) {
      return this.http.post<any>(this.userUrl, user, httpOptions)
        .pipe(
          tap((data) => {
            console.log('Cuenta creada');
          })
        );
    }
  }

  getOrders(): Observable<any> {
    return this.http.get(this.orderUrl, httpOptions)
      .pipe(
        tap((orders) => {
          orders.forEach( order => {
            order.fecha_recibido = order.fecha_recibido ? moment(order.fecha_recibido, 'YYYY-MM-DD').format('DD - MM - YYYY') : null;
            order.fecha_entregado = order.fecha_entregado ? moment(order.fecha_entregado, 'YYYY-MM-DD').format('DD - MM - YYYY') : null;
          });
          console.log('Buscando las ordenes');
        })
      );
  }
}
