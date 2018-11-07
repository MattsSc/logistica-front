import {Component, Inject, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {_} from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import {APP_CONFIG, AppConfig} from '../../../configs/app.config';
import {ProgressBarService} from '../../../core/services/progress-bar.service';
import {LocalStorage} from 'ngx-store';
import {Observable} from 'rxjs';
import {AuthService} from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  @LocalStorage() language = 'es';
  isLoggedIn$: Observable<boolean>;
  myAcc: any;
  dashboard: any;
  isAdmin: boolean;
  home: any;
  appConfig: any;
  progressBarMode: string;
  currentLang: string;

  constructor(@Inject(APP_CONFIG) appConfig: any,
              private progressBarService: ProgressBarService,
              private translateService: TranslateService,
              private authService: AuthService) {
    this.appConfig = appConfig;
  }

  ngOnInit() {
    this.currentLang = this.translateService.currentLang;
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.myAcc = {link: '/myAccount', name: _('myAcc')};
    this.dashboard = {link: '/admin', name: _('myAcc')};
    this.home = {link: '/', name: _('home')};
    this.isAdmin = this.authService.getToken() === 'admin';
    this.progressBarService.updateProgressBar$.subscribe((mode: string) => {
      this.progressBarMode = mode;
    });
  }

  changeLanguage(language: string): void {
    this.translateService.use(language).subscribe(() => {
      this.language = language;
    });
  }

  onLogout(): void {
    this.authService.logout();
  }
}
