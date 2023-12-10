import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(private alertController: AlertController) { }


  async presentAlert(header:string, message:string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['Aceptar']
    });
  
    await alert.present();
  }

}
