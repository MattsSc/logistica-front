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


  getHttpOpts(): any {
    const httpOpts = Object.assign({}, this.httpOptions);
    httpOpts.headers = httpOpts.headers.append('X-User', this.authService.getToken());
    return httpOpts;
  }
}
