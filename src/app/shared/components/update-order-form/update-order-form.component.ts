import {Component, OnInit} from '@angular/core';
import {fadeInOut} from '../../helpers/utils.helper';
import {OrderService} from '../../../core/services/order/order.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-update-order-form',
  templateUrl: './update-order-form.component.html',
  styleUrls: ['./update-order-form.component.scss'],
  animations: [fadeInOut]
})


export class UpdateOrderFormComponent implements OnInit {
  formSubmitAttempt: boolean;
  form: FormGroup;
  submit: boolean;
  message: String;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.submit = false;
    this.message = null;
    this.form = this.fb.group({
      orden_id: ['', Validators.required],
      estado: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) { // {6}
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    this.message = null;
    if (this.form.valid) {
      this.submit = true;
      this.orderService.updateOrder(this.form.value).subscribe(
        data => {
          console.log('vamos');
          this.message = 'Orden actualizada';
          this.submit = false;
        },
        error => {
          if(error.status === 423)
            this.message = 'La orden no puede volver a estado anterior.';
          else
            this.message = 'Hubo un error, intente mas tarde';
          this.submit = false;
        }
      );
    }
  }
}
