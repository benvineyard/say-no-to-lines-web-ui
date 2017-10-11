import { AngularEchartsModule } from 'ngx-echarts';
import { ThemeModule } from '../@theme/theme.module';
import { D3PieComponent } from './charts/d3/d3-pie.component';
import { D3AdvancedPieComponent } from './charts/d3/d3-advanced-pie.component';
import { D3PolarComponent } from './charts/d3/d3-polar.component';
import { D3LineComponent } from './charts/d3/d3-line.component';
import { D3AreaStackComponent } from './charts/d3/d3-area-stack.component';
import { D3BarComponent } from './charts/d3/d3-bar.component';
import { D3Component } from './charts/d3/d3.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'charts',
    component: D3Component,
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
    redirectTo: 'charts',
    pathMatch: 'full',
  }],
}];

const components = [
  D3BarComponent,
  D3LineComponent,
  D3PieComponent,
  D3AreaStackComponent,
  D3PolarComponent,
  D3AdvancedPieComponent,
];

@NgModule({
  imports: [ThemeModule, AngularEchartsModule, NgxChartsModule, ChartModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [
    ...components,
    DashboardComponent,
    D3Component,
  ],
})
export class PagesRoutingModule {
}
