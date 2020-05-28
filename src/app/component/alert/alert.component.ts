import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {
  MatTableDataSource,
  MatPaginator,
  MatDialog
} from '@angular/material';

import {
  faBell,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';

import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { IAlert } from '../../services/model/project.model';
import { ProjectService } from '../../services/project.service';

const ELEMENT_DATA: IAlert[] = [];

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {
  faExclamationTriangle = faExclamationTriangle;
  faBell = faBell;

  displayedColumns: string[] = ['select', 'type', 'level', 'time', 'location', 'station'];
  dataSource = new MatTableDataSource<IAlert>(ELEMENT_DATA);
  selection = new SelectionModel<IAlert>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(
    private router: Router,
    private dialog: MatDialog,
    private project: ProjectService
  ) { }

  ngOnInit() {
    this.project.getAlertCount().subscribe(aCount => {
      this.project.getAlertList(0, aCount.count).subscribe(aList => {
        this.dataSource.data = aList;
        console.log(aList);
      });
    });
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {

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

  openAlertDetail(index: number) {
    this.router.navigate([
      '/main/alert-detail',
      {
        id: index
      }
    ]);
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
      this.dataSource.data = [];
      this.project.getAlertCount().subscribe(aCount => {
        this.project.getAlertList(0, aCount.count).subscribe(aList => {
          this.dataSource.data = aList;
          console.log(aList);
        });
      });
    });
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

  checkboxLabel(row?: IAlert): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

}
