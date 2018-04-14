import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { UserService } from '@security/services/user.service';

@Component({
  selector: 'app-forgot-password',
  host: { 'class': 'view-component' },
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;

  constructor(private router: Router,
            private userService: UserService) { }

  ngOnInit() {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      ]),
    })
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const { email } = form.value;
      const navigationExtras: NavigationExtras = {
        queryParams: {
          email,
          hasError: false
        }
      };
      this.userService.restorePassword(email)
        .subscribe(
          value => {
            navigationExtras.queryParams.hasError = false;
            this.router.navigate(['/security/post-forgot-password'], navigationExtras);
          },
          error => {
            navigationExtras.queryParams.hasError = true;
            navigationExtras.queryParams.errorMessage = error.errMsg;
            this.router.navigate(['/security/post-forgot-password'], navigationExtras);
          }
        )
    }
  }
}
