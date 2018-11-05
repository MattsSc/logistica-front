import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {fadeInOut} from '../../helpers/utils.helper';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder} from '@angular/forms';
import {Order} from '../../../core/models/Order';
import {OrderService} from '../../../core/services/order/order.service';
import * as _ from 'lodash';

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
  isUpdate: boolean;
  @Output() created: EventEmitter<Order> = new EventEmitter<Order>();


  constructor(
    public dialogRef: MatDialogRef<AddOrderFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private orderService: OrderService) {}

  ngOnInit() {
    // @ts-ignore
    this.orden = this.data ? _.cloneDeep(this.data.ordenModel) : new Order();
    // @ts-ignore
    this.isUpdate = this.data && this.data.ordenModel  ? true : false;

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.showError = false;
    if (!this.isUpdate) {
      this.createOrder();
    } else {
      this.updateOrder();
    }
  }

  private createOrder(): void {
    this.orderService.createOrder(this.orden).subscribe(
      data => {
        this.created.emit(this.orden);
        this.dialogRef.close();
      },
      error => {
        console.log('ALGO SE CAGO');
        this.formSubmitAttempt = true;
      }
    );
  }

  private updateOrder(): void {
    this.orderService.updateOrder(this.orden).subscribe(
      data => {
        this.created.emit(this.orden);
        this.dialogRef.close();
      },
      error => {
        console.log('ALGO SE CAGO');
        this.formSubmitAttempt = true;
      }
    );
  }

}
