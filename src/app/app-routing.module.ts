import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { MainComponent } from './component/main/main.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { EventComponent } from './component/event/event.component';
import { EventDetailComponent } from './component/event-detail/event-detail.component';
import { AlertComponent } from './component/alert/alert.component';
import { AlertInfoComponent } from './component/alert-info/alert-info.component';
import { PermitComponent } from './component/permit/permit.component';
import { StatisticsComponent } from './component/statistics/statistics.component';
import { UserPermitInfoComponent } from './component/user-permit-info/user-permit-info.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  {
    path: 'main', component: MainComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'event', component: EventComponent },
      { path: 'event-detail', component: EventDetailComponent },
      { path: 'alert', component: AlertComponent },
      { path: 'alert-detail', component: AlertInfoComponent },
      { path: 'permit', component: PermitComponent },
      { path: 'permit-detail', component: UserPermitInfoComponent },
      { path: 'statistics', component: StatisticsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
