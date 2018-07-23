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

  mainDataRef= firebase.database().ref("LoyalDataMain/");
  totalCredit : number = 0;
  totalCollection : number = 0;
  totalOrders : number = 0;
  restName : string;
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
    this.userRef.once('value',itemSnapshot=>{
      this.totUsers = itemSnapshot.numChildren();
    });
    
    this.mainDataRef.once('value',itemSnapshot=>{
      this.totalCollection = itemSnapshot.val().TotalCollectionFromVendors;
      this.totalCredit = itemSnapshot.val().TotalCreditToCustomers;
    })



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
