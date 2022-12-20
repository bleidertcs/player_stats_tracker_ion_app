import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;

  constructor(
    public fb: FormBuilder,
    public alertController: AlertController,
    private auth: AuthService
  ) {

    this.formularioLogin = this.fb.group({
      'nombre': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required)
    })

  }

  ngOnInit() {
  }

  async ingresar() {
    var f = this.formularioLogin.value;

    var usuario = JSON.parse(localStorage.getItem('usuario') || '{}');

    if (usuario.nombre == f.nombre && usuario.password == f.password) {
      console.log('Ingresado');
    } else {
      const alert = await this.alertController.create({
        header: 'Datos incorrectos',
        message: 'Los datos que ingresaste son incorrectos.',
        buttons: ['Aceptar']
      });

      await alert.present();
    }
  }

  test() {
    let data = {
      email: "zheng@gmail.com",
      password: "1234"
    }

    this.auth.call(data, 'login', 'POST', false).subscribe(response => {
      console.log(response);
    })
  }
}
