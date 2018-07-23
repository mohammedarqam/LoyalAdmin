import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import * as firebase from 'firebase';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = "HomePage";
  activePage: any;


  pages: Array<{ title: string, component: any, icon: any }>;

  constructor(public platform: Platform,) {
    this.initializeApp();

    this.pages = [
      { title: 'Home', component: "HomePage", icon: "home" },
      { title: 'Restaurants', component: "ViewRestaurantsPage", icon: "md-pizza" },
      { title: 'Menus', component: "ViewMenusPage", icon: "md-paper" },
      { title: 'Users', component: "UsersPage", icon: "ios-people" },
      { title: 'Notifications', component: "NotificationTabsPage", icon: "ios-mail" },
      { title: 'Concerns', component: "ConcernsViewPage", icon: "ios-mail" },
      { title: 'Collection Log', component: "CollectionLogPage", icon: "ios-mail" },


    ];
    this.activePage = this.pages[0];

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
