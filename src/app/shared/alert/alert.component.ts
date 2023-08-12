import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}

interface AlertOptions {
  title: string,
  text?: string,
  button: any
  alertController: AlertController
}

export async function alertModal(options: AlertOptions) {
  const alert = await options.alertController.create({
    header: options.title,
    message: options.text,
    buttons: options.button,
  });

  return await alert.present();
}
