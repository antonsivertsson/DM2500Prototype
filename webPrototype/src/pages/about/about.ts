import { Component } from '@angular/core';

import { ViewController } from 'ionic-angular';

@Component({
  selector: 'about',
  templateUrl: 'about.html'
})
export class About {

  constructor(private viewCtrl: ViewController) {

  }

  dismiss() {
    this.viewCtrl.dismiss();
    (<any>document).getElementsByName('theme-color')[0].setAttribute('content', '#2abc55');
    (<any>document).getElementsByName('apple-mobile-web-app-status-bar-style')[0].setAttribute('content', '#2abc55');
  }

}
