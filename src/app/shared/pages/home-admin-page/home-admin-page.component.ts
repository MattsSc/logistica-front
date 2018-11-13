import {Component, OnInit} from '@angular/core';
import {fadeInOut} from '../../helpers/utils.helper';
import {MatDialog, MatSnackBar} from '@angular/material';
import {AddMovilFormComponent} from '../../components/add-movil-form/add-movil-form.component';
import {Movil} from '../../../core/models/Movil';
import {User} from '../../../core/models/User';
import {AccFormComponent} from '../../components/acc-form/acc-form.component';
import {DeliveryService} from '../../../core/services/delivery/delivery.service';

@Component({
  selector: 'app-home-admin-page',
  templateUrl: './home-admin-page.component.html',
  styleUrls: ['./home-admin-page.component.scss'],
  animations: [fadeInOut]
})

export class HomeAdminPageComponent implements OnInit {

  showTable: boolean;
  movil: Movil;
  user: User;
  message: String;
  showMsg: boolean;

  constructor(public dialog: MatDialog,
              public snackBar: MatSnackBar,
              public deliveryService: DeliveryService) {
    this.showTable = true;
  }

  ngOnInit() {
    this.movil = new Movil();
    this.showMsg = false;
  }

  openMovilDialog(): void {
    const dialogRef = this.dialog.open(AddMovilFormComponent, {
      width: '400px'
    });

    const sub = dialogRef.componentInstance.created.subscribe((newMovil) => {
      this.movil = newMovil;
      this.snackBar.open('El movil ha sido creado', 'X', {
        duration: 4000,
      });
    });

    dialogRef.afterClosed().subscribe(() => {
      sub.unsubscribe();
    });
  }

  createDeliveredList(): void {
    this.showMsg = false;
    this.deliveryService.createDeliveredList().subscribe(
      data => {
        this.message = 'Archivo generado y guardado';
        this.showMsg = true;
      },
      error => {
        this.message = 'Hubo un error';
        this.showMsg = true;
      }
    );
  }

  createRoutesFile(): void {
    this.showMsg = false;
    this.deliveryService.createRoutesFile().subscribe(
      data => {
        console.log('');
      },
      error => {
        console.log('');
      }
    );
  }

  openUserDialog(): void {
    const dialogRef = this.dialog.open(AccFormComponent, {
      width: '1200px'
    });

    const instance = dialogRef.componentInstance;
    instance.admin = true;

    const sub = instance.created.subscribe((userUpdated) => {
      dialogRef.close();
      this.user = userUpdated;
      this.snackBar.open('El usuario ' +  userUpdated.nombre + ' ha sido actualizado', 'X', {
        duration: 4000,
      });
    });

    dialogRef.afterClosed().subscribe(() => {
      sub.unsubscribe();
    });
  }
}
