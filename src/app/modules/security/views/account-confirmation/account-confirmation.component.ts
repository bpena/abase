import { Component, OnInit } from '@angular/core';
import { AuthService } from '@security/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '@security/model/user';

@Component({
  selector: 'app-account-confirmation',
  templateUrl: './account-confirmation.component.html',
  styleUrls: ['./account-confirmation.component.scss']
})
export class AccountConfirmationComponent implements OnInit {
  private hasError = false;
  private user: User;


  constructor(private activatedRouter: ActivatedRoute,
            private authService: AuthService,
            private router: Router) { }

  ngOnInit() {
    const activationHash = this.activatedRouter.snapshot.params.activationHash || 'empty';
    this.authService.activateAccount(activationHash)
      .subscribe(
        value => {
          this.hasError = false;
          this.user = value;
          console.log(value);
        },
        error => this.hasError = true
      )
    console.log(activationHash);
  }

}
