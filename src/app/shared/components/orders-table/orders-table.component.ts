import {Component, OnInit} from '@angular/core';
import {Order} from '../../../core/models/Order';
import {UserService} from '../../../core/services/user/user.service';


@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss']
})


export class OrdersTableComponent implements OnInit {

  displayedColumns: string[] = ['ordenId', 'fechaRecibido', 'fechaEntregado', 'estado'];
  dataSource: Order[];

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.getAllOrders();
  }

  private getAllOrders(): void {
    this.userService.getOrders().subscribe(
      data => {
        this.dataSource = data;
      },
      error => {
        console.log('ALGO SE CAGO');
      }
    );
  }
}
