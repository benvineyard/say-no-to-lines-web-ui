import { ToasterModule } from 'angular2-toaster';
import { CheckinRoutingModule, routedComponents } from './checkin-routing.module';
import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';


@NgModule({
  imports: [
    ThemeModule,
    CheckinRoutingModule,
    ToasterModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class CheckinModule { }
