import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { loadingSpinner } from '../loading/loading.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  emailPattern = /^(([a-zA-Z0-9]([\.\-\_]){1})|([a-zA-Z0-9]))+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4}|[a-zA-Z]{1,3}\.[a-zA-Z]{1,3})$/;
  passwordPattern = /^(?=(?:.*\d){1})(?=(?:.*[A-Z]){1})(?=(?:.*[a-z]){1})\S{5,20}$/;

  formularioLogin: FormGroup;
  passwordVisibility: boolean = true;

  constructor(
    public fb: FormBuilder,
    public alertController: AlertController,
    private auth: AuthService,
    public loadingCtrl: LoadingController,
  ) {

    this.formularioLogin = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      password: new FormControl('', [Validators.required, Validators.pattern(this.passwordPattern)])
    })

  }

  ngOnInit() {
  }

  validateEmail(event: KeyboardEvent) {
    return !(event.key === ' ');
  }

  checkEmail() {
    if (this.formularioLogin.controls['email'].value[0] === ' ') {
      this.formularioLogin.controls['email'].reset();
    }
  }

  validatePassword(event: KeyboardEvent) {
    return !(event.key === ' ');
  }

  checkPassword() {
    if (this.formularioLogin.controls['password'].value[0] === ' ') {
      this.formularioLogin.controls['password'].reset();
    }
  }

  showPassword() {
    if (this.passwordVisibility === true) {
      this.passwordVisibility = false;
    } else {
      this.passwordVisibility = true;
    }
  }

  async ingresar() {
    loadingSpinner(this.loadingCtrl)

    let f = this.formularioLogin.value;

    let usuario = JSON.parse(localStorage.getItem('usuario') || '{}');


    if (f.email != undefined && f.password != undefined) {
      const alert = await this.alertController.create({
        header: 'Datos correctos',
        buttons: ['Aceptar']
      });

      await alert.present();
      this.loadingCtrl.dismiss();
    } else {
      const alert = await this.alertController.create({
        header: 'Datos incorrectos',
        message: 'Los datos que ingresaste son incorrectos.',
        buttons: ['Aceptar']
      });

      await alert.present();
      this.loadingCtrl.dismiss();
    }
  }

  testSquad() {
    loadingSpinner(this.loadingCtrl)

    let team = 2808

    this.auth.call(null, `squad/${team}`, 'GET', false).subscribe({
      next: (response) => {
        if (response.status === 'SUCCESS') {
          console.log(response);
          this.loadingCtrl.dismiss();
        } else {
          console.log(response);
          this.loadingCtrl.dismiss();
        }
      },
      error: (error) => {
        console.log(error);
        this.loadingCtrl.dismiss();
      }
    })
  }

  testPlayer() {
    loadingSpinner(this.loadingCtrl)

    let id = 52561;
    let season = 2022;
    let league = 299;

    this.auth.call(null, `player/${id}/${season}/${league}`, 'GET', false).subscribe({
      next: (response) => {
        if (response.status === 'SUCCESS') {
          console.log(response);
          this.loadingCtrl.dismiss();
        } else {
          console.log(response);
          this.loadingCtrl.dismiss();
        }
      },
      error: (error) => {
        console.log(error);
        this.loadingCtrl.dismiss();
      }
    })
  }
}
