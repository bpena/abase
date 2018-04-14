import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { UserService } from '@security/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PasswordValidation } from '@core/utils/validators/password.validation';
import { User } from '@security/model/user';

@Component({
  selector: 'app-reset-password',
  host: { 'class': 'view-component' },
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  
  private hasError = false;
  private user: User;
  
  resetPasswordForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
            private router: Router,
            private userSservice: UserService) { }

  ngOnInit() {
    this.resetPasswordForm = new FormGroup({
        password: new FormControl(null, Validators.required),
        confirmPassword: new FormControl(null, Validators.required),
      }, 
      PasswordValidation.MatchPassword);
    
    const hash = this.activatedRoute.snapshot.params.hash;

    this.userSservice.validateResetHash(hash)
      .subscribe(
        response => {
          const { _id, username, firstname, lastname, email } = response;
          this.user = new User({ _id, username, firstname, lastname, email })
          this.hasError = false;
        },
        error => {
          this.hasError = true;
        }
      )
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.user.password = form.value.password;
      console.log(this.user);
      this.userSservice.updatePassword(this.user)
        .subscribe(value => this.router.navigateByUrl('/security/post-reset-password'))
    }
  }
}
