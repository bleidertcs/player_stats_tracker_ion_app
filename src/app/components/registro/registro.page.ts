import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { loadingSpinner } from '../../shared/loading/loading.component';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  namePattern = /^[a-zA-ZñÑáÁéÉíÍóÓúÚ ]+$/;
  passwordPattern = /^(?=(?:.*\d){1})(?=(?:.*[A-Z]){1})(?=(?:.*[a-z]){1})\S{5,20}$/;
  emailPattern = /^(([a-zA-Z0-9]([\.\-\_]){1})|([a-zA-Z0-9]))+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4}|[a-zA-Z]{1,3}\.[a-zA-Z]{1,3})$/;

  formularioRegistro: FormGroup;
  passwordVisibility: boolean = true;

  constructor(
    public fb: FormBuilder,
    public alertController: AlertController,
    private auth: AuthService,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController
  ) {
    this.formularioRegistro = this.fb.group({
      firstName: new FormControl("", [Validators.required, Validators.pattern(this.namePattern)]),
      lastName: new FormControl("", [Validators.required, Validators.pattern(this.namePattern)]),
      email: new FormControl("", [Validators.required, Validators.pattern(this.emailPattern)]),
      password: new FormControl("", [Validators.required, Validators.pattern(this.passwordPattern)]),
      // confirmacionPassword: new FormControl("", Validators.required)
    });
  }

  ngOnInit() { }

  validateName(event: KeyboardEvent) {
    let regex = RegExp(this.namePattern);
    return regex.test(event.key);
  }

  checkFirstName() {
    if (this.formularioRegistro.controls['firstName'].value[0] === ' ') {
      this.formularioRegistro.controls['firstName'].reset();
    }
  }

  checkLastName() {
    if (this.formularioRegistro.controls['lastName'].value[0] === ' ') {
      this.formularioRegistro.controls['lastName'].reset();
    }
  }

  validateEmail(event: KeyboardEvent) {
    return !(event.key === ' ');
  }

  checkEmail() {
    if (this.formularioRegistro.controls['email'].value[0] === ' ') {
      this.formularioRegistro.controls['email'].reset();
    }
  }

  validatePassword(event: KeyboardEvent) {
    return !(event.key === ' ');
  }

  checkPassword() {
    if (this.formularioRegistro.controls['password'].value[0] === ' ') {
      this.formularioRegistro.controls['password'].reset();
    }
  }

  showPassword() {
    if (this.passwordVisibility === true) {
      this.passwordVisibility = false;
    } else {
      this.passwordVisibility = true;
    }
  }

  // async guardar() {

  //   var f = this.formularioRegistro.value;

  //   if (this.formularioRegistro.invalid) {
  //     const alert = await this.alertController.create({
  //       header: 'Datos incompletos',
  //       message: 'Tienes que llenar todos los datos',
  //       buttons: ['Aceptar']
  //     });

  //     await alert.present();
  //     return;
  //   }

  //   var usuario = {
  //     nombre: f.nombre,
  //     password: f.password
  //   }

  //   localStorage.setItem('usuario', JSON.stringify(usuario));

  //   localStorage.setItem('ingresado', 'true');
  //   this.navCtrl.navigateRoot('inicio');
  // }

  register(registerForm: any) {
    loadingSpinner(this.loadingCtrl);

    let data = {
      firstName: registerForm.firstName,
      lastName: registerForm.lastName,
      email: registerForm.email,
      password: registerForm.password
    }

    this.auth.call(data, 'register', 'POST', false).subscribe({
      next: (response) => {
        if (response.status === 'SUCCESS') {
          console.log(response);
          this.loadingCtrl.dismiss();
          this.navCtrl.navigateRoot('login');
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
