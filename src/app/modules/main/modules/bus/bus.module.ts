import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusListComponent } from '@bus/views/bus-list/bus-list.component';
import { BusRouting } from '@bus/bus.routing';
import { BusComponent } from '@bus/bus.component';
import { MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatGridListModule, MatListModule } from '@angular/material';
import { BusEditComponent } from '@bus/views/bus-edit/bus-edit.component';
import { BusService } from '@bus/services/bus.service';
import { CoreModule } from '@core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BusDetailComponent } from './views/bus-detail/bus-detail.component';

@NgModule({
  imports: [
    BusRouting,
    CommonModule,
    CoreModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
  ],
  declarations: [ 
    BusComponent,
    BusListComponent,
    BusEditComponent,
    BusDetailComponent
  ],
  providers: [
    BusService
  ]
})
export class BusModule { }
