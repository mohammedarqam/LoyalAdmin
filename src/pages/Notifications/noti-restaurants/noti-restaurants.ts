import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import * as firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-noti-restaurants',
  templateUrl: 'noti-restaurants.html',
})
export class NotiRestaurantsPage {

  rests : Array<any> = this.navParams.get("restaurants");
  restNames : Array<any> = [];
  restRef= firebase.database().ref("Restaurants");

  constructor(
  public navCtrl: NavController, 
  public viewCtrl : ViewController,
  public navParams: NavParams) {
    this.getRestaurants();
  }

getRestaurants(){
  console.log(this.rests);
   for(var i=0;i<this.rests.length;i++){
    this.restRef.child(this.rests[i]).once('value',snapShot=>{
      this.restNames.push(snapShot.val().RestaurantName);
    })
   }
   console.log(this.restNames);
}

done(){
  this.navCtrl.pop();
}

}
