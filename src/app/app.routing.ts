import { Routes, RouterModule } from '@angular/router';

import { SigninComponent } from '@security/views/signin/signin.component';

const ROUTES: Routes = [
    { path: '', redirectTo: 'security/signin', pathMatch: 'full'}
];

export const AppRouting = RouterModule.forRoot(ROUTES);