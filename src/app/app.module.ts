import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule, Routes } from '@angular/router';
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
    AlertInfoComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ChartsModule,
    FontAwesomeModule,
    HttpClientModule,
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
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }