import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { ProjectService } from '../services/project.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private stopTag = true;
  private dashboardSubject = new Subject();
  private dashboardSub: Subscription;
  private eventSubject = new Subject();
  private eventSub: Subscription;

  constructor(
    private project: ProjectService
  ) { }

  start() {
    this.stopTag = false;
    this.polling();
  }

  stop() {
    this.stopTag = true;
  }

  getDashboard() {
    return this.dashboardSubject;
  }

  getEvent() {
    return this.eventSubject;
  }

  polling() {
    this.dashboardSub = this.project.socketDashboard.subscribe(dashboard => {
      this.dashboardSubject.next(dashboard);
    }, err => {
    });
    this.eventSub = this.project.socketEvent.subscribe(event => {
      this.eventSubject.next(event);
    }, err => {
    });
  }
}
