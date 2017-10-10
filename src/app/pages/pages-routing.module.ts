import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'dashboard',
    loadChildren: './charts/charts.module#ChartsModule',
  }, {
    path: 'checkin',
    loadChildren: './checkin/checkin.module#CheckinModule',
  }, {
    path: 'notifications',
    loadChildren: './notifications/notifications.module#NotificationsModule',
  }, {
    path: 'seating',
    loadChildren: './seating/seating.module#SeatingModule',
  }, {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
