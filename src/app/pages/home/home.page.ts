import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { User } from '../../interfaces/user';
import { Message } from '../../interfaces/message';
import { ApiService } from '../../services/api/api.service';
import { StorageService } from '../../services/storage/storage.service';
import { FunctionsService } from '../../services/functions/functions.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private user: User;
  private user_id: string = 'youper-v4';
  private hasMessage: boolean = false;

  constructor(
    private camera: Camera,
    private api: ApiService,
    private navCtrl: NavController,
    private storage: StorageService,
    private functions: FunctionsService
  ){ }

  ngOnInit(){
    this.api.getUser(this.user_id).subscribe(data => {
      data.id = this.user_id;
      this.user = data;
    });

    this.api.getMessages().then((data: Message[]) => {
      this.hasMessage = data.filter(x => x.new == true).length > 0;
    });
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
      this.api.putUser(this.user.id, this.user);
      this.storage.setUser(this.user);
      this.functions.message('Success! Picture saved.');
    }, (err) => {
      this.functions.message('Error! '+err);
    })
  }

  goToMessages(){
    this.navCtrl.navigateForward('message');
  }
}
