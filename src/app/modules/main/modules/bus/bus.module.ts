import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusComponent } from './bus.component';
import { BusRouting } from './bus.routing';
import { BusListComponent } from './views/bus-list/bus-list.component';

@NgModule({
  imports: [
    BusRouting,
    CommonModule
  ],
  declarations: [BusComponent, BusListComponent]
})
export class BusModule { }
