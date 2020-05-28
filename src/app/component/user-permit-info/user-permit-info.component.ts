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
  faChevronDown,
  faPen,
  faTag
} from '@fortawesome/free-solid-svg-icons';

import { IPermit, ICheckIn } from '../../services/model/project.model';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-user-permit-info',
  templateUrl: './user-permit-info.component.html',
  styleUrls: ['./user-permit-info.component.scss']
})
export class UserPermitInfoComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  faBell = faBell;
  faExclamationTriangle = faExclamationTriangle;
  faChevronDown = faChevronDown;
  faPen = faPen;
  faTag = faTag;

  loading = false;

  totalPermits = 0;
  checkedIn = 0;
  sos = 1;
  offTrialHiker = 0;
  unResolvedEvent = 0;
  pending = 0;

  userId: string;

  element: IPermit;
  checkinData: ICheckIn[];

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private project: ProjectService
  ) {
    this.loading = true;
    this.userId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.project.getPermitDetail(this.userId).subscribe(user => {
      console.log(user);
      this.element = user;
      this.project.getHikerCheckin(this.element.id).subscribe(data => {
        this.checkinData = data;
        console.log(this.checkinData);
        this.loading = false;
      });
    });
  }

  backToEvent() {
    this.location.back();
  }

  onChangeWatchStatus(status) {
    this.element.hikerInfo.watchStatus = status;
  }

  getMarkColor(mark: string) {
    switch (mark) {
      case 'NORMAL':
        return '#FFFFFF';
      case 'WATCHLIST':
        return '#E2C800';
      case 'BLACKLIST':
        return '#DB0000';
      default:
        return '#FFFFFF';
    }
  }

  getMarkTranform(mark: string) {
    switch (mark) {
      case 'NORMAL':
        return 'Normal';
      case 'WATCHLIST':
        return 'Watchlist';
      case 'BLACKLIST':
        return 'Blacklist';
      default:
        return 'Normal';
    }
  }

  statusTransform(permit: number) {
    switch (permit) {
      case 1:
        return 'Pending';
      case 2:
        return 'Accepted';
      case 3:
        return 'Rejected';
    }
  }

  getGender(gender: string) {
    switch (gender) {
      case 'M':
        return 'Male';
      case 'F':
        return 'Female';
    }
  }

  onTrailsGet(trail: any[]) {
    let trailRoute = '';
    for (let i = 0; i < trail.length ; i ++) {
      if (i === trail.length - 1) {
        trailRoute += trail[i].name;
      } else {
        trailRoute += trail[i].name + ', ';
      }
    }
    return trailRoute;
  }

  permitTimeTransform(time: number) {
    const timer = new Date(time);
    return timer.getFullYear() + '/' + (timer.getMonth() + 1) + '/' + timer.getDate();
  }

  timeTransform(time: number) {
    const timer = new Date(time);
    return timer.getMonth() + 1 + '/' + timer.getDate() + ' ' + timer.getHours() + ':' + timer.getMinutes() + ':' + timer.getSeconds();
  }

  onSavePermit() {
    const permittion = {
      hikeId: this.element.id,
      hikerId: this.element.hikerId,
      memo: this.element.memo,
      watchStatus: this.element.hikerInfo.watchStatus
    };

    this.project.putPermitDetail(permittion).subscribe(result => {});
  }
}
