import { Routes, RouterModule } from '@angular/router';
import { SecurityComponent } from './security.component';
import { SigninComponent } from '@security/auth/views/signin/signin.component';
import { SignupComponent } from '@security/auth/views/signup/signup.component';
import { UserListComponent } from '@security/user/views/user-list/user-list.component';
import { AuthGuard } from '@security/auth/services/auth.guard';
import { AccountConfirmationComponent } from '@security/auth/views/account-confirmation/account-confirmation.component';
import { PostSignupComponent } from '@security/auth/views/post-signup/post-signup.component';
import { ForgotPasswordComponent } from '@security/auth/views/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from '@security/auth/views/reset-password/reset-password.component';
import { PostResetPasswordComponent } from '@security/auth/views/post-reset-password/post-reset-password.component';
import { PostForgotPasswordComponent } from '@security/auth/views/post-forgot-password/post-forgot-password.component';

const ROUTES: Routes = [
    {
        path: 'security',
        component: SecurityComponent,
        children: [
            { path: 'signin', component: SigninComponent },
            { path: 'signup', component: SignupComponent },
            { path: 'account-activation/:activationHash', component: AccountConfirmationComponent },
            { path: 'post-signup', component: PostSignupComponent },
            { path: 'user/list', component: UserListComponent, canActivate: [AuthGuard] },
            { path: 'forgot-password', component: ForgotPasswordComponent },
            { path: 'post-forgot-password', component: PostForgotPasswordComponent },
            { path: 'password/reset/:hash', component: ResetPasswordComponent },
            { path: 'post-reset-password', component: PostResetPasswordComponent }
        ]
    }
];

export const SecurityRouting = RouterModule.forChild(ROUTES);