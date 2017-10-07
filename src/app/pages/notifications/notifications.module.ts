import { ToasterModule } from 'angular2-toaster';
import { NotificationsRoutingModule, routedComponents } from './notifications-routing.module';
import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';


@NgModule({
  imports: [
    ThemeModule,
    NotificationsRoutingModule,
    ToasterModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class NotificationsModule { }
