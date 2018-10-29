import {Component, OnInit, ViewChild} from '@angular/core';
import {Order} from '../../../core/models/Order';
import {UserService} from '../../../core/services/user/user.service';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';


@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
    ]
})


export class OrdersTableComponent implements OnInit {

  displayedColumns: string[] = ['ordenId', 'destinatario', 'fechaRecibido', 'fechaEntregado', 'estado'];
  dataSource:  MatTableDataSource<Order>;
  expandedElement: Order;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.getAllOrders();
  }

  private applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private getAllOrders(): void {
    this.userService.getOrders().subscribe(
      data => {
        this.dataSource = new MatTableDataSource<Order>(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error => {
        console.log('ALGO SE CAGO');
      }
    );
  }
}
