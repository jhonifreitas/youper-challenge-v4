import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';

import { DetailPage } from '../detail/detail.page';

@Component({
  selector: 'app-message-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  private list: Array<Object> = [
    {
      date: Date(),
      title: 'New Feature!',
      body: 'Now you can customize your avatar uploading your selfie.<br/>Just click on the avatar, take or select a picture and save.<br/><img src="http://server/newfeature.png"/>',
      read: false
    },
    {
      date: Date(),
      title: 'New Feature!',
      body: 'Now you can customize your avatar uploading your selfie.<br/>Just click on the avatar, take or select a picture and save.<br/><img src="http://server/newfeature.png"/>',
      read: true
    }
  ]

  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  async goToDetail(message){
    const modal = await this.modalCtrl.create({
      component: DetailPage,
      componentProps: {'object': message}
    });
    return await modal.present()
  }

  goBack(){
    this.navCtrl.goBack()
  }
}
