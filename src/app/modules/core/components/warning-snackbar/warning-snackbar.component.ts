import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material';
import { WarningSnackbar } from '@core/components/warning-snackbar/warning-snackbar';
import { WarningSnackbarType } from '@core/components/warning-snackbar/warning-snackbar-type.enum';

@Component({
  selector: 'app-warning-snackbar',
  templateUrl: './warning-snackbar.component.html',
  styleUrls: ['./warning-snackbar.component.scss']
})
export class WarningSnackbarComponent implements OnInit {
  private type: WarningSnackbarType;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: WarningSnackbar,
    private matSnackbarRef: MatSnackBarRef<WarningSnackbarComponent>) {
      this.type = data.type ? data.type : WarningSnackbarType.ERROR;
    }

  ngOnInit() {
  }

  close() {
    this.matSnackbarRef.dismiss();
  }
}
