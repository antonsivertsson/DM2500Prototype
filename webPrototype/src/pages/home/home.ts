import { Component } from '@angular/core';
import PubNub from 'pubnub';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  pubnub = new PubNub({
    subscribeKey: 'sub-c-ed3469b0-b1ca-11e6-b4d6-02ee2ddab7fe', // always required
    publishKey: 'pub-c-b414e284-a556-45e2-b415-eb9b867f7788' // only required if publishing
  });


  constructor(public navCtrl: NavController) {
        this.pubnub.addListener({
            message: function(message) {
                console.log("Message received!", message);
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
    var publishConfig = {
        channel : "ShareGrow",
        message : "Harvest that shit!"
    }
    this.pubnub.publish(publishConfig, function(status, response) {
        console.log(status, response);
    })
  }


}
