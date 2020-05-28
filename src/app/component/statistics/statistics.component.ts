import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { ProjectService } from '../../services/project.service';
import { MessageService } from '../../services/message.service';
import { IDashboard } from '../../services/model/project.model';

import {
  faCircle,
  faExclamationTriangle,
  faHiking,
  faMapMarkerAlt,
  faClock
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit, OnDestroy  {
  lat = 23.4698902;
  lng = 120.9572518;
  zoomValue = 15;
  iconHiker = '../../../assets/icon/circle.png';
  iconInfo = '../../../assets/icon/triangle-pink.png';
  iconCaution = '../../../assets/icon/triangle-purple.png';
  iconDanger = '../../../assets/icon/triangle-red.png';
  iconSos = '../../../assets/icon/sos-circle.png';

  faCircle = faCircle;
  faExclamationTriangle = faExclamationTriangle;
  faHiking = faHiking;
  faMapMarkerAlt = faMapMarkerAlt;
  faClock = faClock;

  totalPermits = 0;
  checkedIn = 0;
  sos = 1;
  offTrialHiker = 0;
  unResolvedEvent = 20;
  pending = 10;
  sunrise = '4:00';
  sunset = '7:38';

  public lineChartData: ChartDataSets[] = [
    { data: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ], label: '' }
  ];
  public lineChartLabels: Label[] = [
    '00', '', '', '',
    '04', '', '', '',
    '08', '', '', '',
    '12', '', '', '',
    '16', '', '', '',
    '20', '', '', ''
  ];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      xAxes: [{}],
      yAxes: [{}]
    },
    annotation: {
      annotations: []
    },
  };
  public lineChartColors: Color[] = [
    {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderColor: 'rgba(0, 0, 0, 1)',
      pointBackgroundColor: 'rgba(0,0,0,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(0,0,0,0.8)'
    }
  ];
  public lineChartLegend = false;
  public lineChartType = 'line';

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  private docSub: Subscription;

  dashboardInfo: IDashboard;
  loading = false;

  mapInfo = [];
  mapHiker = [];
  mapCaution = [];
  mapDanger = [];
  mapSos = [];

  windowIsOpen = false;

  private unstabSibscribe = new Subject();

  activeTab = {
    Day: false,
    Week: false,
    Month: false,
    Year: false,
  };


  constructor(
    private project: ProjectService,
    private message: MessageService
  ) {
    this.loading = true;
    this.activeTab['Day'] = true;
  }

  ngOnInit() {
    this.project.getDashboard().subscribe(dashboard => {
      this.dashboardInfo = dashboard;
      for (const item of this.dashboardInfo.allGps) {
        if (item.ptinfo === 'hiker') {
          item.isOpen = false;
          this.mapHiker.push(item);
        } else {
          item.isOpen = false;
          if (item.alertName === 'Information') {
            this.mapInfo.push(item);
          } else if (item.alertName === 'Caution') {
            this.mapCaution.push(item);
          } else if (item.alertName === 'Danger') {
            this.mapDanger.push(item);
          } else if (item.alertName === 'SOS') {
            this.mapSos.push(item);
          }
        }
      }
      this.lineChartData[0].data = [];

      const data = [];
      for (let i = 0; i < 24; i ++) {
        const hourFind = this.dashboardInfo.checkinTime.find(s => parseInt(s.hour, 10) === i);
        if (hourFind) {
          data.push(hourFind.count);
        } else {
          data.push(0);
        }
      }
      this.lineChartData[0].data = data;
      this.loading = false;
      console.log(this.dashboardInfo);
    });
    this.message.getDashboard().pipe(takeUntil(this.unstabSibscribe)).subscribe((r) => {
      console.log(r);
    });
  }

  ngOnDestroy() {
    this.unstabSibscribe.next();
    this.unstabSibscribe.complete();
  }

  onChangePage(pageName) {

  }

  markerClick(marker, e) {
    e.open();
    marker.isOpen = true;
  }

  timeTransform(time: number) {
    const timer = new Date(time);
    return timer.getMonth() + 1 + '/' + timer.getDate() + ' ' + timer.getHours() + ':' + timer.getMinutes() + ':' + timer.getSeconds();
  }

  eventCount(count) {
    const totalCount = this.dashboardInfo.cautionCount + this.dashboardInfo.infoCount + this.dashboardInfo.dangerCount;
    return (count / totalCount) * 90;
  }

  curretimeToString() {
    const time = new Date();
    const weekday = this.determineWeekday(time.getDay());
    return time.getFullYear() + '/' + (time.getMonth() + 1) + '/' + time.getDate() + ' ' + weekday;
  }

  determineWeekday(day: number) {
    switch (day) {
      case 0:
        return 'Sun';
      case 1:
        return 'Mon';
      case 2:
        return 'Tue';
      case 3:
        return 'Wed';
      case 4:
        return 'Thu';
      case 5:
        return 'Fri';
      case 6:
        return 'Sat';
    }

  }

}
