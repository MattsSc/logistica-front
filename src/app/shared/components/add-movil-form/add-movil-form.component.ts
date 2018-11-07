import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {fadeInOut} from '../../helpers/utils.helper';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import * as _ from 'lodash';
import {Movil} from '../../../core/models/Movil';
import {MovilService} from '../../../core/services/movil/movil.service';

export interface DialogData {
  movilModel: Movil;
}

@Component({
  selector: 'app-add-movil-form',
  templateUrl: './add-movil-form.component.html',
  styleUrls: ['./add-movil-form.component.scss'],
  animations: [fadeInOut]
})

export class AddMovilFormComponent implements OnInit {
  login: boolean;
  showError: boolean;
  movil: Movil;
  formSubmitAttempt: boolean;
  isUpdate: boolean;
  @Output() created: EventEmitter<Movil> = new EventEmitter<Movil>();


  constructor(
    public dialogRef: MatDialogRef<AddMovilFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private movilService: MovilService) {}

  ngOnInit() {
    this.movil = this.data ? _.cloneDeep(this.data.movilModel) : new Movil();
    this.isUpdate = this.data && this.data.movilModel  ? true : false;

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.showError = false;
    if (!this.isUpdate) {
      this.createMovil();
    } else {
      this.updateMovil();
    }
  }

  private createMovil(): void {
    this.movilService.createMovil(this.movil).subscribe(
      data => {
        this.created.emit(this.movil);
        this.dialogRef.close();
      },
      error => {
        console.log('ALGO SE CAGO');
        this.formSubmitAttempt = true;
      }
    );
  }

  private updateMovil(): void {
    this.movilService.updateMovil(this.movil).subscribe(
      data => {
        this.created.emit(this.movil);
        this.dialogRef.close();
      },
      error => {
        console.log('ALGO SE CAGO');
        this.formSubmitAttempt = true;
      }
    );
  }

}
