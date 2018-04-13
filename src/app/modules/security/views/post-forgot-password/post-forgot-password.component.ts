import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-forgot-password',
  host: { 'class': 'view-component' },
  templateUrl: './post-forgot-password.component.html',
  styleUrls: ['./post-forgot-password.component.scss']
})
export class PostForgotPasswordComponent implements OnInit {
  private hasError = false;
  private email: string;

  constructor(private activatedRouter: ActivatedRoute) {
  }

  ngOnInit() {
    this.hasError = JSON.parse(this.activatedRouter.snapshot.queryParams.hasError);
    this.email = this.activatedRouter.snapshot.queryParams.email;
    console.log(this.activatedRouter.snapshot.queryParams)
  }
}
