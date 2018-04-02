import { Component, OnInit } from '@angular/core';
import { UserService } from '@security/services/user.service';
import { User } from '@security/model/user';

@Component({
  selector: 'app-user-list',
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
