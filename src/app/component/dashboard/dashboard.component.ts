import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  lat = 23.4698902;
  lng = 120.9572518;
  zoomValue = 15;

  totalPermits = 0;
  checkedIn = 0;
  sos = 1;
  offTrialHiker = 0;
  unResolvedEvent = 0;
  pending = 0;
  sunrise = '5:00';
  sunset = '6:00';


  constructor() { }

  ngOnInit() {
  }

  getData() {

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
