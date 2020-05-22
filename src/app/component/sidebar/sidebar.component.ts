import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faHiking,
  faExclamationTriangle,
  faClipboardList,
  faBell,
  faChartBar
} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  faHiking = faHiking;
  faExclamationTriangle = faExclamationTriangle;
  faClipboardList = faClipboardList;
  faBell = faBell;
  faChartBar = faChartBar;

  activateTab = {
    dashboard: false,
    event: false,
    alert: false,
    permit: false,
    statistics: false,
  };

  page = 'dashboard';
  url = [];
  position: string;

  constructor(private router: Router) { }

  ngOnInit() {
    // console.log(this.router.url);
    // this.url = this.router.url.split('/', 4);
    // console.log(this.url);
    // this.page = this.url[2];
    this.onChangePage(this.page);
  }

  onChangePage(pageChange: string) {
    this.activateTab[this.page] = false;
    this.activateTab[pageChange] = true;
    this.page = pageChange;
  }

}
