import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserViewRestaurantsPage } from './user-view-restaurants';

@NgModule({
  declarations: [
    UserViewRestaurantsPage,
  ],
  imports: [
    IonicPageModule.forChild(UserViewRestaurantsPage),
  ],
})
export class UserViewRestaurantsPageModule {}
