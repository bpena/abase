import { Routes, RouterModule } from '@angular/router';
import { SecurityComponent } from './security.component';
import { SigninComponent } from '@security/views/signin/signin.component';
import { SignupComponent } from '@security/views/signup/signup.component';
import { UserListComponent } from '@security/views/user-list/user-list.component';
import { AuthGuard } from '@security/services/auth.guard';
import { AccountConfirmationComponent } from '@security/views/account-confirmation/account-confirmation.component';
import { PostSignupComponent } from '@security/views/post-signup/post-signup.component';
import { ForgotPasswordComponent } from '@security/views/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from '@security/views/reset-password/reset-password.component';
import { PostResetPasswordComponent } from '@security/views/post-reset-password/post-reset-password.component';
import { PostForgotPasswordComponent } from '@security/views/post-forgot-password/post-forgot-password.component';

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