import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { PasswordValidation } from '@core/utils/validators/password.validation';
import { AuthService } from '@security/services/auth.service';
import { Router, NavigationExtras } from '@angular/router';
import { User } from '@security/model/user';
import { Constants } from '@core/utils/constants';

@Component({
  selector: 'app-signup',
  host: { 'class': 'view-component' },
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(private authService: AuthService,
            private router: Router) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null, Validators.required),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      ]),
      firstname: new FormControl(),
      lastname: new FormControl()
    }, 
    PasswordValidation.MatchPassword)
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const { username, password, firstname, lastname, email } = form.value;
      const user: User = new User({
        username,
        password,
        firstname,
        lastname,
        email
      });
      
      this.authService.signup(user)
        .subscribe(
          value => {
            const urlRedirect = value.redirectTo || Constants.URL_AFTER_SIGNUP_SUCCESS;
            const navigationExtras: NavigationExtras = {
              queryParams: {
                user: JSON.stringify(new User(value)),
                hasError: false
              }
            };
            this.router.navigate([urlRedirect], navigationExtras);
          },
          error => console.log('signup ::: ', error)
        );
    }
  }
}
