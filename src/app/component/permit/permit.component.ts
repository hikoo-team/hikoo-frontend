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

export interface PeriodicElement {
  index: number;
  mark: number;
  name: string;
  dob: string;
  nation: string;
  idNumber: string;
  permit: string;
  destination: string;
  status: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    index: 1,
    mark: 0,
    name: 'Wang, Da-Da',
    dob: 'A123456789',
    nation: 'TW',
    idNumber: 'A123456789',
    permit: 'Wang, Da-Da',
    destination: 'sadsadsadasdsad',
    status: 0
  },
  {
    index: 2,
    mark: 1,
    name: 'Chang, Tsu-Wei',
    dob: 'A123456789',
    nation: 'TW',
    idNumber: 'A123456789',
    permit: 'Ling, Da-Da',
    destination: 'sadsadsadasdsad',
    status: 1
  },
  {
    index: 3,
    mark: 2,
    name: 'Chang, Tsu-Wei',
    dob: 'A123456789',
    nation: 'TW',
    idNumber: 'A123456789',
    permit: 'Ta, Da-Da',
    destination: 'sadsadsadasdsad',
    status: 2
  },
];

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
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  typeHover = false;


  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openPermitDetail(index: number) {
    this.router.navigate([
      '/main/permit-detail',
      {
        id: index
      }
    ]);
  }

  statusTransform(status: number) {
    switch (status) {
      case 0:
        return 'Pending';
      case 1:
        return 'Accepted';
      case 2:
        return 'Rejected';
    }
  }

  getMarkColor(mark: number) {
    switch (mark) {
      case 0:
        return '#FFFFFF';
      case 1:
        return '#E2C800';
      case 2:
        return '#DB0000';
      default:
        return '#FFFFFF';
    }
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

  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.index + 1}`;
  }

}
