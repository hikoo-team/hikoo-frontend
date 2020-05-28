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

import { IEvent } from '../../services/model/project.model';
import { ProjectService } from '../../services/project.service';

const ELEMENT_DATA: IEvent[] = [];

@Component({
  selector: 'app-alert-event-dialog',
  templateUrl: './alert-event-dialog.component.html',
  styleUrls: ['./alert-event-dialog.component.scss']
})
export class AlertEventDialogComponent implements OnInit {
  faExclamationTriangle = faExclamationTriangle;

  displayedColumns: string[] = ['select', 'type', 'level', 'time', 'location', 'reporter'];
  dataSource = new MatTableDataSource<IEvent>(ELEMENT_DATA);
  selection = new SelectionModel<IEvent>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(
    private dialogRef: MatDialogRef<AlertEventDialogComponent>,
    private router: Router,
    private project: ProjectService
  ) { }

  ngOnInit() {
    this.project.getEventCount().subscribe(eCount => {
      this.project.getEventList(0, eCount.count).subscribe(eList => {
        this.dataSource.data = eList;
        console.log(eList);
      });
    });

    this.dataSource.paginator = this.paginator;
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

  checkboxLabel(row?: IEvent): string {
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSelect() {
    this.dialogRef.close(this.selection.selected[0]);
  }
}
