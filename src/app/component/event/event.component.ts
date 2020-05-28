import { SelectionModel } from '@angular/cdk/collections';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {
  MatTableDataSource,
  MatPaginator
} from '@angular/material';
import {
  faExclamationTriangle,
  faList,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons';

import { IEvent } from '../../services/model/project.model';
import { ProjectService } from '../../services/project.service';

const ELEMENT_DATA: IEvent[] = [];

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit, OnDestroy {
  faExclamationTriangle = faExclamationTriangle;
  faList = faList;
  faChevronDown = faChevronDown;

  displayedColumns: string[] = ['select', 'type', 'level', 'time', 'location', 'reporter', 'status'];
  dataSource = new MatTableDataSource<IEvent>(ELEMENT_DATA);
  selection = new SelectionModel<IEvent>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  count = 0;
  levelHover = false;
  statusHover = false;
  statusDetailHover = false;

  private docSub: Subscription;


  constructor(
    private router: Router,
    private project: ProjectService
  ) { }

  ngOnInit() {
    this.docSub = this.project.socketEvent.subscribe(doc => {
      console.log(doc);
    }, err => {
      console.log(err);
    });
    this.project.getEventCount().subscribe(eCount => {
      this.project.getEventList(0, eCount.count).subscribe(eList => {
        this.dataSource.data = eList;
        console.log(eList);
      });
    });

    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.docSub.unsubscribe();
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

  getColor(status: string) {
    switch (status) {
      case 'PENDING':
        return '#D0B000';
      case 'PROCESSING':
        return '#1D74FF';
      case 'RESOLVED':
        return '#000000';
    }
  }

  timeTransform(time: number) {
    const timer = new Date(time);
    return timer.getMonth() + 1 + '/' + timer.getDate() + ' ' + timer.getHours() + ':' + timer.getMinutes() + ':' + timer.getSeconds();
  }

  openEventDetail(index: number) {
    this.router.navigate([
      '/main/event-detail',
      {
        id: index
      }
    ]);
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

  onChangeMultiStatus(status: string) {
    for (const item of this.selection.selected) {
      item.stat = status;
    }
  }

  onChangeMultiLevel(level: number) {
    for (const item of this.selection.selected) {
      item.alertLevelId = level;
    }
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

  checkboxLabel(row?: IEvent): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

}
