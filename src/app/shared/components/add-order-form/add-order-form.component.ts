import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {fadeInOut} from '../../helpers/utils.helper';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-add-order-form',
  templateUrl: './add-order-form.component.html',
  styleUrls: ['./add-order-form.component.scss'],
  animations: [fadeInOut]
})

export class AddOrderFormComponent implements OnInit {
  form: FormGroup;
  login: boolean;
  showError: boolean;
  private formSubmitAttempt: boolean;


  constructor(
    public dialogRef: MatDialogRef<AddOrderFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      domicilio: ['', Validators.required],
      localidad: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      peso: ['', Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
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
      console.log("Aleluya");
    }
    this.formSubmitAttempt = true;

    this.dialogRef.close();
  }

}
