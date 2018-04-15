import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { ConnectionService } from '@core/services/connection.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { WarningSnackbarComponent } from './components/warning-snackbar/warning-snackbar.component';
import { MatIconModule, MatButtonModule } from '@angular/material';
import { ReplacePipe } from './i18n/pipes/replace.pipe';
import { I18NPipe } from './i18n/pipes/i18n.pipe';
import { I18NService } from '@core/i18n/service/i18n.service';
import { SelectLanguageComponent } from './i18n/components/select-language/select-language.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  declarations: [
    ReplacePipe,
    WarningSnackbarComponent,
    I18NPipe,
    SelectLanguageComponent
  ],
  exports: [
    ReplacePipe,
    WarningSnackbarComponent,
    I18NPipe,
    SelectLanguageComponent
  ]
  ,
  entryComponents: [
    WarningSnackbarComponent
  ],
  providers: [
    ConnectionService,
    I18NService
  ]
})
export class CoreModule { }
