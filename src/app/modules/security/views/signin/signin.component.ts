import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '@security/services/auth.service';
import { Router } from '@angular/router';

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

  onSubmit() {
    this.authService.signin()
      .subscribe(
        value => {
          console.log(value);
          this.router.navigateByUrl('/security/signup');
        },
        error => console.log('signin ::: ', error)
      );
  }
}
