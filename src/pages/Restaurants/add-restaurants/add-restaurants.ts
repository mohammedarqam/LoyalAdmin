import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-add-restaurants',
  templateUrl: 'add-restaurants.html',
})
export class AddRestaurantsPage {
  
  Name : string;
  PhoneNo : string;
  Address : string;
  ContactPerson : string;
  Email : string;
  Password : string = this.generatePassword();
  Description : string = null;
  LoyalProfit : string;
  ProfitToLoyalPercentage : string="0";
  VisitsL : string = "3";

  //Admin Variables
  adminPass :string;
  adminEmail : string;
  // Runtime Variables
  key : string;

  constructor(
  public navCtrl: NavController, 
  public loadingCtrl : LoadingController,
  public toastCtrl : ToastController,
  public alertCtrl : AlertController,
  ) {
  }

  ionViewDidEnter(){
    this.getAdmin();
  }

  getAdmin(){
    if(firebase.auth().currentUser){
      firebase.database().ref("Admins/").child(firebase.auth().currentUser.uid).once('value',itemSnap=>{
        this.adminEmail = itemSnap.val().Email;
        this.adminPass=itemSnap.val().Password;
      })
      }else{
        this.navCtrl.setRoot("LoginPage");
      }
  }




  addConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Admin Password',
      message :"Enter Your Admin Password",
      inputs: [
        {
          name: 'password',
          placeholder: 'Password',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
          }
        },
        {
          text: 'Verify',
          handler: data => {
            if (data.password==this.adminPass) {
              this.add();
            } else {
              this.presentWrongPass();
              
              return false;
            }
          }
        }
      ]
    });
    alert.present();
  }

  add(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    
    //Signing Up Restaurant Admin
    firebase.auth().createUserWithEmailAndPassword(this.Email,this.Password).catch((e)=>{
      alert(e.message);
      loading.dismiss();
    }).then(()=>{
      //Adding Restaurant
      var uid = firebase.auth().currentUser.uid;
        firebase.database().ref("Restaurants/").child(firebase.auth().currentUser.uid).set({
          RestaurantName : this.Name,
          Address : this.Address,
          Description : this.Description,
          LoyalProfit : this.LoyalProfit,
          ProfitToLoyalPercentage : this.ProfitToLoyalPercentage,
          CreditDue : 0,
          AmountPendingToLoyal : 0,
          TotalOrders : 0,
          Name : this.ContactPerson,
          PhoneNo : this.PhoneNo,
          Email : this.Email,
          Password : this.Password,
          MinimumVisits : this.VisitsL
    }).then(()=>{
              //Signing Restaurant Admin Out
              firebase.auth().signOut().then(()=>{
                // Signing Back in as the Admin
                firebase.auth().signInWithEmailAndPassword(this.adminEmail,this.adminPass).then(()=>{
                  this.presentToast();
                }).then(()=>{
                  this.adminEmail = null;
                  this.adminPass = null;
                  this.navCtrl.setRoot("ViewRestaurantsPage")
                  loading.dismiss();
                })
              })
            })
        })


  }


  generatePassword() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

  presentToast() {
    let toast = this.toastCtrl.create({
      message: this.Name + "is Added as a Restaurant",
      duration: 4000,
      showCloseButton: false,
    });
    toast.present();
  }
  presentWrongPass() {
    let toast = this.toastCtrl.create({
      message: "Wrong Password",
      duration: 4000,
      showCloseButton: false,
    });
    toast.present();
  }



  capsName(Name){
    this.Name = Name.toUpperCase();
  }
  capsContactPerson(ContactPerson){
    this.ContactPerson = ContactPerson.toUpperCase();
  }
}
