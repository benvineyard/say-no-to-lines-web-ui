import { NgModule } from '@angular/core';
// import { AngularEchartsModule } from 'ngx-echarts';

// import { NgxChartsModule } from '@swimlane/ngx-charts';
// import { ChartModule } from 'angular2-chartjs';

import { ThemeModule } from '../../@theme/theme.module';

// import { ChartsRoutingModule, routedComponents } from '../charts/charts-routing.module';
// import { ChartjsBarComponent } from '../charts/chartjs/chartjs-bar.component';
// import { ChartjsLineComponent } from '../charts/chartjs/chartjs-line.component';
// import { ChartjsPieComponent } from '../charts/chartjs/chartjs-pie.component';
// import { ChartjsMultipleXaxisComponent } from '../charts/chartjs/chartjs-multiple-xaxis.component';
// import { ChartjsBarHorizontalComponent } from '../charts/chartjs/chartjs-bar-horizontal.component';
// import { ChartjsRadarComponent } from '../charts/chartjs/chartjs-radar.component';
// import { D3BarComponent } from '../charts/d3/d3-bar.component';
// import { D3LineComponent } from '../charts/d3/d3-line.component';
// import { D3PieComponent } from '../charts/d3/d3-pie.component';
// import { D3AreaStackComponent } from '../charts/d3/d3-area-stack.component';
// import { D3PolarComponent } from '../charts/d3/d3-polar.component';
// import { D3AdvancedPieComponent } from '../charts/d3/d3-advanced-pie.component';
// import { EchartsLineComponent } from '../charts/echarts/echarts-line.component';
// import { EchartsPieComponent } from '../charts/echarts/echarts-pie.component';
// import { EchartsBarComponent } from '../charts/echarts/echarts-bar.component';
// import { EchartsMultipleXaxisComponent } from '../charts/echarts/echarts-multiple-xaxis.component';
// import { EchartsAreaStackComponent } from '../charts/echarts/echarts-area-stack.component';
// import { EchartsBarAnimationComponent } from '../charts/echarts/echarts-bar-animation.component';
// import { EchartsRadarComponent } from '../charts/echarts/echarts-radar.component';
import { DashboardComponent } from './dashboard.component';


@NgModule({
  imports: [
    ThemeModule,
    DashboardComponent
  ],
  declarations: [
    DashboardComponent,
  ],
})
export class DashboardModule { }
