import {Component, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort, MatSnackBar, MatDialog, Sort} from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Movil} from '../../../core/models/Movil';
import {MovilService} from '../../../core/services/movil/movil.service';


@Component({
  selector: 'app-moviles-table',
  templateUrl: './moviles-table.component.html',
  styleUrls: ['./moviles-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
    ]
})


export class MovilesTableComponent implements OnInit {

  displayedColumns: string[] = ['patente', 'conductor', 'capacidad', 'acciones'];
  dataSource:  MatTableDataSource<Movil>;
  sortedData: Array<Movil>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private movilService: MovilService,
              public snackBar: MatSnackBar,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getAllMoviles();
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
        case 'patente': return this.compare(a.patente, b.patente, isAsc);
        case 'conductor': return this.compare(a.nombre, b.nombre, isAsc);
        case 'capacidad': return this.compare(a.peso, b.peso, isAsc);
        default: return 0;
      }
    });
    this.dataSource.data = this.sortedData;
  }

  deleteMovil(movilId: string): void {
    this.movilService.deleteMovil(movilId).subscribe(
      data => {
        this.openSnackBar('El movil se ha eliminado');
        this.getAllMoviles();
      },
      error => {
        console.log('ALGO SE CAGO');
      }
    );
  }

  private openSnackBar(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 5000,
    });
  }

  private compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  private getAllMoviles(): void {
    this.movilService.getMoviles().subscribe(
      data => {
        this.dataSource = new MatTableDataSource<Movil>(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error => {
        console.log('ALGO SE CAGO');
      }
    );
  }
}
