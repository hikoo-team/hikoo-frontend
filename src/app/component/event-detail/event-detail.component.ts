import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatDialog
} from '@angular/material';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  faArrowLeft,
  faBell,
  faExclamationTriangle,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons';

import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
  lat = 23.4698902;
  lng = 120.9572518;
  zoomValue = 15;

  faArrowLeft = faArrowLeft;
  faBell = faBell;
  faExclamationTriangle = faExclamationTriangle;
  faChevronDown = faChevronDown;

  totalPermits = 0;
  checkedIn = 0;
  sos = 1;
  offTrialHiker = 0;
  unResolvedEvent = 0;
  pending = 0;

  uuid: string;

  data = {
    index: 1,
    type: 'Falling Rocks',
    level: 1,
    time: 1590130800000,
    location: '24.9525, 121.0212',
    reporter: 'Wang, Da-Da',
    receivingUnit: 'HePing',
    status: 0,
    description: 'asdasdasdasd'
  };

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {

  }

  ngOnInit() {
    this.uuid = this.route.snapshot.paramMap.get('id');
  }

  onAlertDialogOpen() {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '50%',
      minHeight: '50vh',
      maxHeight: '90vh',
      disableClose: true,
      position: {
        top: '55px'
      }
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }

  backToEvent() {
    this.location.back();
  }

  statusTransform(status: number) {
    switch (status) {
      case 0:
        return 'Pending';
      case 1:
        return 'Processing';
      case 2:
        return 'Resolved';
    }
  }

  levelTransform(level: number) {
    switch (level) {
      case 0:
        return 'Info';
      case 1:
        return 'Caution';
      case 2:
        return 'Danger';
      case 3:
        return 'SOS';
    }
  }

  getLevelColor(level: number) {
    switch (level) {
      case 0:
        return '#FF52A1';
      case 1:
        return '#9C0BD1';
      case 2:
        return '#DB0000';
      case 3:
        return '#DB0000';
    }
  }

  timeTransform(time: number) {
    const timer = new Date(time);
    return timer.getMonth() + 1 + '/' + timer.getDate() + ' ' + timer.getHours() + ':' + timer.getMinutes() + ':' + timer.getSeconds();
  }

  getData() {

  }
}
