import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen, Vibration } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';

// declare var FCMPlugin;

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      // if(localStorage.getItem('homeContent') != '') {
        // document.getElementById("homeContent").innerHTML = localStorage.getItem('homeContent');
      // }

      this.initializeFCM();
      // Vibration.vibrate(2000);
    });
  }

  // Firebase Cloud Messaging, for notifications
  initializeFCM() {
    // FCMPlugin.getToken(
    //   function (token) {
    //     console.log("registration event: " + token);
    //     // document.getElementById("regId").innerHTML = token;
    //     // let oldRegId = localStorage.getItem('token');
    //     // if (oldRegId !== token) {
    //     //   // Save new registration ID
    //     //   localStorage.setItem('token', token);
    //     // }
    //   },
    //   function (err) {
    //     console.log('error retrieving token: ' + err);
    //   }
    // );
    
    // FCMPlugin.onNotification(
    //   function(data) {
    //     Vibration.vibrate([100,50,500]);
    //     if(data.wasTapped) {
    //       //Notification was received on device tray and tapped by the user.
    //       // alert( JSON.stringify(data) );
    //     } else{
    //       //Notification was received in foreground. Maybe the user needs to be notified.
    //       // alert( JSON.stringify(data) );
    //     }
    //   },
    //   function(msg){
    //     console.log('onNotification callback successfully registered: ' + msg);
    //   },
    //   function(err){
    //     console.log('Error registering onNotification callback: ' + err);
    //   }
    // );
  };

}
