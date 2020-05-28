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
  faChevronDown,
  faHiking,
  faMapMarkerAlt,
  faClock
} from '@fortawesome/free-solid-svg-icons';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { IEvent } from '../../services/model/project.model';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
  lat = 23.4698902;
  lng = 120.9572518;
  zoomValue = 15;
  icondot = '../../../assets/icon/circle.png';
  iconinfo = '../../../assets/icon/triangle-pink.png';
  iconcaution = '../../../assets/icon/triangle-purple.png';
  icondanger = '../../../assets/icon/triangle-red.png';
  iconSos = '../../../assets/icon/sos-circle.png';

  faArrowLeft = faArrowLeft;
  faBell = faBell;
  faExclamationTriangle = faExclamationTriangle;
  faChevronDown = faChevronDown;
  faHiking = faHiking;
  faMapMarkerAlt = faMapMarkerAlt;
  faClock = faClock;

  totalPermits = 0;
  checkedIn = 0;
  sos = 1;
  offTrialHiker = 0;
  unResolvedEvent = 0;
  pending = 0;

  eventId: string;

  element: IEvent;

  loading = false;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private project: ProjectService
  ) {
    this.loading = true;
    this.eventId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.project.getEventDetail(this.eventId).subscribe(event => {
      this.element = event;
      this.lat = this.element.latpt;
      this.lng = this.element.lngpt;
      this.loading = false;
    });
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

  onChangeStatus(eventInfo: IEvent, status: string) {
    eventInfo.stat = status;
    const eventChange = {
      id: eventInfo.id,
      alertId: eventInfo.alertLevelId,
      stat: status
    };
    this.project.putEventDetail(eventChange).subscribe(result => {});
    console.log(eventInfo);
  }

  onChangeLevel(eventInfo: IEvent, level: number) {
    eventInfo.alertLevelId = level;
    const eventChange = {
      id: eventInfo.id,
      alertId: level,
      stat: eventInfo.stat
    };
    this.project.putEventDetail(eventChange).subscribe(result => {});
  }

  statusTransform(status: string) {
    switch (status) {
      case 'PENDING':
        return 'Pending';
      case 'PROCESSING':
        return 'Processing';
      case 'RESOLVED':
        return 'Resolved';
    }
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
}
