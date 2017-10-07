import { NotificationsComponent } from './notifications.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuestsQueueComponent } from './guest-queue/guest-queue.component';

const routes: Routes = [{
  path: '',
  component: NotificationsComponent,
  children: [{
    path: 'guest-queue',
    component: GuestsQueueComponent,
  }],
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class NotificationsRoutingModule {

}

export const routedComponents = [
  NotificationsComponent,
  GuestsQueueComponent,
];
