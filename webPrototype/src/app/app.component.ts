import { Component } from '@angular/core';
import { Platform, ToastController } from 'ionic-angular';
import { StatusBar, Vibration } from 'ionic-native';
// import { Headercolor } from 'HeaderColor'

import { TabsPage } from '../pages/tabs/tabs';

declare var FCMPlugin;

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform, private toastCtrl: ToastController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // StatusBar.styleDefault();
      StatusBar.backgroundColorByHexString('#1c9c44');
      (<any>window).plugins.headerColor.tint("#1c9c44"); // Recent apps header
      this.initializeFCM();
    });
  }

  // Firebase Cloud Messaging, for notifications
  initializeFCM() {
    let self = this;

    FCMPlugin.getToken(
      function (token) {
        console.log("registration event: " + token);
        // let oldRegId = localStorage.getItem('token');
        // if (oldRegId !== token) {
        //   // Save new registration ID
        //   localStorage.setItem('token', token);
        // }
      },
      function (err) {
        console.log('error retrieving token: ' + err);
      }
    );
    
    FCMPlugin.onNotification(
      function(data) {
        if(data.wasTapped) {
          //Notification was received on device tray and tapped by the user.
          self.presentToast(data);
        } else{
          //Notification was received in foreground. Maybe the user needs to be notified.
          Vibration.vibrate([80,50,200]);
          self.presentToast(data);
        }
      },
      function(msg){
        console.log('onNotification callback successfully registered: ' + msg);
      },
      function(err){
        console.log('Error registering onNotification callback: ' + err);
      }
    );
  };

  // handleNotification(data) {
  //   if(data.wasTapped) {
  //     //Notification was received on device tray and tapped by the user.
  //     this.presentToast(data);
  //   } else{
  //     //Notification was received in foreground. Maybe the user needs to be notified.
  //     Vibration.vibrate([80,50,200]);
  //     this.presentToast(data);
  //   }
  // }

  presentToast(data) {
    let toast = this.toastCtrl.create({
      message: data.title,
      duration: 5000,
      position: 'bottom',
      showCloseButton: true,
      closeButtonText: 'OK'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}
