import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {fadeInOut} from '../../helpers/utils.helper';
import {MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../core/services/user/user.service';
import {Order} from '../../../core/models/Order';

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
  login: boolean;
  showError: boolean;
  orden: Order;
  formSubmitAttempt: boolean;
  @Input() ordenModel: Order;


  constructor(
    public dialogRef: MatDialogRef<AddOrderFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private userService: UserService) {}

  ngOnInit() {
    // @ts-ignore
    this.orden = this.ordenModel || new Order();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.showError = false;
    console.log(JSON.stringify(this.orden));
/*    if (false) {
      this.userService.createOrder(this.form.value).subscribe(
        data => {
          console.log('Aleluya ' + data);
          this.dialogRef.close();
        },
        error => {
          console.log('ALGO SE CAGO');
          this.formSubmitAttempt = true;
        }
      );
    } else {
      this.formSubmitAttempt = true;
    }*/

  }

}
