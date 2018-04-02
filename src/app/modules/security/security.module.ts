import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatMenuModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from '@security/views/signup/signup.component';
import { SecurityRouting } from '@security/security.routing';
import { SigninComponent } from '@security/views/signin/signin.component';
import { SecurityComponent } from '@security/security.component';
import { AuthService } from '@security/services/auth.service';
import { UserMenuComponent } from '@security/views/user-menu/user-menu.component';
import { UserListComponent } from '@security/views/user-list/user-list.component';
import { UserService } from '@security/services/user.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    ReactiveFormsModule,
    SecurityRouting
  ],
  declarations: [
    SigninComponent,
    SecurityComponent,
    SignupComponent,
    UserMenuComponent,
    UserListComponent
  ],
  exports: [
    UserMenuComponent
  ],
  providers: [
    AuthService,
    UserService
  ]
})
export class SecurityModule { }
