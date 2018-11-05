import {Component, OnInit} from '@angular/core';
import {fadeInOut} from '../../helpers/utils.helper';
import {User} from '../../../core/models/User';
import {UserService} from '../../../core/services/user/user.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-my-info-page',
  templateUrl: './my-info-page.component.html',
  styleUrls: ['./my-info-page.component.scss'],
  animations: [fadeInOut]
})

export class MyInfoPageComponent implements OnInit {

  user: User;

  constructor(private userService: UserService,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.getUser();
  }

  getUser(): void {
    this.userService.getUser().subscribe(
      data => {
        this.user = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  isUpdated(user: User) {
    this.snackBar.open(user.nombre + ' tus datos han sido actualizados!.', 'X', {
      duration: 4000,
    });
  }
}
