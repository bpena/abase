import { Routes, RouterModule } from '@angular/router';

import { SigninComponent } from '@security/views/signin/signin.component';

const ROUTES: Routes = [
    { path: '', redirectTo: 'main/bus/list', pathMatch: 'full' },
    { path: 'main', loadChildren: './modules/main/main.module#MainModule' },
    { path: '**', redirectTo: 'main/bus/list' }
];

export const AppRouting = RouterModule.forRoot(ROUTES);