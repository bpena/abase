import { Routes, RouterModule } from '@angular/router';

import { SigninComponent } from '@security/views/signin/signin.component';

const ROUTES: Routes = [
    { path: '', redirectTo: 'signin', pathMatch: 'full'},
    { path: 'signin', component: SigninComponent }
];

export const AppRouting = RouterModule.forRoot(ROUTES);