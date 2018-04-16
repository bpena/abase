import { Component, OnInit } from '@angular/core';
import { User } from '@security/user/model/user';
import { ActivatedRoute } from '@angular/router';
import { AuthI18NService } from '@security/auth/i18n/auth-i18n.service';

@Component({
  selector: 'app-post-signup',
  host: { 'class': 'view-component' },
  templateUrl: './post-signup.component.html',
  styleUrls: ['./post-signup.component.scss']
})
export class PostSignupComponent implements OnInit {
  private hasError = false;
  private user: User;

  constructor(private activatedRouter: ActivatedRoute,
            private i18n: AuthI18NService) {
  }

  ngOnInit() {
    this.hasError = this.activatedRouter.snapshot.queryParams.hasError;
    this.user = new User(JSON.parse(this.activatedRouter.snapshot.queryParams.user));
  }

}
