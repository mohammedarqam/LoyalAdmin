import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';



@IonicPage()
@Component({
  selector: 'page-restaurant-details',
  templateUrl: 'restaurant-details.html',
})
export class RestaurantDetailsPage {

  rest = this.navParams.get("rest");

  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams) {
  }

  done(){
    this.navCtrl.pop();
  }
  
}
