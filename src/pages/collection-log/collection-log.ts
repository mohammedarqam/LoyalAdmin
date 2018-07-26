import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';



@IonicPage()
@Component({
  selector: 'page-collection-log',
  templateUrl: 'collection-log.html',
})
export class CollectionLogPage {

  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams) {
    this.getRestaurants();
  }

  logRef = firebase.database().ref("CollectionLog/");
  logs : Array<any> = [];
  logsLoaded : Array<any> =[];

  getRestaurants(){
    this.logRef.once('value',itemSnapshot=>{
      let tempArray = [];
      itemSnapshot.forEach(itemSnap =>{
        var temp = itemSnap.val();
        temp.key = itemSnap.key;
        tempArray.push(temp);
        return false;
      }) ;
      this.logs = tempArray;
      this.logsLoaded = tempArray;
    });
  }
  
  
  initializeItems(): void {
    this.logs = this.logsLoaded;
  }
  getItems(searchbar) {
    this.initializeItems();
    let q = searchbar;
    if (!q) {
      return;
    }
    this.logs = this.logs.filter((v) => {
      if(v.RestaurantName && q) {
        if (v.RestaurantName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }
  




  
}
