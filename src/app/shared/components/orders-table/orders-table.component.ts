import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {Order} from '../../../core/models/Order';
import {UserService} from '../../../core/services/user/user.service';
import {MatPaginator, MatTableDataSource, MatSort, MatSnackBar, MatDialog} from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {OrderService} from '../../../core/services/order/order.service';
import {AddOrderFormComponent} from '../add-order-form/add-order-form.component';


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

  displayedColumns: string[] = ['ordenId', 'destinatario', 'fechaRecibido', 'fechaEntregado', 'direccion', 'estado', 'acciones'];
  dataSource:  MatTableDataSource<Order>;
  @Input() order: Order;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService,
              private orderService: OrderService,
              public snackBar: MatSnackBar,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getAllOrders();
  }

  ngOnChanges(changes: SimpleChanges) {
    // @ts-ignore
    if (changes.order.currentValue !== changes.order.previousValue) {
      // @ts-ignore
      console.log(JSON.stringify(changes.order.currentValue));
      this.getAllOrders();
    }
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  deleteOrder(ordenId): void {
    this.orderService.deleteOrder(ordenId).subscribe(
      data => {
        console.log('Orden eliminada');
        this.dataSource.data.filter(ord => ord.orden_id !== ordenId);
        this.openSnackBar('La orden se ha eliminado');
      },
      error => {
        this.openSnackBar('Ha ocurrido un inconveniente');
      }
    );
  }

  editOrder(orden: Order): void {
    const dialogRef = this.dialog.open(AddOrderFormComponent,
      {
        // @ts-ignore
        data: { ordenModel: orden},
        width: '400px'
      });

    const sub = dialogRef.componentInstance.created.subscribe((orderCreated) => {
      this.getAllOrders();
      this.openSnackBar('La orden ' + orden.orden_id + ' se ha actualizado.');
    });

    dialogRef.afterClosed().subscribe(() => {
      sub.unsubscribe();
    });
  }

  setDataSourceAttributes(): void {
    this.dataSource.paginator = this.paginator;
  }

  private openSnackBar(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 5000,
    });
  }

  private applyFilter(filterValue: string): void {
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
