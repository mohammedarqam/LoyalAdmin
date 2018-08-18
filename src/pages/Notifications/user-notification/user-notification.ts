import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import * as firebase from 'firebase';
import moment from 'moment';


@IonicPage()
@Component({
  selector: 'page-user-notification',
  templateUrl: 'user-notification.html',
})
export class UserNotificationPage {

  Notification : string;
  NotificationDescription : string;

  userNotiRef = firebase.database().ref("User Notifications");
  userNotifications : Array<any> =[];

  addView = false;


  constructor(
  public navCtrl: NavController,
  public toastCtrl : ToastController,
  ) {
    this.getNotifications();
  }

  getNotifications(){
    this.userNotiRef.orderByChild("TimeStamp").once('value',itemSnapshot=>{
      this.userNotifications=[];
      itemSnapshot.forEach(itemSnap =>{
        var temp = itemSnap.val();
        temp.key = itemSnap.key;
        this.userNotifications.push(temp);
        this.userNotifications.reverse();
        return false;
      });
    });
  }

sendUserNotification(){
    this.userNotiRef.push({
      Notification : this.Notification,
      NotificationDescription : this.NotificationDescription,
      TimeStamp : firebase.database.ServerValue.TIMESTAMP
    }).then(()=>{
      this.getNotifications();
      this.Notification = null;
      this.NotificationDescription = null;
      this.presentToast("Notification Sent");
      this.addView = false;
    });
}


presentToast(msg) {
  let toast = this.toastCtrl.create({
    message: msg,
    duration: 4000,
    showCloseButton: false,
  });
  toast.present();
}

showForm(){
  this.addView = true;
}
hideForm(){
  this.addView = false;
  this.Notification =null;
  this.NotificationDescription =null;
}

}
