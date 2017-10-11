import { EchartsRadarComponent } from './charts/echarts/echarts-radar.component';
import { EchartsBarAnimationComponent } from './charts/echarts/echarts-bar-animation.component';
import { EchartsAreaStackComponent } from './charts/echarts/echarts-area-stack.component';
import { EchartsBarComponent } from './charts/echarts/echarts-bar.component';
import { EchartsMultipleXaxisComponent } from './charts/echarts/echarts-multiple-xaxis.component';
import { EchartsPieComponent } from './charts/echarts/echarts-pie.component';
import { EchartsLineComponent } from './charts/echarts/echarts-line.component';
import { ChartjsRadarComponent } from './charts/chartjs/chartjs-radar.component';
import { ChartjsBarHorizontalComponent } from './charts/chartjs/chartjs-bar-horizontal.component';
import { ChartjsMultipleXaxisComponent } from './charts/chartjs/chartjs-multiple-xaxis.component';
import { ChartjsPieComponent } from './charts/chartjs/chartjs-pie.component';
import { ChartjsLineComponent } from './charts/chartjs/chartjs-line.component';
import { ChartjsBarComponent } from './charts/chartjs/chartjs-bar.component';
import { ChartjsComponent } from './charts/chartjs/chartjs.component';
import { EchartsComponent } from './charts/echarts/echarts.component';
import { ChartsComponent } from './charts/charts.component';
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
  ChartsComponent,
  D3BarComponent,
  D3LineComponent,
  D3PieComponent,
  D3AreaStackComponent,
  D3PolarComponent,
  D3AdvancedPieComponent,
  EchartsComponent,
  ChartjsComponent,
  ChartjsBarComponent,
  ChartjsLineComponent,
  ChartjsPieComponent,
  ChartjsBarComponent,
  ChartjsLineComponent,
  ChartjsPieComponent,
  ChartjsMultipleXaxisComponent,
  ChartjsBarHorizontalComponent,
  ChartjsRadarComponent,
  EchartsLineComponent,
  EchartsPieComponent,
  EchartsBarComponent,
  EchartsMultipleXaxisComponent,
  EchartsAreaStackComponent,
  EchartsBarAnimationComponent,
  EchartsRadarComponent,
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
