import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatMenuModule, MatListModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from '@security/views/signup/signup.component';
import { SecurityRouting } from '@security/security.routing';
import { SigninComponent } from '@security/views/signin/signin.component';
import { SecurityComponent } from '@security/security.component';
import { AuthService } from '@security/services/auth.service';
import { UserMenuComponent } from '@security/views/user-menu/user-menu.component';
import { UserListComponent } from '@security/views/user-list/user-list.component';
import { UserService } from '@security/services/user.service';
import { AuthGuard } from '@security/services/auth.guard';
import { AccountConfirmationComponent } from './views/account-confirmation/account-confirmation.component';
import { PostSignupComponent } from './views/post-signup/post-signup.component';
import { NotFoundComponent } from './views/not-found/not-found.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    ReactiveFormsModule,
    SecurityRouting
  ],
  declarations: [
    SigninComponent,
    SecurityComponent,
    SignupComponent,
    UserMenuComponent,
    UserListComponent,
    AccountConfirmationComponent,
    PostSignupComponent,
    NotFoundComponent
  ],
  exports: [
    UserMenuComponent
  ],
  providers: [
    AuthGuard,
    AuthService,
    UserService
  ]
})
export class SecurityModule { }
