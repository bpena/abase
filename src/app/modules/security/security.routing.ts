import { Routes, RouterModule } from '@angular/router';
import { SecurityComponent } from './security.component';
import { SigninComponent } from '@security/views/signin/signin.component';
import { SignupComponent } from '@security/views/signup/signup.component';

const ROUTES: Routes = [
    {
        path: 'security',
        component: SecurityComponent,
        children: [
            { path: 'signin', component: SigninComponent },
            { path: 'signup', component: SignupComponent}
        ]
    }
];

export const SecurityRouting = RouterModule.forChild(ROUTES);