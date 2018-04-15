import { Component, OnInit } from '@angular/core';
import { AuthService } from '@security/auth/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '@security/user/model/user';
import { AuthI18NService } from '@security/auth/i18n/auth-i18n.service';

@Component({
  selector: 'app-account-confirmation',
  host: { 'class': 'view-component' },
  templateUrl: './account-confirmation.component.html',
  styleUrls: ['./account-confirmation.component.scss']
})
export class AccountConfirmationComponent implements OnInit {
  private hasError = false;
  private user: User;


  constructor(private activatedRouter: ActivatedRoute,
            private i18n: AuthI18NService,
            private authService: AuthService,
            private router: Router) { }

  ngOnInit() {
    const activationHash = this.activatedRouter.snapshot.params.activationHash || 'empty';
    this.authService.activateAccount(activationHash)
      .subscribe(
        value => {
          this.hasError = false;
          this.user = new User(value);
        },
        error => this.hasError = true
      )
    console.log(activationHash);
  }

}
