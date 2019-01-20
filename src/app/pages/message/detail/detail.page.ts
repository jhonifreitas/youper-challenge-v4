import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  private object: any = this.navParam.get('object')

  constructor(
    private navParam: NavParams,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() { }

  close(){
    this.modalCtrl.dismiss()
  }

}
