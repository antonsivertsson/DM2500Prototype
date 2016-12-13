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
    "http://www.rodalesorganiclife.com/sites/rodalesorganiclife.com/files/styles/slideshow-desktop/public/airyspot_ahmad_faizal_yahya_102522.jpg?itok=ygPHiX3H",
    "https://i.ytimg.com/vi/pvMCyNvxw8A/maxresdefault.jpg",
    "https://www.colourbox.com/preview/4225759-potato-plant.jpg",
    "http://ladyleeshome.com/wp-content/uploads/2016/01/How-to-plant-potatoes.jpg"
  ];

  titles = [
    "Harvest tomatoes in R1",
    "Potatoes away!",
    "Potatoes in R1. Come get some!",
    "Potato is love"
  ];

  texts = [
    "Some tomatoes need harvesting at the R1 plantation!",
    "It's time to go get those poatoes you love so much!",
    "R1 has the best potatoes in the North. You should harvest some!",
    "Some potatoes need your help to leave the earth."
  ];

  donePictures = [
    "http://mortgageeducators.com/images/thumbs-up-2.jpg",
    "http://img04.deviantart.net/4bca/i/2011/321/1/c/happy_forest_by_shantasphotos-d4ggeqm.jpg",
    "http://www.qualityunearthed.co.uk/blog/wp-content/uploads/2014/09/Really-happy-people.jpg",
    "http://img04.deviantart.net/4bca/i/2011/321/1/c/happy_forest_by_shantasphotos-d4ggeqm.jpg"
  ]

  doneTitles = [
    "Tomato harvesting done!",
    "Well done!",
    "Potatoes harvested!",
    "Potato is life"
  ];

  doneTexts = [
    "Good job harvesting those tomatoes😄😄",
    "You harvested 8 kgs of potatoes. The environment thanks you!",
    "You've fed 5 people in your community today. You are so incredible!😗",
    "You harvested 10 kgs of potatoes, well done! The forest thank you, it is forever grateful."
  ]

  platform;

  messageIndex;

  constructor(platform: Platform, public navCtrl: NavController, public modalCtrl: ModalController) {
    let self = this;
    self.platform = platform;
    self.messageIndex = Math.floor(Math.random()*self.texts.length);

    // let storageCards = localStorage.getItem('cards');
    // self.cards = JSON.parse(storageCards);
    
    this.pubnub.addListener({
      message: function(message) {
        console.log("Message received!", message);

        let card = message.message;
        card.title = self.titles[self.messageIndex];
        card.body = self.texts[self.messageIndex];
        card.picture = (card.type=="harvest") ? self.pictures[self.messageIndex] : self.donePictures[self.messageIndex];
        card.doneTitle = self.doneTitles[self.messageIndex];
        card.doneBody = self.doneTexts[self.messageIndex];

        if(card.type === "done") {
          self.removeCards();
          self.messageIndex = (self.messageIndex+1)%self.texts.length;
        }

        self.addCard(card);
        
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
    // if(message.typ === "done") {
    //   setTimeout(function() {
        
    //   }, 3000);
    // }
    // localStorage.setItem('cards', JSON.stringify(this.cards));
  };

  deleteCard(index) {
    this.cards.splice(index,1);
    // localStorage.setItem('cards', JSON.stringify(this.cards));
  }

  acceptCard(index) {
    this.cards[index].accepted = true;
  }

  completeCard(index) {
    this.cards[index].type = "done";
    this.cards[index].picture = this.donePictures[this.messageIndex];
  }

  removeCards() {
    this.cards = [];
  }

}
