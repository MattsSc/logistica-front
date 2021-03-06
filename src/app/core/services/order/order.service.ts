import {Injectable} from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {AppConfig} from '../../../configs/app.config';
import {LoggerService} from '../logger.service';
import {tap} from 'rxjs/operators';
import * as moment from 'moment';
import {Order} from '../../models/Order';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class OrderService {

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.orderUrl = AppConfig.endpoints.orders;
  }

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

  deleteOrder(orderId: String): Observable<any> {
    return this.http.delete(this.orderUrl + orderId, this.getHttpOpts())
      .pipe(
        tap(() => {
          console.log('Eliminando Orden');
        })
      );
  }

  createOrder(orden: Order): Observable<any> {
    const httpOpts = Object.assign({}, this.httpOptions);
    httpOpts.headers = httpOpts.headers.append('X-User', this.authService.getToken());
    return this.http.post(this.orderUrl, orden, httpOpts)
      .pipe(
        tap(() => {
          console.log('orden creada');
        })
      );
  }

  getOrders(): Observable<any> {
    const httpOpts = Object.assign({}, this.httpOptions);
    return this.http.get(this.orderUrl, httpOpts)
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

  updateOrder(orden: Order): Observable<any> {
    const httpOpts = Object.assign({}, this.httpOptions);
    httpOpts.headers = httpOpts.headers.append('X-User', this.authService.getToken());
    return this.http.patch(this.orderUrl + orden.orden_id, orden, httpOpts)
      .pipe(
        tap(() => {
          console.log('orden actualizada');
        })
      );
  }


  getHttpOpts(): any {
    const httpOpts = Object.assign({}, this.httpOptions);
    httpOpts.headers = httpOpts.headers.append('X-User', this.authService.getToken());
    return httpOpts;
  }
}
