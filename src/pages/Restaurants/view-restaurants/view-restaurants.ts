import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, ToastController } from 'ionic-angular';
import * as firebase from 'firebase';


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
    if(v.Name && q) {
      if (v.Name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
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


DueCollectionShow(){
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
              this.DueCollection(data.Creditpaid,data.AmountCollected)              
            } else {
              this.presentToast("Cancelled");
            }
          }
        }
      ]
    });
    alert.present();

}

DueCollection(Creditpaid,AmountCollected){

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
