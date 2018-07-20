import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewRestaurantsPage } from './view-restaurants';

@NgModule({
  declarations: [
    ViewRestaurantsPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewRestaurantsPage),
  ],
})
export class ViewRestaurantsPageModule {}
