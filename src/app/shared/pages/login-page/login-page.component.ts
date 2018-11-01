import {Component, OnInit} from '@angular/core';
import {fadeInOut} from '../../helpers/utils.helper';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  animations: [fadeInOut]
})

export class LoginPageComponent implements OnInit {
  createAccToggle: boolean;
  createdAcc: boolean;

  constructor(public snackBar: MatSnackBar) {
    this.createAccToggle = false;
    this.createdAcc = false;
  }

  ngOnInit() {
  }

  createAcc() {
    this.createAccToggle = !this.createAccToggle;
  }

  openSnackBar(message: string, isCreated: boolean) {
    if (isCreated) {
      this.createAcc();
      this.snackBar.open(message, 'Cerrar', {
        duration: 2000,
      });
    }
  }
}
