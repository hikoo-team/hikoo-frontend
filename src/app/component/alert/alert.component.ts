import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatTableDataSource,
  MatPaginator
} from '@angular/material';

import {
  faBell,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';

export interface PeriodicElement {
  index: number;
  type: string;
  level: number;
  time: number;
  location: string;
  station: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    index: 1,
    type: 'Falling Rocks',
    level: 1,
    time: 1590130800000,
    location: '24.9525, 121.0212',
    station: 'HePing'
  },
  {
    index: 2,
    type: 'Falling Rocks',
    level: 2,
    time: 1590130800000,
    location: '24.9525, 121.0212',
    station: 'HePing'
  },
  {
    index: 3,
    type: 'Falling Rocks',
    level: 3,
    time: 1590130800000,
    location: '24.9525, 121.0212',
    station: 'HePing'
  },
  {
    index: 4,
    type: 'Falling Rocks',
    level: 0,
    time: 1590130800000,
    location: '24.9525, 121.0212',
    station: 'HePing'
  },
  {
    index: 5,
    type: 'Falling Rocks',
    level: 2,
    time: 1590130800000,
    location: '24.9525, 121.0212',
    station: 'HePing'
  },
  {
    index: 6,
    type: 'Falling Rocks',
    level: 2,
    time: 1590130800000,
    location: '24.9525, 121.0212',
    station: 'HePing'
  },
];

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  faExclamationTriangle = faExclamationTriangle;
  faBell = faBell;

  displayedColumns: string[] = ['select', 'type', 'level', 'time', 'location', 'station'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
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

  openAlertDetail(index: number) {
    this.router.navigate([
      '/main/alert-detail',
      {
        id: index
      }
    ]);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.index + 1}`;
  }

}
