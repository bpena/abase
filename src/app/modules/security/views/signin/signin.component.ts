import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { AuthService } from '@security/services/auth.service';
import { Router } from '@angular/router';
import { User } from '@security/model/user';
import { Constants } from '@core/utils/constants';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;

  constructor(private authService: AuthService,
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
