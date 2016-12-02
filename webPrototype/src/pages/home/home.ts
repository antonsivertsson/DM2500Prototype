import { Component } from '@angular/core';
import PubNub from 'pubnub';
import { Vibration } from 'ionic-native';

import { NavController } from 'ionic-angular';

declare var FCMPlugin;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  pubnub = new PubNub({
    subscribeKey: 'sub-c-ed3469b0-b1ca-11e6-b4d6-02ee2ddab7fe', // always required
    publishKey: 'pub-c-b414e284-a556-45e2-b415-eb9b867f7788' // only required if publishing
  });

  cards = [];

  constructor(public navCtrl: NavController) {
    let self = this;
    
    this.pubnub.addListener({
      message: function(message) {
        console.log("Message received!", message);
        self.addCard(message.message);
        Vibration.vibrate([10]);
      },
      presence: function(presenceEvent) {
        // handle presence
      }
    })

    console.log("Subscribing..");
    this.pubnub.subscribe({
      channels: ['hello_world', "ShareGrow"]
    });
  }

  clicked() {
    console.log("clicked yeah");

    // this.cards.push({title: 'apa', message:'fisk'})
    
    var publishConfig = {
      channel: "ShareGrow",
      message: {
        title: "Yo, dawg",
        message: "Harvest that shit!",
        style: "picture",
        picture: "http://www.stmellonsbaptist.org.uk/wp-content/uploads/2013/09/harvest-1024x393.jpg"
      }
    }
    this.pubnub.publish(publishConfig, function(status, response) {
      console.log(status, response);
    })
  }
  
  addCard(message) {
    this.cards.push(message);
    // localStorage.setItem('cards', JSON.stringify(this.cards));
  };


}
