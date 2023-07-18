import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { loadingSpinner } from '../../shared/loading/loading.component';
import { AuthService } from '../../services/auth.service';
import { alert } from 'src/app/shared/alert/alert.component';

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
    private authService: AuthService,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController
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

  async login(loginForm: any) {
    await loadingSpinner(this.loadingCtrl)

    let data = {
      email: loginForm.email,
      password: loginForm.password
    }

    this.authService.call(data, 'login', 'POST', false).subscribe({
      next: async (response) => {
        if (response.status === 'SUCCESS') {
          console.log(response);
          this.authService.setToken(response.data);
          this.authService.setIdUser(response.id);
          this.authService.setProfile(response.profile);
          this.authService.setEmail(response.email);
          this.authService.setModelSesionInSession(this.authService.modelSession);

          this.navCtrl.navigateRoot('inicio');
          this.loadingCtrl.dismiss();
        } else if (response.status === 'Error') {
          console.log(response);
          this.loadingCtrl.dismiss();

          alert({
            title: response.status,
            text: response.data,
            button: ['Cerrar'],
            alertController: this.alertController
          })
        }
      },
      error: (error) => {
        console.log(error);
        this.loadingCtrl.dismiss();

        alert({
          title: 'Error',
          text: 'Falla en el servidor',
          button: ['Cerrar'],
          alertController: this.alertController
        })
      }
    })
  }
}
