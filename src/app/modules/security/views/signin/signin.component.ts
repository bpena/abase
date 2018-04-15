import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { AuthService } from '@security/services/auth.service';
import { Router } from '@angular/router';
import { User } from '@security/model/user';
import { Constants } from '@core/utils/constants';
import { SecurityLanguageService } from '@security/i18n/security-language.service';

@Component({
  selector: 'app-signin',
  host: { 'class': 'view-component' },
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  private currentLang = 'en';
  signinForm: FormGroup;

  constructor(private authService: AuthService,
            private i18n: SecurityLanguageService,
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

  changeLanguage() {
    this.currentLang = this.currentLang === 'en' ? 'es' : 'en';
    this.i18n.changeLanguage(this.currentLang);
  }
}
