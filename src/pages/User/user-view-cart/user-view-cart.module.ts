import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserViewCartPage } from './user-view-cart';

@NgModule({
  declarations: [
    UserViewCartPage,
  ],
  imports: [
    IonicPageModule.forChild(UserViewCartPage),
  ],
})
export class UserViewCartPageModule {}
