import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';

import { DetailPage } from '../detail/detail.page';
import { Message } from '../../../interfaces/message';
import { ApiService } from '../../../services/api/api.service';
import { StorageService } from '../../../services/storage/storage.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  private list: Array<Message> = [];

  constructor(
    private api: ApiService,
    private navCtrl: NavController,
    private storage: StorageService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    let user_id = this.storage.getUser().id;
    this.api.getMessages(user_id).subscribe(data => {
      this.list = data;
    })
  }

  async goToDetail(message){
    const modal = await this.modalCtrl.create({
      component: DetailPage,
      componentProps: {'object': message}
    });
    return await modal.present();
  }

  goBack(){
    this.navCtrl.goBack();
  }
}
