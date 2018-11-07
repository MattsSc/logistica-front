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
export class MovilService {

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {
    this.movilUrl = AppConfig.endpoints.movil;
  }

  private movilUrl: string;

  private static handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      LoggerService.log(`${operation} failed: ${error.message}`);

      if (error.status >= 500) {
        throw error;
      }

      return of(result as T);
    };
  }

  getMoviles(): Observable<any> {
    return this.http.get(this.movilUrl, this.httpOptions)
      .pipe(
        tap(() => {
          console.log('Obteniendo Moviles');
        })
      );
  }

  deleteMovil(movId: string): Observable<any> {
    return this.http.delete(this.movilUrl + movId, this.getHttpOpts())
      .pipe(
        tap(() => {
          console.log('Eliminado Movil');
        })
      );
  }

  getHttpOpts(): any {
    const httpOpts = Object.assign({}, this.httpOptions);
    httpOpts.headers = httpOpts.headers.append('X-User', this.authService.getToken());
    return httpOpts;
  }
}
