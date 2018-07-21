import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, ModalController } from 'ionic-angular';
import * as firebase from 'firebase';
import moment from 'moment';


@IonicPage()
@Component({
  selector: 'page-vendor-notification',
  templateUrl: 'vendor-notification.html',
})
export class VendorNotificationPage {

  resRef = firebase.database().ref("Restaurants/");
  restaurants : Array<any> =[];
  restaurantsS : Array<any>=[];
  Notification: string;
  NotificationDescription: string;
  sall : boolean;
  notiRef= firebase.database().ref("Vendor Notifications");
  sentNotifications : Array<any>=[];

  addView = false;

  constructor(
  public navCtrl: NavController, 
  public toastCtrl : ToastController,
  public modalCtrl: ModalController,
  public alertCtrl : AlertController,
  public navParams: NavParams) {
    this.getRestaurants();
    this.getNotifications();
  }

getRestaurants(){
  this.resRef.once('value',itemSnapshot=>{
    this.restaurants=[];
    itemSnapshot.forEach(itemSnap =>{
      var temp = itemSnap.val();
      temp.key = itemSnap.key;
      this.restaurants.push(temp);
      return false;
    });
  });
}


sendNoti(){
  for(var i=0;i<this.restaurantsS.length;i++){

  this.resRef.child(this.restaurantsS[i]+"/Notifications/").push({
    Notification : this.Notification,
    NotificationDescription : this.NotificationDescription,
    TimeStamp : moment().format()
  })
}
firebase.database().ref("Vendor Notifications").push({
  Notification : this.Notification,
  NotificationDescription : this.NotificationDescription,
  TimeStamp : moment().format(),
  SentTo : this.restaurantsS,
})
this.getNotifications();
this.presentToast("Notification Sent");
this.Notification=null;
this.NotificationDescription=null;
this.sall=false;
this.restaurantsS=[];
this.addView= false;
}


getNotifications(){
  this.notiRef.once('value',itemSnapshot=>{
    this.sentNotifications=[];
    itemSnapshot.forEach(itemSnap =>{
      var temp = itemSnap.val();
      temp.key = itemSnap.key;
      this.sentNotifications.push(temp);
      return false;
    });
  });
}




clearAll(){
  this.restaurantsS = [];
  this.sall = false;
}
selectAll(){
  if(this.sall){
    this.restaurantsS=[];
    for(var i=0;i<this.restaurants.length;i++){
      this.restaurantsS.push(this.restaurants[i].key);
    }
  }
}
presentToast(msg) {
  let toast = this.toastCtrl.create({
    message: msg,
    duration: 4000,
    showCloseButton: false,
  });
  toast.present();
}


viewRestaurants(rests) {
  let profileModal = this.modalCtrl.create("NotiRestaurantsPage", { restaurants: rests });
  profileModal.present();
}

showForm(){
  this.addView = true;
}
hideForm(){
  this.addView = false;
}
}
