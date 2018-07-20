import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import * as firebase from 'firebase';


firebase.initializeApp({
  apiKey: "AIzaSyAJcctpBmc663-f52DT8SZdO74dFiJk4m0",
  authDomain: "loyalcodebro.firebaseapp.com",
  databaseURL: "https://loyalcodebro.firebaseio.com",
  projectId: "loyalcodebro",
  storageBucket: "loyalcodebro.appspot.com",
  messagingSenderId: "80615788011"
});


@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
