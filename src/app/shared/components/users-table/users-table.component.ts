import {Component, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort, MatSnackBar, MatDialog, Sort} from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {User} from '../../../core/models/User';
import {UserService} from '../../../core/services/user/user.service';


@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
    ]
})


export class UsersTableComponent implements OnInit, OnChanges {

  displayedColumns: string[] = ['email', 'prefijo', 'estado', 'acciones'];
  dataSource:  MatTableDataSource<User>;
  sortedData: Array<User>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( public userService: UserService,
              public snackBar: MatSnackBar,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getAllMoviles();
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes(): void {
    this.dataSource.paginator = this.paginator;
  }

  sortData(sort: Sort) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'email': return this.compare(a.email, b.email, isAsc);
        case 'prefijo': return this.compare(a.prefix_file, b.prefix_file, isAsc);
        default: return 0;
      }
    });
    this.dataSource.data = this.sortedData;
  }

  private compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  private getAllMoviles(): void {
    this.userService.getUsers().subscribe(
      data => {
        this.dataSource = new MatTableDataSource<User>(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error => {
        console.log('ALGO SE CAGO');
      }
    );
  }
}
