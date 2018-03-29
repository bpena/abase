import { Routes, RouterModule } from '@angular/router';
import { SecurityComponent } from './security.component';
import { SigninComponent } from '@security/views/signin/signin.component';

const ROUTES: Routes = [
    {
        path: 'security',
        component: SecurityComponent,
        children: [
            { path: 'signin', component: SigninComponent }
        ]
    }
];

export const SecurityRouting = RouterModule.forChild(ROUTES);