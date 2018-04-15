import { Routes, RouterModule } from '@angular/router';

import { SigninComponent } from '@security/auth/views/signin/signin.component';
import { NotFoundComponent } from '@security/auth/views/not-found/not-found.component';

const ROUTES: Routes = [
    { path: '', redirectTo: 'security/signin', pathMatch: 'full'},
    { path: '**', component: NotFoundComponent }
];

export const AppRouting = RouterModule.forRoot(ROUTES);