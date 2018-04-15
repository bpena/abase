import { Component, OnInit } from '@angular/core';
import { User } from '@security/user/model/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-signup',
  host: { 'class': 'view-component' },
  templateUrl: './post-signup.component.html',
  styleUrls: ['./post-signup.component.scss']
})
export class PostSignupComponent implements OnInit {
  private hasError = false;
  private user: User;

  constructor(private activatedRouter: ActivatedRoute) {
  }

  ngOnInit() {
    this.hasError = this.activatedRouter.snapshot.queryParams.hasError;
    this.user = new User(JSON.parse(this.activatedRouter.snapshot.queryParams.user));
  }

}
