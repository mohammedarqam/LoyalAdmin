import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotiRestaurantsPage } from './noti-restaurants';

@NgModule({
  declarations: [
    NotiRestaurantsPage,
  ],
  imports: [
    IonicPageModule.forChild(NotiRestaurantsPage),
  ],
})
export class NotiRestaurantsPageModule {}
