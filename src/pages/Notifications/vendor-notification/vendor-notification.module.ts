import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VendorNotificationPage } from './vendor-notification';

@NgModule({
  declarations: [
    VendorNotificationPage,
  ],
  imports: [
    IonicPageModule.forChild(VendorNotificationPage),
  ],
})
export class VendorNotificationPageModule {}
