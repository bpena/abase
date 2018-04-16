import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatMenuModule, MatListModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from '@security/auth/views/signup/signup.component';
import { SecurityRouting } from '@security/security.routing';
import { SigninComponent } from '@security/auth/views/signin/signin.component';
import { SecurityComponent } from '@security/security.component';
import { AuthService } from '@security/auth/services/auth.service';
import { UserMenuComponent } from '@security/user/views/user-menu/user-menu.component';
import { UserListComponent } from '@security/user/views/user-list/user-list.component';
import { UserService } from '@security/user/services/user.service';
import { AuthGuard } from '@security/auth/services/auth.guard';
import { AccountConfirmationComponent } from '@security/auth/views/account-confirmation/account-confirmation.component';
import { PostSignupComponent } from '@security/auth/views/post-signup/post-signup.component';
import { NotFoundComponent } from '@security/auth/views/not-found/not-found.component';
import { ForgotPasswordComponent } from '@security/auth/views/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from '@security/auth/views/reset-password/reset-password.component';
import { PostResetPasswordComponent } from '@security/auth/views/post-reset-password/post-reset-password.component';
import { PostForgotPasswordComponent } from '@security/auth/views/post-forgot-password/post-forgot-password.component';
import { CoreModule } from '@core/core.module';
import { AuthI18NService } from '@security/auth/i18n/auth-i18n.service';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
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
    NotFoundComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    PostResetPasswordComponent,
    PostForgotPasswordComponent
  ],
  exports: [
    UserMenuComponent
  ],
  providers: [
    AuthGuard,
    AuthI18NService,
    AuthService,
    UserService
  ]
})
export class SecurityModule { }
