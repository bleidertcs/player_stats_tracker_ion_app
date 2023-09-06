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

// interface AlertOptions {
//   title: string,
//   text?: string,
//   cancelButton?: boolean,
//   cancelButtonText?: string
//   confirmButtonText?: string,
//   showConfirmButton?: boolean,
//   icon: SweetAlertIcon,
//   html?: string,
// }

// export async function alertModal(options: AlertOptions) {
//   return Swal.fire({
//     html: options.html,
//     title: options.title,
//     text: options.text,
//     icon: options.icon,
//     confirmButtonColor: 'rgb(39,73,139,1)',
//     showConfirmButton: options.showConfirmButton == null ? true : options.showConfirmButton,
//     confirmButtonText: options.confirmButtonText == null ? 'Aceptar' : options.confirmButtonText,
//     showCancelButton: options.cancelButton,
//     cancelButtonText: options.cancelButtonText,
//     cancelButtonColor: 'rgb(186, 74, 0)',
//     reverseButtons: true,
//     heightAuto: false,
//     allowOutsideClick: false,
//     allowEscapeKey: false,
//   });
// }