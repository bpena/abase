import { Routes, RouterModule } from '@angular/router';
import { BusComponent } from './bus.component';
import { BusListComponent } from './views/bus-list/bus-list.component';

const ROUTES: Routes = [
    { 
        path: '',
        component: BusComponent,
        children: [
            { path: 'list', component: BusListComponent }
        ]
    }
];

export const BusRouting = RouterModule.forChild(ROUTES);