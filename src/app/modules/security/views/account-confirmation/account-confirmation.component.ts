import { Component, OnInit } from '@angular/core';
import { AuthService } from '@security/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account-confirmation',
  templateUrl: './account-confirmation.component.html',
  styleUrls: ['./account-confirmation.component.scss']
})
export class AccountConfirmationComponent implements OnInit {
  constructor(private activatedRouter: ActivatedRoute,
            private authService: AuthService,
            private router: Router) { }

  ngOnInit() {
    const activationHash = this.activatedRouter.snapshot.params.activationHash || 'empty';
    this.authService.activateAccount(activationHash).subscribe(value => console.log(value))
    console.log(activationHash);
  }

}
