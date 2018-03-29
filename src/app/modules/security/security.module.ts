import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from '@security/views/signup/signup.component';
import { SecurityRouting } from '@security/security.routing';
import { SigninComponent } from '@security/views/signin/signin.component';
import { SecurityComponent } from '@security/security.component';
import { AuthService } from '@security/services/auth.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    SecurityRouting
  ],
  declarations: [
    SigninComponent,
    SecurityComponent,
    SignupComponent
  ],
  providers: [
    AuthService
  ]
})
export class SecurityModule { }
