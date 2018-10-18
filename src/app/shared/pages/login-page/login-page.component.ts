import {Component, OnInit} from '@angular/core';
import {AppConfig} from '../../../configs/app.config';
import {fadeInOut} from '../../helpers/utils.helper';
import {AuthService} from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  animations: [fadeInOut]
})

export class LoginPageComponent implements OnInit {
  createAccToggle: boolean;

  constructor() {
    this.createAccToggle = false;
  }

  ngOnInit() {
  }

  createAcc() {
    this.createAccToggle = !this.createAccToggle;
  }
}
