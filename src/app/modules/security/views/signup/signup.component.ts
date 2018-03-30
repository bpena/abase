import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { PasswordValidation } from '@core/utils/validators/password.validation';
import { AuthService } from '@security/services/auth.service';
import { Router } from '@angular/router';
import { User } from '@security/model/user';

@Component({
  selector: 'app-signup',
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
      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required)
    }, 
    PasswordValidation.MatchPassword)
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const { username, password, firstname, lastname, email } = form.value;
      const user: User = {
        username,
        password,
        firstname,
        lastname,
        email
      };
      
      this.authService.signup(user)
        .subscribe(
          value => {
            console.log(value);
            this.router.navigateByUrl('/security/signup');
          },
          error => console.log('signup ::: ', error)
        );
    }
  }
}
