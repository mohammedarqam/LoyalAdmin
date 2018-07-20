import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import * as firebase from 'firebase';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = "ViewRestaurantsPage";
  activePage: any;


  pages: Array<{ title: string, component: any, icon: any }>;

  constructor(public platform: Platform,) {
    this.initializeApp();

    this.pages = [
      { title: 'Home', component: HomePage, icon: "home" },
      { title: 'Restaurants', component: "ViewRestaurantsPage", icon: "home" },
      { title: 'Menus', component: "ViewMenusPage", icon: "home" },


    ];
    this.activePage = this.pages[1];

  }

  initializeApp() {
    this.platform.ready().then(() => {
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
    this.activePage = page;

  }
  checkActive(page) {
    return page == this.activePage;
  }

  signOut() {
    firebase.auth().signOut().then(() => {
      this.nav.setRoot("LoginPage");
    }).catch((error) => {
      console.log(error.message);
    });
 
}

}
