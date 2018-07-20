import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';



@IonicPage()
@Component({
  selector: 'page-view-menus',
  templateUrl: 'view-menus.html',
})
export class ViewMenusPage {

  resRef = firebase.database().ref("Restaurants/");
  restaurants : Array<any> =[];
  menuRef = firebase.database().ref("Menus");
  menuItems : Array<any>=[];

  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams) {
    this.resRef.once('value',itemSnapshot=>{
      this.restaurants=[];
      itemSnapshot.forEach(itemSnap =>{
        var temp = itemSnap.val();
        temp.key = itemSnap.key;
        this.restaurants.push(temp);
        return false;
      });
    });

  }

  addToItems(resKey){

    console.log(resKey);
      this.menuRef.child(resKey).once('value',itemSnapshot=>{
      this.menuItems = [];
      itemSnapshot.forEach(itemSnap =>{
        var temp = itemSnap.val();
        temp.key = itemSnap.key;
        this.menuItems.push(temp);
        console.log(itemSnap.val());
        return false;
      });
    });
  }

}
