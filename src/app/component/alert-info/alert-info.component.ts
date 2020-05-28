import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
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

import { IAlert } from '../../services/model/project.model';
import { ProjectService } from '../../services/project.service';


@Component({
  selector: 'app-alert-info',
  templateUrl: './alert-info.component.html',
  styleUrls: ['./alert-info.component.scss']
})
export class AlertInfoComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  faBell = faBell;
  faExclamationTriangle = faExclamationTriangle;
  faChevronDown = faChevronDown;

  alertId: string;
  loading = false;

  element: IAlert;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private project: ProjectService
  ) {
    this.loading = true;
    this.alertId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.project.getAlertDetail(this.alertId).subscribe(alert => {
      this.element = alert;
      console.log(this.element);
      this.loading = false;
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
