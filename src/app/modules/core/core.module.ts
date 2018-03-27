import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { ConnectionService } from '@core/services/connection.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { WarningSnackbarComponent } from './components/warning-snackbar/warning-snackbar.component';
import { MatIconModule, MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  declarations: [
    WarningSnackbarComponent
  ],
  entryComponents: [
    WarningSnackbarComponent
  ],
  providers: [
    ConnectionService
  ]
})
export class CoreModule { }
