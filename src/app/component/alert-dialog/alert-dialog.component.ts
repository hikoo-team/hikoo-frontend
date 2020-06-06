import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import {
  faPlus,
  faPaperclip,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';

import { AlertEventDialogComponent } from '../alert-event-dialog/alert-event-dialog.component';
import { IEvent, IStation, IAlert, ICreator } from '../../services/model/project.model';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent implements OnInit {
  faPlus = faPlus;
  faPaperclip = faPaperclip;
  faExclamationTriangle = faExclamationTriangle;

  broadcastType = 'range';
  file: any;
  imagePath: any;
  imgURL: any;
  imgBinary: any;
  time = 'Now';
  alertInfo = {
    eventTypeId: 0,
    alertLevelId: 0,
    eventInfo: '',
    eventTime: 0,
    eventEnd: 0,
    permitId: 0,
    latpt: 0,
    lngpt: 0,
    radius: 0,
    creatorId: 0,
    originEventId: 0,
    attachments: []
  };
  station: IStation[];
  creator: ICreator[];

  eventSelect: IEvent;
  @ViewChild('chooseFile') chooseFile;

  constructor(
    private dialogRef: MatDialogRef<AlertDialogComponent>,
    private dialog: MatDialog,
    private project: ProjectService
  ) { }

  ngOnInit() {
    this.project.getStationList().subscribe(station => {
      this.station = station;
    });
    this.project.getCreatorList().subscribe(creator => {
      this.creator = creator;
    });
  }

  preview(event) {
    if (event.target.files.length === 0) {
      return;
    }

    this.file = event.target.files[0];
    const mimeType = this.file.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    const readerBinary = new FileReader();
    this.imagePath = this.file;
    reader.readAsDataURL(this.file);
    reader.onload = (event) => {
      this.imgURL = reader.result;
      console.log(reader.result);
    };
    readerBinary.onload = (event) => {
      this.imgBinary = readerBinary.result;
      console.log(readerBinary.result);
    };
    // this.file = event.target.files[0];
    // this.onSave();
  }

  onUploadClicked() {
    this.chooseFile.nativeElement.click();
  }

  onEventSelectDialogOpen() {
    const dialogRef = this.dialog.open(AlertEventDialogComponent, {
      width: '70%',
      height: '80vh',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      this.eventSelect = result;
      this.alertInfo.alertLevelId = result.alertLevelId;
      this.alertInfo.eventTime = result.eventTime;
      this.alertInfo.eventTypeId = result.eventTypeId;
      this.alertInfo.originEventId = result.id;
      this.alertInfo.latpt = result.latpt;
      this.alertInfo.lngpt = result.lngpt;
    });
  }

  levelTransform(level: number) {
    switch (level) {
      case 1:
        return 'Information';
      case 2:
        return 'Caution';
      case 3:
        return 'Danger';
      case 4:
        return 'SOS';
    }
  }

  getLevelColor(level: number) {
    switch (level) {
      case 1:
        return '#FF52A1';
      case 2:
        return '#9C0BD1';
      case 3:
        return '#DB0000';
      case 4:
        return '#DB0000';
    }
  }

  timeTransform(time: number) {
    const timer = new Date(time);
    return timer.getMonth() + 1 + '/' + timer.getDate() + ' ' + timer.getHours() + ':' + timer.getMinutes() + ':' + timer.getSeconds();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    this.alertInfo.eventEnd = new Date().getTime();
    const formData = new FormData();
    formData.append('file', this.file);
    // this.project.postAlert(this.alertInfo).subscribe(postResult => {});
    if (this.file) {
      this.project.postImage(formData).subscribe(result => {
        this.alertInfo.attachments.push(result.imagePath);
        this.project.postAlert(this.alertInfo).subscribe(postResult => {
          this.dialogRef.close();
        });
      });
    } else {
      this.project.postAlert(this.alertInfo).subscribe(postResult => {
        this.dialogRef.close();
      });
    }
    console.log(this.alertInfo);
  }

}
