import {Component, OnInit} from '@angular/core';
import {Hero} from '../../../modules/heroes/shared/hero.model';
import {HeroService} from '../../../modules/heroes/shared/hero.service';
import {AppConfig} from '../../../configs/app.config';
import {fadeInOut} from '../../helpers/utils.helper';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  animations: [fadeInOut]
})

export class LoginPageComponent implements OnInit {
  form: FormGroup;
  login: boolean;
  showError: boolean;
  private formSubmitAttempt: boolean; // {2}

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.login = true;
    this.showError = false;
  }

  ngOnInit() {
    this.form = this.fb.group({     // {5}
      username: ['', Validators.required],
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
