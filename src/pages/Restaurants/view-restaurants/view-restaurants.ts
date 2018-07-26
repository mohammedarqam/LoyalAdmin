import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, ToastController } from 'ionic-angular';
import * as firebase from 'firebase';
import moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-view-restaurants',
  templateUrl: 'view-restaurants.html',
})
export class ViewRestaurantsPage {

  restaurantRef = firebase.database().ref("Restaurants/");
  restaurants : Array<any> = [];
  restaurantsLoaded : Array<any> =[];


  constructor(
  public navCtrl: NavController, 
  public modalCtrl : ModalController,
  public toastCtrl : ToastController,
  public alertCtrl : AlertController,
  public navParams: NavParams) {
    this.getRestaurants();
  }


getRestaurants(){
  this.restaurantRef.once('value',itemSnapshot=>{
    let tempArray = [];
    itemSnapshot.forEach(itemSnap =>{
      var temp = itemSnap.val();
      temp.key = itemSnap.key;
      tempArray.push(temp);
      return false;
    }) ;
    this.restaurants = tempArray;
    this.restaurantsLoaded = tempArray;
  });
}


initializeItems(): void {
  this.restaurants = this.restaurantsLoaded;
}
getItems(searchbar) {
  this.initializeItems();
  let q = searchbar;
  if (!q) {
    return;
  }
  this.restaurants = this.restaurants.filter((v) => {
    if(v.RestaurantName && q) {
      if (v.RestaurantName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    }
  });
}

gtDetails(rest){
  let profileModal = this.modalCtrl.create("RestaurantDetailsPage", { rest: rest });
  profileModal.present();
}


DueCollectionShow(rest){
    let alert = this.alertCtrl.create({
      title: 'Transaction',
      inputs: [
        {
          name: 'Creditpaid',
          placeholder: 'Credit Paid',
          type :'number'
        },
        {
          name: 'AmountCollected',
          placeholder: 'Amount Collected',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Add Item',
          handler: data => {
            if (data.CreditPaid||data.AmountCollected) {
              this.DueCollection(rest,data.Creditpaid,data.AmountCollected)              
            } else {
              this.presentToast("Cancelled");
            }
          }
        }
      ]
    });
    alert.present();

}

DueCollection(rest,Creditpaid,AmountCollected){
  var AmountDue;
  var CreditDue;
  this.restaurantRef.child(rest.key).child("AmountPendingToLoyal").transaction(function(cData){
      AmountDue = cData;
      return cData - AmountCollected;
  }).then(()=>{
    this.restaurantRef.child(rest.key).child("CreditDue").transaction(function(cDataa){
      CreditDue=cDataa;
      return cDataa - Creditpaid;
    }).then(()=>{
      firebase.database().ref("LoyalDataMain").child("TotalCollectionFromVendors").transaction(function(caData){
        return caData - AmountCollected;
      }).then(()=>{
        firebase.database().ref("LoyalDataMain").child("TotalCreditToCustomers").transaction(function(cDat){
          return cDat-Creditpaid;
        }).then(()=>{
          firebase.database().ref("CollectionLog").push({
            RestaurantName : rest.RestaurantName,
            CreditPaid : Creditpaid,
            AmountCollected : AmountCollected,
            AmountDue : AmountDue,
            CreditDue : CreditDue,
            Time : moment().format()
          }).then(()=>{
            this.presentToast("Collected");
          })
        })
      })
    })
  });


}

editRes(rest){
  this.navCtrl.push("EditRestaurantsPage",{rest : rest});
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
