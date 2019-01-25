import { Injectable } from '@angular/core';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { }

  async loading(text='Aguarde...') {
    const loader = await this.loadingCtrl.create({
      message: text,
      spinner: 'crescent'
    })
    await loader.present()
    return loader
  }

  message(text, duration=4000, position=null) {
    this.toastCtrl.create({
      message: text,
      duration: duration,
      position: position || 'bottom'
    }).then(toast => toast.present())
  }

  showAlert(title, text){
    this.alertCtrl.create({
      header: title,
      message: text,
      buttons: ['Ok']
    }).then(alert => alert.present())
  }

  showAlertConfirm(title=null, text=null){
    return new Promise((resolve, reject) => {
      this.alertCtrl.create({
        header: title || 'Atenção',
        message: text || 'Deseja mesmo continuar?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              reject(false);
            }
          },
          {
            text: 'Confirmar',
            handler: () => {
              resolve(true)
            }
          }
        ]
      }).then(alert => alert.present())
    })
  }
}
