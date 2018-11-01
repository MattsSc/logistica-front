import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
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


export class OrdersTableComponent implements OnInit, OnChanges {

  displayedColumns: string[] = ['ordenId', 'destinatario', 'fechaRecibido', 'fechaEntregado', 'estado'];
  dataSource:  MatTableDataSource<Order>;
  expandedElement: Order;
  @Input() order: Order;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.getAllOrders();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("HOLA");
    // @ts-ignore
    if (changes.order.currentValue !== changes.order.previousValue) {
      console.log("HOLA2");
      // @ts-ignore
      console.log(JSON.stringify(changes.order.currentValue));
      this.getAllOrders();
    }
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
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
