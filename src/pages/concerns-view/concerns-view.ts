import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import * as firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-concerns-view',
  templateUrl: 'concerns-view.html',
})
export class ConcernsViewPage {

  concernsRef = firebase.database().ref("Loyal Concerns/");
  pendingConcerns : Array<any> = [];
  attendedConcerns : Array<any> = [];

  constructor(
  public navCtrl: NavController, 
  public loadingCtrl : LoadingController,
  public alertCtrl : AlertController,
  public toastCtrl : ToastController,
  public navParams: NavParams) {
    this.getConcerns();
  }

  getConcerns(){
      this.pendingConcerns = [];
      this.attendedConcerns = [];

    firebase.database().ref("Loyal Concerns/").once('value',itemSnapshot=>{
      itemSnapshot.forEach(itemSnap=>{
          var temp = itemSnap.val();
          temp.key = itemSnap.key;
            if(itemSnap.val().Status == "Pending"){
              this.pendingConcerns.push(temp);
            }else{
              this.attendedConcerns.push(temp);
            }
        return false;
        })
      })
  }

  respondOpen(cons){
      let alert = this.alertCtrl.create({
        title: cons.Concern,
        message : cons.Description,
        inputs: [
          {
            name: 'response',
            placeholder: 'Enter the Response',
            type :'text'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: data => {
              this.presentToast("Cencelled");
            }
          },
          {
            text: 'Send Response',
            handler: data => {
              if (data.response) {
                this.respond(cons,data.response);
              } else {
                this.presentToast("Response Empty")
              }
            }
          }
        ]
      });
      alert.present();
  }

  respond(con, resp){
    var key = con.key;
    delete con.key;
    con.Response = resp;
    con.Status = "Attended";
    firebase.database().ref("Loyal Concerns").child(key).set(con).then(()=>{
      this.getConcerns();
    })
  }


  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 4000,
      showCloseButton: false,
    });
    toast.present();
  }




}
