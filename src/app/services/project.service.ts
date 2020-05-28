import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, of, merge, ReplaySubject } from 'rxjs';
import { catchError, retry, switchMap, map } from 'rxjs/operators';
import { Socket } from 'ngx-socket-io';
import {
  IEvent,
  IAlert,
  IDashboard,
  IPermit,
  IPermitMemo,
  IEventList,
  IStation,
  ICheckIn,
  ICreator
} from './model/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  socketDashboard = this.socket.fromEvent<any>('dashboard');
  socketEvent = this.socket.fromEvent<any>('event');

  constructor(
    private http: HttpClient,
    private socket: Socket
  ) {

  }

  getDashboard() {
    return this.http.get<IDashboard>('/dashboard');
  }

  getEventCount() {
    return this.http.get<any>('/event/count');
  }

  getEventList(startIndex, count) {
    let queryParameters = new HttpParams();
    queryParameters = queryParameters.set('startIndex', startIndex);
    queryParameters = queryParameters.set('count', count);

    return this.http.get<IEvent[]>('/event', { params: queryParameters });
  }

  getEventDetail(id) {
    return this.http.get<IEvent>(`/event/${encodeURIComponent(String(id))}`);
  }

  putEventList(event: IEventList[]) {
    return this.http.put<any>(`/event`, event);
  }

  putEventDetail(event: IEventList) {
    return this.http.put<any>(`/event/${encodeURIComponent(String(event.id))}`, event);
  }

  postAlert(alert) {
    return this.http.post<any>(`/alert`, alert);
  }

  getAlertCount() {
    return this.http.get<any>('/alert/count');
  }

  getAlertList(startIndex, count) {
    let queryParameters = new HttpParams();
    queryParameters = queryParameters.set('startIndex', startIndex);
    queryParameters = queryParameters.set('count', count);

    return this.http.get<IAlert[]>('/alert', { params: queryParameters });
  }

  getAlertDetail(id) {
    return this.http.get<IAlert>(`/alert/${encodeURIComponent(String(id))}`);
  }

  getPermitCount() {
    return this.http.get<any>('/hikes/count');
  }

  getPermitList(startIndex, count) {
    let queryParameters = new HttpParams();
    queryParameters = queryParameters.set('startIndex', startIndex);
    queryParameters = queryParameters.set('count', count);

    return this.http.get<IPermit[]>('/hikes', { params: queryParameters });
  }

  getPermitDetail(id) {
    return this.http.get<IPermit>(`/hikes/${encodeURIComponent(String(id))}`);
  }

  putPermitList(permit: IPermitMemo[]) {
    return this.http.put<any>(`/hikes`, permit);
  }

  putPermitDetail(permit: IPermitMemo) {
    return this.http.put<any>(`/hikes/${encodeURIComponent(String(permit.hikeId))}`, permit);
  }

  getHikerCheckin(id) {
    return this.http.get<ICheckIn[]>(`/checkin/${encodeURIComponent(String(id))}`);
  }

  getStationList() {
    return this.http.get<IStation[]>('/permit');
  }

  getStationName(id) {
    return this.http.get<IStation>(`/permit/${encodeURIComponent(String(id))}`);
  }

  getCreatorList() {
    return this.http.get<ICreator[]>('/station');
  }

  postImage(image) {
    const httpOptions = {
    };
    return this.http.post<any>(`/alert/uploadImage`, image, httpOptions);
  }

}
