import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditRestaurantsPage } from './edit-restaurants';

@NgModule({
  declarations: [
    EditRestaurantsPage,
  ],
  imports: [
    IonicPageModule.forChild(EditRestaurantsPage),
  ],
})
export class EditRestaurantsPageModule {}
