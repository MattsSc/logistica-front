import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppConfig} from '../../../configs/app.config';
import {fadeInOut} from '../../helpers/utils.helper';
import {UserService} from '../../../core/services/user/user.service';

@Component({
  selector: 'app-create-acc-form',
  templateUrl: './create-acc-form.component.html',
  styleUrls: ['./create-acc-form.component.scss'],
  animations: [fadeInOut]
})

export class CreateAccFormComponent implements OnInit {
  form: FormGroup;
  showError: boolean;
  submitted: boolean;
  private formSubmitAttempt: boolean;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.showError = false;
    this.submitted = false;
  }

  ngOnInit() {
    this.form = this.fb.group({     // {5}
      email: ['', [Validators.required, Validators.email]],
      dni: ['', [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$')]],
      direccion: ['', Validators.required],
      localidad: ['', Validators.required],
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
    this.submitted = true;
    if (this.form.valid) {
      console.log(JSON.stringify(this.form.value));
      this.userService.createUser(this.form.value);
    }
    this.formSubmitAttempt = true;
  }
}
