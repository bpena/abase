import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthI18NService } from '@security/auth/i18n/auth-i18n.service';

@Component({
  selector: 'app-post-forgot-password',
  host: { 'class': 'view-component' },
  templateUrl: './post-forgot-password.component.html',
  styleUrls: ['./post-forgot-password.component.scss']
})
export class PostForgotPasswordComponent implements OnInit {
  private hasError = false;
  private email: string;
  private errorMessage: string;

  constructor(private activatedRouter: ActivatedRoute,
            private i18n: AuthI18NService) { }

  ngOnInit() {
    this.hasError = JSON.parse(this.activatedRouter.snapshot.queryParams.hasError);
    this.email = this.activatedRouter.snapshot.queryParams.email;
    this.errorMessage = this.activatedRouter.snapshot.queryParams.errorMessage;
  }
}
