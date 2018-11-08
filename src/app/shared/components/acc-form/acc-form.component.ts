import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {fadeInOut} from '../../helpers/utils.helper';
import {UserService} from '../../../core/services/user/user.service';
import {User} from '../../../core/models/User';

@Component({
  selector: 'app-acc-form',
  templateUrl: './acc-form.component.html',
  styleUrls: ['./acc-form.component.scss'],
  animations: [fadeInOut]
})



export class AccFormComponent implements OnInit {
  isUpdate: boolean;
  formSubmitAttempt: boolean;
  user: User;
  @Input() userModel: User;
  @Input() admin: boolean;
  @Output() created: EventEmitter<User> = new EventEmitter<User>();


  constructor(
    private userService: UserService
  ) {}

  ngOnInit() {
    this.user = this.userModel ? this.userModel : new User();
    this.admin = this.admin || false;
    this.isUpdate = !!this.userModel;
  }

  onSubmit() {
    !this.isUpdate ? this.createUser() : this.updateUser();
  }

  private createUser(): void {
    this.userService.createUser(this.user).subscribe(
      data => {
        this.created.emit(this.user);
      },
      error => {
        console.log('ALGO SE CAGO');
        this.formSubmitAttempt = true;
      }
    );
  }

  private updateUser(): void {
    this.userService.updateUser(this.user).subscribe(
      data => {
        this.created.emit(this.user);
      },
      error => {
        console.log('ALGO SE CAGO');
        this.formSubmitAttempt = true;
      }
    );
  }
}
