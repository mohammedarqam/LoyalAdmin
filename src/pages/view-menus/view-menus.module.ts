import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewMenusPage } from './view-menus';

@NgModule({
  declarations: [
    ViewMenusPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewMenusPage),
  ],
})
export class ViewMenusPageModule {}
