import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';



@IonicPage()
@Component({
  selector: 'page-user-view-cart',
  templateUrl: 'user-view-cart.html',
})
export class UserViewCartPage {
  userKey = this.navParams.get("key");
  cart :Array<any> = [];
  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams) {
    // this.getCart();
  }

/*  getCart(){
    firebase.database().ref("Users/").child(this.userKey+"/Cart/").once('value',itemSnapshot=>{
      this.cart = [];
      itemSnapshot.forEach(itemSnap=>{
        firebase.database().ref("")
        console.log(itemSnap.val());
        return false;
      })
    })
  }
*/

  done(){
    this.navCtrl.pop();
  }
  
}
