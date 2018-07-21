import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-notification-tabs',
  templateUrl: 'notification-tabs.html',
})
export class NotificationTabsPage {

  tab1Root = "VendorNotificationPage";
  tab2Root = "UserNotificationPage";
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  
}
