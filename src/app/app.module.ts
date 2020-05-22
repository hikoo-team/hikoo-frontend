import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule, Routes } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { MainComponent } from './component/main/main.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { EventComponent } from './component/event/event.component';
import { AlertComponent } from './component/alert/alert.component';
import { PermitComponent } from './component/permit/permit.component';
import { StatisticsComponent } from './component/statistics/statistics.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    DashboardComponent,
    EventComponent,
    MainComponent,
    PermitComponent,
    SidebarComponent,
    StatisticsComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDi4jBvQt1KxY-hT4TAuDqNw8EgHaIOWOY',
      language: 'zh-TW'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
