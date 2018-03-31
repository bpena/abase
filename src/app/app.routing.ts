import { Routes, RouterModule } from '@angular/router';

import { SigninComponent } from '@security/views/signin/signin.component';

const ROUTES: Routes = [
    { path: '', redirectTo: 'main', pathMatch: 'full' },
    { path: 'main', loadChildren: './modules/main/main.module#MainModule' }
];

export const AppRouting = RouterModule.forRoot(ROUTES);