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
  }

}
