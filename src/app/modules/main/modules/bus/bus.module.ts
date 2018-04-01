import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusListComponent } from '@bus/views/bus-list/bus-list.component';
import { BusRouting } from '@bus/bus.routing';
import { BusComponent } from '@bus/bus.component';
import { MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule } from '@angular/material';
import { BusEditComponent } from '@bus/views/bus-edit/bus-edit.component';
import { BusService } from '@bus/services/bus.service';
import { CoreModule } from '@core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    BusRouting,
    CommonModule,
    CoreModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  declarations: [ 
    BusComponent,
    BusListComponent,
    BusEditComponent
  ],
  providers: [
    BusService
  ]
})
export class BusModule { }
