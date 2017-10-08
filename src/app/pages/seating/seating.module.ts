import { ToasterModule } from 'angular2-toaster';
import { SeatingRoutingModule, routedComponents } from './seating-routing.module';
import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';


@NgModule({
  imports: [
    ThemeModule,
    SeatingRoutingModule,
    ToasterModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class SeatingModule { }
