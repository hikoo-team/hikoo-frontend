import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import {
  faPlus,
  faPaperclip
} from '@fortawesome/free-solid-svg-icons';

import { AlertEventDialogComponent } from '../alert-event-dialog/alert-event-dialog.component';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent implements OnInit {
  faPlus = faPlus;
  faPaperclip = faPaperclip;

  broadcastType = 'schedule';

  constructor(
    private dialogRef: MatDialogRef<AlertDialogComponent>,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  onEventSelectDialogOpen() {
    const dialogRef = this.dialog.open(AlertEventDialogComponent, {
      width: '70%',
      height: '80vh',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSave() {}

}
