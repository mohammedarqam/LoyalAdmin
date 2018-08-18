import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-edit-restaurants',
  templateUrl: 'edit-restaurants.html',
})
export class EditRestaurantsPage {
  restaurant = this.navParams.get("rest");

  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams) {
    console.log(this.restaurant)
  }




  cancel(){
    this.navCtrl.pop();
  }
  // capsName(Name){
  //   this.Name = Name.toUpperCase();
  // }
  // capsContactPerson(ContactPerson){
  //   this.ContactPerson = ContactPerson.toUpperCase();
  // }
}
