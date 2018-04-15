import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { AuthService } from '@security/auth/services/auth.service';
import { Router } from '@angular/router';
import { User } from '@security/user/model/user';
import { Constants } from '@core/utils/constants';
import { AuthI18NService } from '@security/auth/i18n/auth-i18n.service';

@Component({
  selector: 'app-signin',
  host: { 'class': 'view-component' },
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;

  constructor(private authService: AuthService,
            private i18n: AuthI18NService,
            private router: Router) { }

  ngOnInit() {
    this.signinForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const { username, password } = form.value;
      const user: User = new User({ username: username, password: password });
      
      this.authService.signin(user)
        .subscribe(
          value => {
            const urlRedirect = value.redirectTo || localStorage.getItem('urlRedirect') || Constants.URL_AFTER_LOGIN_SUCCESS;
            this.router.navigateByUrl(urlRedirect);
          },
          error => console.log('signin ::: ', error)
        );
    }
  }
}
