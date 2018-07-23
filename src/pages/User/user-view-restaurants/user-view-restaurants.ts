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
    // this.sad();
  }


sad(){
  console.log(this.userKey);
}


  getRestaurants(){

    firebase.database().ref("Users/"+this.userKey+"/Restaurants/").once('value',itemSnapshot=>{
      this.restaurants = [];
      itemSnapshot.forEach(itemSnap=>{
        var temp = itemSnap.val();
        temp.key = itemSnap.key;
        this.restaurants.push(temp);
        console.log(this.restaurants);
        return false;
      });
    });
  }





  done(){
    this.navCtrl.pop();
  }
    
}
