import { Component, trigger, state, style, transition, animate, group } from '@angular/core';
import PubNub from 'pubnub';
import { Vibration } from 'ionic-native';

import { Platform, NavController, ModalController } from 'ionic-angular';

import { About } from '../about/about';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [ //:enter
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('225ms 200ms ease-out') // Length of animation | Wait before animation | easing
      ]),
      transition('* => void', [ //:leave
        group([
          animate('195ms 150ms ease-in', style({
            transform: 'translateX(100%)'
          })),
          animate('100ms 225ms ease-in', style({
            opacity: 0
          })),
          animate('195ms 300ms ease-out', style({
            height: 0
          }))
        ])
        
      ])
    ])
  ]
})
export class HomePage {

  pubnub = new PubNub({
    subscribeKey: 'sub-c-ed3469b0-b1ca-11e6-b4d6-02ee2ddab7fe', // always required
    publishKey: 'pub-c-b414e284-a556-45e2-b415-eb9b867f7788', // only required if publishing
    ssl: true
  });

  cards = [];

  pictures = [
    "http://www.torellomountainfilm.com/wp-content/uploads/2015/01/proper-harvest-times.jpg",
    "http://www.stmellonsbaptist.org.uk/wp-content/uploads/2013/09/harvest-1024x393.jpg",
    "http://images.huffingtonpost.com/2010-10-26-images-KatherineGrapePicking.jpg",
    "https://i.ytimg.com/vi/6YCnU5VgX9M/maxresdefault.jpg",
    "https://i.ytimg.com/vi/pvMCyNvxw8A/maxresdefault.jpg",
    "https://www.colourbox.com/preview/4225759-potato-plant.jpg",
    "http://hub.suttons.co.uk/wp-content/uploads/2014/09/grafted-sweet-potato-plants-harvesting.jpg",
    "http://ladyleeshome.com/wp-content/uploads/2016/01/How-to-plant-potatoes.jpg"
  ];

  platform;

  constructor(platform: Platform, public navCtrl: NavController, public modalCtrl: ModalController) {
    let self = this;
    self.platform = platform;

    // localStorage.setItem('showAbout', '');
    // if(localStorage.getItem('showAbout') !== 'false') {
    //   self.presentAboutModal();
    //   localStorage.setItem('showAbout', 'false');
    // }
    
    this.pubnub.addListener({
      message: function(message) {
        console.log("Message received!", message);
        self.addCard(message.message);
        
        if(self.platform === 'mobileweb') {
          (<any>window).navigator.vibrate(100);
        } else {
          Vibration.vibrate(100);
        } 
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

  showAboutModal() {
    let aboutModal = this.modalCtrl.create(About);
    (<any>document).getElementsByName('theme-color')[0].setAttribute('content', '#387ef5');
    (<any>document).getElementsByName('apple-mobile-web-app-status-bar-style')[0].setAttribute('content', '#387ef5');
    aboutModal.present();
  }
  
  addCard(message) {
    this.cards.push(message);
    // localStorage.setItem('cards', JSON.stringify(this.cards));
  };

  deleteCard(index) {
    this.cards.splice(index,1);
  }

  acceptCard(index) {
    this.cards[index].accepted = true;
  }

}
