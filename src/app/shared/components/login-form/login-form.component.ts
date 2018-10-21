import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {fadeInOut} from '../../helpers/utils.helper';
import {AuthService} from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  animations: [fadeInOut]
})

export class LoginFormComponent implements OnInit {
  form: FormGroup;
  login: boolean;
  showError: boolean;
  private formSubmitAttempt: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.login = true;
    this.showError = false;
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) { // {6}
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    this.showError = false;
    if (this.form.valid) {
      this.login = false;
      const result = this.authService.login(this.form.value).subscribe(
        data => {
          this.login = false;
        },
        error => {
          this.login = !this.login;
          this.showError = true;
        }
      );
    }
    this.formSubmitAttempt = true;
  }
}
