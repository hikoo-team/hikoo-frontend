import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { MainComponent } from './component/main/main.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { EventComponent } from './component/event/event.component';
import { EventDetailComponent } from './component/event-detail/event-detail.component';
import { AlertComponent } from './component/alert/alert.component';
import { PermitComponent } from './component/permit/permit.component';
import { StatisticsComponent } from './component/statistics/statistics.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  {
    path: 'main', component: MainComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'event', component: EventComponent },
      { path: 'event-detail', component: EventDetailComponent },
      { path: 'alert', component: AlertComponent },
      { path: 'permit', component: PermitComponent },
      { path: 'statistics', component: StatisticsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
