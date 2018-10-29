import {Component, OnInit} from '@angular/core';
import {Hero} from '../../../modules/heroes/shared/hero.model';
import {HeroService} from '../../../modules/heroes/shared/hero.service';
import {AppConfig} from '../../../configs/app.config';
import {fadeInOut} from '../../helpers/utils.helper';
import {AddOrderFormComponent} from '../../components/add-order-form/add-order-form.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  animations: [fadeInOut]
})

export class HomePageComponent implements OnInit {

  animal: string;
  name: string;

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddOrderFormComponent, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}
