import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import * as firebase from 'firebase';



@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {

  userRef = firebase.database().ref("Users/");
  users : Array<any> =[];
  loadedUsers : Array<any>=[];


  constructor(
  public navCtrl: NavController, 
  public modalCtrl : ModalController,
  public navParams: NavParams) {
    this.getUsers();
  }


  getUsers(){
    this.userRef.once('value',itemSnapshot=>{
      let tempArray = [];
      itemSnapshot.forEach(itemSnap =>{
        var temp = itemSnap.val();
        temp.key = itemSnap.key;
        tempArray.push(temp);
        return false;
      });
      this.users = tempArray;
      this.loadedUsers = tempArray;
    });
  }

initializeItems(): void {
  this.users = this.loadedUsers;
}
getItems(searchbar) {
  this.initializeItems();
  let q = searchbar;
  if (!q) {
    return;
  }
  this.users = this.users.filter((v) => {
    if(v.Name && q) {
      if (v.Name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    }
  });
}
viewCart(key){
  let profileModal = this.modalCtrl.create("UserViewCartPage",{key : key});
  profileModal.present();
}
viewRestaurants(key){
  let profileModal = this.modalCtrl.create("UserViewRestaurantsPage",{key : key});
  profileModal.present();
}
}
