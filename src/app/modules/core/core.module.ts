import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { ConnectionService } from '@core/services/connection.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    MatSnackBarModule
  ],
  declarations: [

  ],
  providers: [
    ConnectionService
  ]
})
export class CoreModule { }
