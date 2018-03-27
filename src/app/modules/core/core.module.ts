import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { ConnectionService } from '@core/services/connection.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  declarations: [

  ],
  providers: [
    ConnectionService
  ]
})
export class CoreModule { }
