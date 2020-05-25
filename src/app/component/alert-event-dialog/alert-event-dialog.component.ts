import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatTableDataSource,
  MatPaginator,
  MatDialog,
  MatDialogRef
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
  reporter: string;
  receivingUnit: string;
  status: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    index: 1,
    type: 'Falling Rocks',
    level: 1,
    time: 1590130800000,
    location: '24.9525, 121.0212',
    reporter: 'Wang, Da-Da',
    receivingUnit: 'HePing',
    status: 0
  },
  {
    index: 2,
    type: 'Falling Rocks',
    level: 2,
    time: 1590130800000,
    location: '24.9525, 121.0212',
    reporter: 'Wang, Da-Da',
    receivingUnit: 'HePing',
    status: 0
  },
  {
    index: 3,
    type: 'Falling Rocks',
    level: 3,
    time: 1590130800000,
    location: '24.9525, 121.0212',
    reporter: 'Wang, Da-Da',
    receivingUnit: 'HePing',
    status: 1
  },
  {
    index: 4,
    type: 'Falling Rocks',
    level: 0,
    time: 1590130800000,
    location: '24.9525, 121.0212',
    reporter: 'Wang, Da-Da',
    receivingUnit: 'HePing',
    status: 1
  },
  {
    index: 5,
    type: 'Falling Rocks',
    level: 2,
    time: 1590130800000,
    location: '24.9525, 121.0212',
    reporter: 'Wang, Da-Da',
    receivingUnit: 'HePing',
    status: 2
  },
  {
    index: 6,
    type: 'Falling Rocks',
    level: 2,
    time: 1590130800000,
    location: '24.9525, 121.0212',
    reporter: 'Wang, Da-Da',
    receivingUnit: 'HePing',
    status: 2
  },
  {
    index: 5,
    type: 'Falling Rocks',
    level: 2,
    time: 1590130800000,
    location: '24.9525, 121.0212',
    reporter: 'Wang, Da-Da',
    receivingUnit: 'HePing',
    status: 2
  },
  {
    index: 6,
    type: 'Falling Rocks',
    level: 2,
    time: 1590130800000,
    location: '24.9525, 121.0212',
    reporter: 'Wang, Da-Da',
    receivingUnit: 'HePing',
    status: 2
  },
  {
    index: 5,
    type: 'Falling Rocks',
    level: 2,
    time: 1590130800000,
    location: '24.9525, 121.0212',
    reporter: 'Wang, Da-Da',
    receivingUnit: 'HePing',
    status: 2
  },
  {
    index: 6,
    type: 'Falling Rocks',
    level: 2,
    time: 1590130800000,
    location: '24.9525, 121.0212',
    reporter: 'Wang, Da-Da',
    receivingUnit: 'HePing',
    status: 2
  },
  {
    index: 5,
    type: 'Falling Rocks',
    level: 2,
    time: 1590130800000,
    location: '24.9525, 121.0212',
    reporter: 'Wang, Da-Da',
    receivingUnit: 'HePing',
    status: 2
  },
  {
    index: 6,
    type: 'Falling Rocks',
    level: 2,
    time: 1590130800000,
    location: '24.9525, 121.0212',
    reporter: 'Wang, Da-Da',
    receivingUnit: 'HePing',
    status: 2
  },
  {
    index: 5,
    type: 'Falling Rocks',
    level: 2,
    time: 1590130800000,
    location: '24.9525, 121.0212',
    reporter: 'Wang, Da-Da',
    receivingUnit: 'HePing',
    status: 2
  },
  {
    index: 6,
    type: 'Falling Rocks',
    level: 2,
    time: 1590130800000,
    location: '24.9525, 121.0212',
    reporter: 'Wang, Da-Da',
    receivingUnit: 'HePing',
    status: 2
  },
  {
    index: 5,
    type: 'Falling Rocks',
    level: 2,
    time: 1590130800000,
    location: '24.9525, 121.0212',
    reporter: 'Wang, Da-Da',
    receivingUnit: 'HePing',
    status: 2
  },
  {
    index: 6,
    type: 'Falling Rocks',
    level: 2,
    time: 1590130800000,
    location: '24.9525, 121.0212',
    reporter: 'Wang, Da-Da',
    receivingUnit: 'HePing',
    status: 2
  },
  {
    index: 5,
    type: 'Falling Rocks',
    level: 2,
    time: 1590130800000,
    location: '24.9525, 121.0212',
    reporter: 'Wang, Da-Da',
    receivingUnit: 'HePing',
    status: 2
  },
  {
    index: 6,
    type: 'Falling Rocks',
    level: 2,
    time: 1590130800000,
    location: '24.9525, 121.0212',
    reporter: 'Wang, Da-Da',
    receivingUnit: 'HePing',
    status: 2
  },
  {
    index: 5,
    type: 'Falling Rocks',
    level: 2,
    time: 1590130800000,
    location: '24.9525, 121.0212',
    reporter: 'Wang, Da-Da',
    receivingUnit: 'HePing',
    status: 2
  },
  {
    index: 6,
    type: 'Falling Rocks',
    level: 2,
    time: 1590130800000,
    location: '24.9525, 121.0212',
    reporter: 'Wang, Da-Da',
    receivingUnit: 'HePing',
    status: 2
  },
  {
    index: 5,
    type: 'Falling Rocks',
    level: 2,
    time: 1590130800000,
    location: '24.9525, 121.0212',
    reporter: 'Wang, Da-Da',
    receivingUnit: 'HePing',
    status: 2
  },
  {
    index: 6,
    type: 'Falling Rocks',
    level: 2,
    time: 1590130800000,
    location: '24.9525, 121.0212',
    reporter: 'Wang, Da-Da',
    receivingUnit: 'HePing',
    status: 2
  },
  {
    index: 5,
    type: 'Falling Rocks',
    level: 2,
    time: 1590130800000,
    location: '24.9525, 121.0212',
    reporter: 'Wang, Da-Da',
    receivingUnit: 'HePing',
    status: 2
  },
  {
    index: 6,
    type: 'Falling Rocks',
    level: 2,
    time: 1590130800000,
    location: '24.9525, 121.0212',
    reporter: 'Wang, Da-Da',
    receivingUnit: 'HePing',
    status: 2
  },

];

@Component({
  selector: 'app-alert-event-dialog',
  templateUrl: './alert-event-dialog.component.html',
  styleUrls: ['./alert-event-dialog.component.scss']
})
export class AlertEventDialogComponent implements OnInit {
  faExclamationTriangle = faExclamationTriangle;

  displayedColumns: string[] = ['select', 'type', 'level', 'time', 'location', 'reporter', 'receivingUnit'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(
    private dialogRef: MatDialogRef<AlertEventDialogComponent>,
  ) { }

  ngOnInit() {
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

  checkboxLabel(row?: PeriodicElement): string {
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.index + 1}`;
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSelect() {}

}
