import {Component, OnInit} from '@angular/core';
import {fadeInOut} from '../../helpers/utils.helper';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  animations: [fadeInOut]
})

export class LoginPageComponent implements OnInit {
  createAccToggle: boolean;
  createdAcc: boolean;

  constructor() {
    this.createAccToggle = false;
    this.createdAcc = false;
  }

  ngOnInit() {
  }

  createAcc() {
    this.createAccToggle = !this.createAccToggle;
  }

  userCreated(value: boolean) {
    if (value === true) {
      this.createdAcc = true;
      this.createAcc();
    }
  }
}
