import { Component, OnInit } from '@angular/core';
import { AuthI18NService } from '@security/auth/i18n/auth-i18n.service';

@Component({
  selector: 'app-post-reset-password',
  host: { 'class': 'view-component' },
  templateUrl: './post-reset-password.component.html',
  styleUrls: ['./post-reset-password.component.scss']
})
export class PostResetPasswordComponent implements OnInit {

  constructor(private i18n: AuthI18NService) { }

  ngOnInit() {
  }

}
