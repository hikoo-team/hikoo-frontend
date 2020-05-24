import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';

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
  sunrise = '4:00';
  sunset = '7:38';

  public lineChartData: ChartDataSets[] = [
    { data: [0, 20, 1000, 60, 20, 1, 0], label: '' }
  ];
  public lineChartLabels: Label[] = ['00', '04', '08', '12', '16', '20', '24'];
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
