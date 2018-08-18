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
  restaurantsLoaded : Array<any> =[];
  menuRef = firebase.database().ref("Menus");
  menuItems : Array<any>=[];
  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams) {
    this.getRestaurants();
  }


  getRestaurants(){
    this.resRef.once('value',itemSnapshot=>{
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
  
  addToItems(resKey){
      this.menuRef.child(resKey).once('value',itemSnapshot=>{
      this.menuItems = [];
      itemSnapshot.forEach(itemSnap =>{
        var temp = itemSnap.val();
        temp.key = itemSnap.key;
        this.menuItems.push(temp);
        return false;
      });
    });
  }
clear(){
  this.menuItems = [];
}
}
