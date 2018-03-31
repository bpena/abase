import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';

const ROUTES: Routes = [
    { path: 'bus', loadChildren: './modules/bus/bus.module#BusModule' }
];

export const MainRouting = RouterModule.forChild(ROUTES);