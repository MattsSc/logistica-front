import {Component, OnInit} from '@angular/core';
import {Hero} from '../../../modules/heroes/shared/hero.model';
import {HeroService} from '../../../modules/heroes/shared/hero.service';
import {AppConfig} from '../../../configs/app.config';
import {fadeInOut} from '../../helpers/utils.helper';
import {AddOrderFormComponent} from '../../components/add-order-form/add-order-form.component';
import {MatDialog, MatSnackBar} from '@angular/material';
import {Order} from '../../../core/models/Order';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  animations: [fadeInOut]
})

export class HomePageComponent implements OnInit {

  showTable: boolean;
  order: Order;

  constructor(public dialog: MatDialog,
              public snackBar: MatSnackBar) {
    this.showTable = true;
  }

  ngOnInit() {
    this.order = new Order();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddOrderFormComponent, {
      width: '250px'
    });

    const sub = dialogRef.componentInstance.created.subscribe((orderCreated) => {
      this.order = orderCreated;
      this.snackBar.open('La orden ha sido creada', 'X', {
        duration: 4000,
      });
    });

    dialogRef.afterClosed().subscribe(() => {
      sub.unsubscribe();
    });
  }
}
