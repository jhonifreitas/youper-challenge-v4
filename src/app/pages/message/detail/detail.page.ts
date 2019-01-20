import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

import { Message } from '../../../interfaces/message';
import { ApiService } from '../../../services/api/api.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  private object: Message = this.navParam.get('object')

  constructor(
    private api: ApiService,
    private navParam: NavParams,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.object.new = false;
    this.api.putMessage(this.object, this.object.id)
  }

  close(){
    this.modalCtrl.dismiss()
  }
}
