import { RewardCardSeatingComponent } from './reward-card/reward-card.component';
import {  } from './finalize/finalize.component';
import { SeatingComponent } from './seating.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MobilePhoneNumberSeatingComponent } from './mobile-phone-number/mobile-phone-number.component';

const routes: Routes = [{
  path: '',
  component: SeatingComponent,
  children: [{
    path: 'mobile-phone-number',
    component: MobilePhoneNumberSeatingComponent,
  }, {
    path: 'reward-card',
    component: RewardCardSeatingComponent,
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
export class SeatingRoutingModule {

}

export const routedComponents = [
  SeatingComponent,
  MobilePhoneNumberSeatingComponent,
  RewardCardSeatingComponent,
];
