import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuItemsViewPage } from './menu-items-view';

@NgModule({
  declarations: [
    MenuItemsViewPage,
  ],
  imports: [
    IonicPageModule.forChild(MenuItemsViewPage),
  ],
})
export class MenuItemsViewPageModule {}
