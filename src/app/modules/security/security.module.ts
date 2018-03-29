import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { SecurityComponent } from './security.component';
import { SecurityRouting } from './security.routing';
import { SigninComponent } from './views/signin/signin.component';
import { SignupComponent } from './views/signup/signup.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    SecurityRouting
  ],
  declarations: [
    SigninComponent,
    SecurityComponent,
    SignupComponent
  ]
})
export class SecurityModule { }
