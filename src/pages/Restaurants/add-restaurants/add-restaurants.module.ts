import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddRestaurantsPage } from './add-restaurants';

@NgModule({
  declarations: [
    AddRestaurantsPage,
  ],
  imports: [
    IonicPageModule.forChild(AddRestaurantsPage),
  ],
})
export class AddRestaurantsPageModule {}
