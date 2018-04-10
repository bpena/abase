import { Routes, RouterModule } from '@angular/router';
import { SecurityComponent } from './security.component';
import { SigninComponent } from '@security/views/signin/signin.component';
import { SignupComponent } from '@security/views/signup/signup.component';
import { UserListComponent } from '@security/views/user-list/user-list.component';
import { AuthGuard } from '@security/services/auth.guard';
import { AccountConfirmationComponent } from '@security/views/account-confirmation/account-confirmation.component';
import { PostSignupComponent } from '@security/views/post-signup/post-signup.component';

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
        ]
    }
];

export const SecurityRouting = RouterModule.forChild(ROUTES);