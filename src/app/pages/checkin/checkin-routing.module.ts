import { RewardCardComponent } from './reward-card/reward-card.component';
import { CheckinComponent } from './checkin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MobilePhoneNumberComponent } from './mobile-phone-number/mobile-phone-number.component';

const routes: Routes = [{
  path: '',
  component: CheckinComponent,
  children: [{
    path: 'mobile-phone-number',
    component: MobilePhoneNumberComponent,
  }, {
    path: 'reward-card',
    component: RewardCardComponent,
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
export class CheckinRoutingModule {

}

export const routedComponents = [
  CheckinComponent,
  MobilePhoneNumberComponent,
  RewardCardComponent,
];
