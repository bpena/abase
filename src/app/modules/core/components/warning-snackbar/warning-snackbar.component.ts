import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material';
import { WarningSnackbar } from '@core/components/warning-snackbar/warning-snackbar';

@Component({
  selector: 'app-warning-snackbar',
  templateUrl: './warning-snackbar.component.html',
  styleUrls: ['./warning-snackbar.component.scss']
})
export class WarningSnackbarComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: WarningSnackbar,
    private matSnackbarRef: MatSnackBarRef<WarningSnackbarComponent>) { }

  ngOnInit() {
  }

  close() {
    this.matSnackbarRef.dismiss();
  }
}
