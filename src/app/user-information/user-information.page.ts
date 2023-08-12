import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ModalController, NavController, NavParams } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { alertModal } from '../shared/alert/alert.component';
import { loadingSpinner } from '../shared/loading/loading.component';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.page.html',
  styleUrls: ['./user-information.page.scss'],
})
export class UserInformationPage implements OnInit {

  namePattern = /^[a-zA-ZñÑáÁéÉíÍóÓúÚ ]+$/;
  emailPattern = /^(?=.*[a-zA-Z0-9@.])[a-zA-Z0-9@.]{6,}$/;
  passwordPattern = /^(?=(?:.*\d){1})(?=(?:.*[A-Z]){1})(?=(?:.*[a-z]){1})\S{5,20}$/;

  updateUserForm: FormGroup;

  profiles: any = [];

  constructor(
    private authService: AuthService,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public form: FormBuilder,
    public alertController: AlertController,
    private modalCtrl: ModalController,
    private navParams: NavParams,
  ) {
    this.updateUserForm = this.form.group({
      firstname: new FormControl('', Validators.pattern(this.namePattern)),
      lastname: new FormControl('', Validators.pattern(this.namePattern)),
      email: new FormControl('', Validators.pattern(this.emailPattern)),
      password: new FormControl('', Validators.pattern(this.passwordPattern)),
      idProfile: new FormControl(''),
    })
  }

  ngOnInit() {
    console.log(this.navParams.get('user')[0].idProfile);
    this.getProfile()
    this.setUserInformation()
  }

  setUserInformation() {
    this.updateUserForm.controls['firstname'].setValue(this.navParams.get('user')[0].firstname)
    this.updateUserForm.controls['lastname'].setValue(this.navParams.get('user')[0].lastname)
    this.updateUserForm.controls['email'].setValue(this.navParams.get('user')[0].email)
    this.updateUserForm.controls['idProfile'].setValue(this.navParams.get('user')[0].idProfile)
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(null, 'confirm');
  }

  validateName(event: KeyboardEvent) {
    let regex = RegExp(this.namePattern);
    return regex.test(event.key);
  }

  checkFirstName() {
    if (this.updateUserForm.controls['firstname'].value[0] === ' ') {
      this.updateUserForm.controls['firstname'].reset();
    }
  }

  checkLastName() {
    if (this.updateUserForm.controls['lastname'].value[0] === ' ') {
      this.updateUserForm.controls['lastname'].reset();
    }
  }

  validateEmail(event: KeyboardEvent) {
    return !(event.key === ' ');
  }

  checkEmail() {
    if (this.updateUserForm.controls['email'].value[0] === ' ') {
      this.updateUserForm.controls['email'].reset();
    }
  }

  validatePassword(event: KeyboardEvent) {
    return !(event.key === ' ');
  }

  checkPassword() {
    if (this.updateUserForm.controls['password'].value[0] === ' ') {
      this.updateUserForm.controls['password'].reset();
    }
  }

  async getProfile() {
    await loadingSpinner(this.loadingCtrl)

    this.authService.call(null, 'getProfile', 'GET', true).subscribe({
      next: (response) => {
        if (response.status === 'SUCCESS') {
          this.profiles = response.data
          this.loadingCtrl.dismiss()
        } else {
          console.log(response)
          this.loadingCtrl.dismiss()

          alert({
            title: response.status,
            text: response.data,
            button: ['Cerrar'],
            alertController: this.alertController
          })
        }
      },
      error: (error) => {
        console.log(error)
        this.loadingCtrl.dismiss()

        alert({
          title: 'Error',
          text: 'Falla en el servidor',
          button: ['Cerrar'],
          alertController: this.alertController
        })
      }
    })
  }

  async updateUser(updateInformation: any) {
    await loadingSpinner(this.loadingCtrl)

    let data = {
      firstname: updateInformation.firstname,
      lastname: updateInformation.lastname,
      email: updateInformation.email,
      password: updateInformation.password != '' ? updateInformation.password : this.navParams.get('user')[0].password,
      id_profile: updateInformation.idProfile
    }

    console.log(data);


    this.authService.call(data, `updateUser/${this.navParams.get('user')[0].id}`, 'PATCH', true).subscribe({
      next: (response) => {
        if (response.status === 'SUCCESS') {
          this.loadingCtrl.dismiss()

          alertModal({
            title: 'Succes',
            text: 'Usuario actualizado exitosamente',
            button: ['Cerrar'],
            alertController: this.alertController
          })
        } else {
          this.loadingCtrl.dismiss()
          alertModal({
            title: 'Error',
            text: 'No se pudo actualizar',
            button: ['Cerrar'],
            alertController: this.alertController
          })
        }
      },
      error: (error) => {
        console.log(error)
        this.loadingCtrl.dismiss()

        alertModal({
          title: 'Error',
          text: 'Falla en el servidor',
          button: ['Cerrar'],
          alertController: this.alertController
        })
      }
    })
  }
}