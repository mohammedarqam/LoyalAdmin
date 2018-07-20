import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController, AlertController, MenuController, IonicPage } from 'ionic-angular';
import * as firebase from 'firebase';



@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  userRef = firebase.database().ref("Users/");
  totUsers: number = 0;

  restaurantsRef = firebase.database().ref("Restaurants/");
  totRestaurants: number = 0;

  constructor(
  public navCtrl: NavController,
  public toastCtrl : ToastController,
  public loadingCtrl : LoadingController,
  public alertCtrl : AlertController,
  private menuCtrl : MenuController) {
    this.menuCtrl.enable(true);

    this.restaurantsRef.once('value',itemSnapshot=>{
      this.totRestaurants = itemSnapshot.numChildren();
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

}
