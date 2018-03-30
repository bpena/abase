import { Component, OnInit } from '@angular/core';
import { AuthService } from '@security/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
  isLogged: any;
  displayname = '';

  constructor(private authService: AuthService, private router: Router) {
    this.isLogged = this.authService.isLogged();
    this.authService.currentUser().subscribe(user => this.displayname = user ? user.displayname : '');
  }

  ngOnInit() {
  }

  logout() {
    this.authService.signout()
      .subscribe(value => this.router.navigateByUrl('/'));
  }
}
