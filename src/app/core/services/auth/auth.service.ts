import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import { User } from '../../models/User';
import {AppConfig} from '../../../configs/app.config';
import {LoggerService} from '../logger.service';
import {catchError, tap} from 'rxjs/operators';
import {Hero} from '../../../modules/heroes/shared/hero.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class AuthService {

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.loginUrl = AppConfig.endpoints.login;
  }
  private loggedIn = new BehaviorSubject<boolean>(false);
  private loginUrl: string ;

  private static handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      LoggerService.log(`${operation} failed: ${error.message}`);

      if (error.status >= 500) {
        throw error;
      }

      return of(result as T);
    };
  }

  login(user: User): Observable<any> {
    if (user.username !== '' && user.password !== '' ) {
      return this.http.post<any>(this.loginUrl, user, httpOptions)
        .pipe(
          tap(() => {
            this.loggedIn.next(true);
            this.router.navigate(['/']); })
        );
    }
  }

  logout() {                            // {4}
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
