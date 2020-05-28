import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatTableDataSource,
  MatPaginator,
  MatSort
} from '@angular/material';

import {
  faExclamationTriangle,
  faList,
  faChevronDown,
  faTag
} from '@fortawesome/free-solid-svg-icons';

import { IPermit } from '../../services/model/project.model';
import { ProjectService } from '../../services/project.service';

const ELEMENT_DATA: IPermit[] = [];

@Component({
  selector: 'app-permit',
  templateUrl: './permit.component.html',
  styleUrls: ['./permit.component.scss']
})
export class PermitComponent implements OnInit {
  faExclamationTriangle = faExclamationTriangle;
  faList = faList;
  faChevronDown = faChevronDown;
  faTag = faTag;

  displayedColumns: string[] = ['select', 'mark', 'name', 'dob', 'nation', 'idNumber', 'permit', 'destination', 'status'];
  dataSource: MatTableDataSource<IPermit>;
  selection = new SelectionModel<IPermit>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  typeHover = false;
  loading = false;


  constructor(
    private router: Router,
    private project: ProjectService
  ) {
    this.loading = true;
  }

  ngOnInit() {
    this.project.getPermitCount().subscribe(pCount => {
      this.project.getPermitList(0, pCount.count).subscribe(pList => {
        this.dataSource = new MatTableDataSource<IPermit>(pList);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
        this.loading = false;

        console.log(this.dataSource);
      });
    });
  }

  openPermitDetail(index: number) {
    this.router.navigate([
      '/main/permit-detail',
      {
        id: index
      }
    ]);
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

  onChangeWatchStatus(mark: string) {
    const waitToPut = [];
    for (const item of this.selection.selected) {
      item.hikerInfo.watchStatus = mark;
      waitToPut.push({
        hikeId: item.id,
        hikerId: item.hikerId,
        meme: item.memo,
        watchStatus: mark
      });
    }
    this.project.putPermitList(waitToPut).subscribe(result => {});
  }

  permitTimeTransform(time: number) {
    const timer = new Date(time);
    return timer.getFullYear() + '/' + (timer.getMonth() + 1) + '/' + timer.getDate();
  }

  timeTransform(time: number) {
    const timer = new Date(time);
    return timer.getMonth() + 1 + '/' + timer.getDate() + ' ' + timer.getHours() + ':' + timer.getMinutes() + ':' + timer.getSeconds();
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

  checkboxLabel(row?: IPermit): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

}
