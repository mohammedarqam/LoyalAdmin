import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotificationTabsPage } from './notification-tabs';

@NgModule({
  declarations: [
    NotificationTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(NotificationTabsPage),
  ],
})
export class NotificationTabsPageModule {}
