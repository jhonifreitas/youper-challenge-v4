import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { User } from './interfaces/user';
import { ApiService } from './services/api/api.service';
import { StorageService } from './services/storage/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  private user: User = {id: 't9l18UKPut3npvMzNNjC', avatar: '', createdAt: new Date().getTime()};

  constructor(
    private api: ApiService,
    private platform: Platform,
    private statusBar: StatusBar,
    private storage: StorageService,
    private splashScreen: SplashScreen,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if(this.platform.is('cordova')){
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      }

      this.storage.setUser(this.user);
      this.api.getUser(this.user.id).subscribe(data => {
        this.storage.setUser({ id: this.user.id, ...data});
      });
    });
  }
}
