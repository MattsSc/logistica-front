import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { User } from '../../models/User';
import {AppConfig} from '../../../configs/app.config';
import {LoggerService} from '../logger.service';
import {tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class UserService {

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userUrl = AppConfig.endpoints.user;
  }

  private userUrl: string ;

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
          tap(() => {
            console.log('Cuenta creada');
          })
        );
    }
  }
}
