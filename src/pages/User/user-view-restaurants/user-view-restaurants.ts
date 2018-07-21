import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';



@IonicPage()
@Component({
  selector: 'page-user-view-restaurants',
  templateUrl: 'user-view-restaurants.html',
})
export class UserViewRestaurantsPage {

  userKey = this.navParams.get("key");
  restaurants : Array<any> = [];


  constructor(
  public navCtrl: NavController, 
  public loadingCtrl : LoadingController,
  public navParams: NavParams) {
    this.getRestaurants();
  }

  getRestaurants(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    firebase.database().ref("Users/"+this.userKey+"/Restaurants/").once('value',itemSnapshot=>{
      this.restaurants = [];
      itemSnapshot.forEach(itemSnap=>{
        firebase.database().ref("Restaurants").child(itemSnap.key).once('value',sitem=>{

        var temp = itemSnap.val();
        temp.Name = sitem.val().RestaurantName;
        temp.key = itemSnap.key;
        this.restaurants.push(temp);
        return false;
      }).then(()=>{
        loading.dismiss();
      }) ;
    });
  
  });
  }





  done(){
    this.navCtrl.pop();
  }
    
}
