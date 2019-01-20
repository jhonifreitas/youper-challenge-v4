import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private hasMessage: boolean = false;

  constructor(
    private navCtrl: NavController
  ){ }

  goToMessages(){
    this.navCtrl.navigateForward('message')
  }
}
