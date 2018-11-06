import {Injectable, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import { User } from '../../models/User';
import {AppConfig} from '../../../configs/app.config';
import {LoggerService} from '../logger.service';
import {tap} from 'rxjs/operators';
import {CookieService} from 'ngx-cookie-service';

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
    private http: HttpClient,
    private cookieService: CookieService
  ) {
    this.loginUrl = AppConfig.endpoints.login;
    this.existCookieSession();
  }


  private loggedIn = new BehaviorSubject<boolean>(false);
  private loginUrl: string;

  private static handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      LoggerService.log(`${operation} failed: ${error.message}`);

      if (error.status >= 500) {
        throw error;
      }

      return of(result as T);
    };
  }

  private existCookieSession(): void {
    if (this.cookieService.get('ravo_login')) {
      this.loggedIn.next(true);
      this.cookieService.get('ravo_login') === 'admin' ? this.router.navigate(['/admin']) : this.router.navigate(['/']);
    }
  }

  login(user: User): Observable<any> {
    if (user.email !== '' && user.password !== '') {
      return this.http.post<any>(this.loginUrl, user, httpOptions)
        .pipe(
          tap((res) => {
            console.log('Log ' + res);
            this.loggedIn.next(true);
            this.cookieService.set('ravo_login', res);
            if (res === 'admin') {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/']);
            }
          })
        );
    }
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
    this.cookieService.delete('ravo_login');
  }

  getToken() {
    return this.cookieService.get('ravo_login');
  }

}

