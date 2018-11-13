import {Injectable} from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {AppConfig} from '../../../configs/app.config';
import {LoggerService} from '../logger.service';
import {tap} from 'rxjs/operators';

@Injectable()
export class DeliveryService {

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.deliveryUrl = AppConfig.endpoints.delivery;
    this.orderFileUrl = AppConfig.endpoints.order;
  }

  private deliveryUrl: string ;
  private orderFileUrl: string;

  private static handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      LoggerService.log(`${operation} failed: ${error.message}`);

      if (error.status >= 500) {
        throw error;
      }

      return of(result as T);
    };
  }

  getRoutesUrl(): String {
    return this.orderFileUrl;
  }

  createDeliveredList(): Observable<any> {
    return this.http.post<any>(this.deliveryUrl, this.httpOptions)
      .pipe(
        tap(() => {
          console.log('Se creo la lista');
        })
      );
  }

  createRoutesFile(): Observable<any> {
    return this.http.get<any>(this.orderFileUrl);
  }
}
