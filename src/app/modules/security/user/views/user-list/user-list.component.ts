import { Component, OnInit } from '@angular/core';
import { UserService } from '@security/user/services/user.service';
import { User } from '@security/user/model/user';

@Component({
  selector: 'app-user-list',
  host: { 'class': 'view-component' },
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  loading: boolean = false;
  userList: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe(users => this.userList = users);
  }

}
