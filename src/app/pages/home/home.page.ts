import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { User } from '../../interfaces/user';
import { ApiService } from '../../services/api/api.service';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private user: User;
  private hasMessage: boolean = false;

  constructor(
    private camera: Camera,
    private api: ApiService,
    private navCtrl: NavController,
    private storage: StorageService,
  ){ }

  ngOnInit(){
    this.user = this.storage.getUser();
    this.api.getMessages(this.user.id).subscribe(data => {
      this.hasMessage = data.filter(x => x.new == true).length > 0
    })
  }

  setAvatar(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM
    }

    this.camera.getPicture(options).then(imageData => {
      this.user.avatar = 'data:image/jpeg;base64,' + imageData;
      this.api.putUser(this.user, this.user.id)
    }, (err) => {
      console.log(err)
    })
  }

  goToMessages(){
    this.navCtrl.navigateForward('message')
  }
}
