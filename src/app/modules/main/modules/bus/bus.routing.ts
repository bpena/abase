import { Routes, RouterModule } from '@angular/router';
import { BusListComponent } from '@bus/views/bus-list/bus-list.component';
import { BusEditComponent } from '@bus/views/bus-edit/bus-edit.component';
import { BusComponent } from '@bus/bus.component';
import { BusDetailComponent } from '@bus/views/bus-detail/bus-detail.component';

const ROUTES: Routes = [
    { 
        path: '',
        component: BusComponent,
        children: [
            { path: 'list', component: BusListComponent },
            { path: 'new', component: BusEditComponent },
            { path: 'edit/:id', component: BusEditComponent },
            { path: ':id', component: BusDetailComponent }
        ]
    }
];

export const BusRouting = RouterModule.forChild(ROUTES);