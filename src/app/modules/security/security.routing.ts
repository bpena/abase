import { Routes, RouterModule } from '@angular/router';
import { SecurityComponent } from './security.component';
import { SigninComponent } from '@security/views/signin/signin.component';
import { SignupComponent } from '@security/views/signup/signup.component';
import { UserListComponent } from '@security/views/user-list/user-list.component';
import { AuthGuard } from '@security/services/auth.guard';

const ROUTES: Routes = [
    {
        path: 'security',
        component: SecurityComponent,
        children: [
            { path: 'signin', component: SigninComponent },
            { path: 'signup', component: SignupComponent },
            { path: 'user/list', component: UserListComponent, canActivate: [AuthGuard] }
        ]
    }
];

export const SecurityRouting = RouterModule.forChild(ROUTES);