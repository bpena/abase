import { Routes, RouterModule } from '@angular/router';
import { BusListComponent } from './views/bus-list/bus-list.component';
import { BusEditComponent } from './views/bus-edit/bus-edit.component';
import { BusComponent } from './bus.component';

const ROUTES: Routes = [
    { 
        path: '',
        component: BusComponent,
        children: [
            { path: 'list', component: BusListComponent },
            { path: 'new', component: BusEditComponent },
            { path: 'edit/:id', component: BusEditComponent }
        ]
    }
];

export const BusRouting = RouterModule.forChild(ROUTES);