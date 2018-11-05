import {Injectable, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { User } from '../../models/User';
import {AppConfig} from '../../../configs/app.config';
import {LoggerService} from '../logger.service';
import {tap} from 'rxjs/operators';
import * as moment from 'moment';
import {Order} from '../../models/Order';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class UserService {

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
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
    const httpOpts = Object.assign({}, this.httpOptions);
    // @ts-ignore
    httpOpts.responseType = 'Text';
    if (user.email !== '' && user.password !== '' ) {
      return this.http.post<any>(this.userUrl, user, httpOpts)
        .pipe(
          tap(() => {
            console.log('Cuenta creada');
          })
        );
    }
  }

  updateUser(user: User): Observable<any> {
    if (user.email !== '' && user.password !== '' ) {
      return this.http.put<any>(this.userUrl + this.authService.getToken(), user, this.getHttpOpts())
        .pipe(
          tap(() => {
            console.log('Cuenta editada');
          })
        );
    }
  }

  getUser(): Observable<any> {
    return this.http.get<any>(this.userUrl + this.authService.getToken(), this.getHttpOpts())
      .pipe(
        tap(() => {
          console.log('Obtuvo el user');
        })
      );
  }

  getOrders(): Observable<any> {
    const httpOpts = Object.assign({}, this.httpOptions);
    httpOpts.headers = httpOpts.headers.append('X-User', this.authService.getToken());

    return this.http.get(this.userUrl + this.authService.getToken() + '/orders' , httpOpts)
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

  getHttpOpts(): any {
    const httpOpts = Object.assign({}, this.httpOptions);
    httpOpts.headers = httpOpts.headers.append('X-User', this.authService.getToken());
    return httpOpts;
  }

}
