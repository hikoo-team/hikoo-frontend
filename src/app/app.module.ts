import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDialogModule,
  MatIconModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';

import { ChartsModule } from 'ng2-charts';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { MainComponent } from './component/main/main.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { EventComponent } from './component/event/event.component';
import { AlertComponent } from './component/alert/alert.component';
import { PermitComponent } from './component/permit/permit.component';
import { StatisticsComponent } from './component/statistics/statistics.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EventDetailComponent } from './component/event-detail/event-detail.component';
import { AlertDialogComponent } from './component/alert-dialog/alert-dialog.component';
import { MessageDialogComponent } from './component/message-dialog/message-dialog.component';
import { UserPermitInfoComponent } from './component/user-permit-info/user-permit-info.component';
import { AlertInfoComponent } from './component/alert-info/alert-info.component';
import { AlertEventDialogComponent } from './component/alert-event-dialog/alert-event-dialog.component';

// const config: SocketIoConfig = { url: 'http://192.168.11.35:3000', options: {} };
const config: SocketIoConfig = { url: 'http://192.168.11.41:3000', options: {} };
@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    DashboardComponent,
    EventComponent,
    MainComponent,
    PermitComponent,
    SidebarComponent,
    StatisticsComponent,
    EventDetailComponent,
    AlertDialogComponent,
    MessageDialogComponent,
    UserPermitInfoComponent,
    AlertInfoComponent,
    AlertEventDialogComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ChartsModule,
    CommonModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDi4jBvQt1KxY-hT4TAuDqNw8EgHaIOWOY',
      language: 'zh-TW'
    }),
    BrowserAnimationsModule,
    SocketIoModule.forRoot(config)
  ],
  entryComponents: [
    AlertDialogComponent,
    MessageDialogComponent,
    AlertEventDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
