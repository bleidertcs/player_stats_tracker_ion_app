import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonModal, LoadingController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { loadingSpinner } from 'src/app/shared/loading/loading.component';
import { alert } from 'src/app/shared/alert/alert.component';

interface Users {
  id: number,
  firstname: string,
  lastname: string,
  email: string,
  password: string,
}

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  namePattern = /^[a-zA-ZñÑáÁéÉíÍóÓúÚ ]+$/;
  emailPattern = /^(([a-zA-Z0-9]([\.\-\_]){1})|([a-zA-Z0-9]))+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4}|[a-zA-Z]{1,3}\.[a-zA-Z]{1,3})$/;
  passwordPattern = /^(?=(?:.*\d){1})(?=(?:.*[A-Z]){1})(?=(?:.*[a-z]){1})\S{5,20}$/;

  users: Users[] = [];
  profiles: any = []
  updateUserForm: FormGroup;
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  password: string = '';
  isModalOpen = false;

  constructor(
    private authService: AuthService,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public form: FormBuilder,
    public alertController: AlertController,
  ) {
    this.updateUserForm = this.form.group({
      firstname: new FormControl('', [Validators.required, Validators.pattern(this.namePattern)]),
      lastname: new FormControl('', [Validators.required, Validators.pattern(this.namePattern)]),
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      password: new FormControl('', [Validators.required, Validators.pattern(this.passwordPattern)]),
      idProfile: new FormControl('', [Validators.required]), 
    })
  }

  ngOnInit() {
    this.getUsers()
    this.getProfile()
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
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

  getProfile() {
    this.authService.call(null, 'getProfile', 'GET', true).subscribe({
      next: (response) => {
        if (response.status === 'SUCCESS') {
          this.profiles = response.data
          
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

  getUsers() {
    this.authService.call(null, 'getUsers', 'GET', false).subscribe({
      next: (response) => {
        if (response.status === 'SUCCESS') {
          response.data.map((e: { id: any; firstname: any; lastname: any; email: any; password: any }) => {
            this.users.push({
              id: e.id,
              firstname: e.firstname,
              lastname: e.lastname,
              email: e.email,
              password: e.password
            })
          })
          this.authService.setUsersList(this.users)
          this.authService.setModelUsers(this.authService.modelUsers)
          this.users.sort((a, b) => (a.firstname < b.firstname) ? -1 : 1)
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

  getUser(id: any) {
    return new Promise<void>((resolve, reject) => {
      this.authService.call(null, `getUser/${id}`, 'GET', false).subscribe({
        next: (response) => {
          if (response.status === 'SUCCESS') {
            response.data.map((e: { firstname: string; lastname: string; email: string; password: string; }) => {
              this.firstname = e.firstname,
                this.lastname = e.lastname,
                this.email = e.email,
                this.password = e.password
            })
          }
          resolve();
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
        },
      })
    })
  }

  async deleteUser(id: any) {
    await loadingSpinner(this.loadingCtrl)

    this.authService.call(null, `deleteUser/${id}`, 'DELETE', false).subscribe({
      next: (response) => {
        // this.users.pop()
        this.loadingCtrl.dismiss();
        // if (response.status === 'SUCCESS') {

        // } else {
        //   this.loadingCtrl.dismiss();
        //   alert({
        //     title: 'Error',
        //     text: response.data,
        //     button: ['Cerrar'],
        //     alertController: this.alertController
        //   })
        // }
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

  async updateUser(id: any) {
    await this.getUser(id)
    let users = this.authService.getUsersList()

    const alertInput = await this.alertController.create({
      header: 'Actualizar información usuario',
      inputs: [
        {
          placeholder: 'Nombre',
          name: 'firstName',
          value: this.firstname,
          type: 'text'
        },
        {
          placeholder: 'Apellido',
          name: 'lastName',
          value: this.lastname,
          type: 'text'
        },
        {
          placeholder: 'Correo Electrónico',
          name: 'email',
          value: this.email,
          type: 'email'
        },
        {
          placeholder: 'Contraseña',
          name: 'password',
          type: 'password'
        },
        {
          name: 'opcion',
          type: 'radio',
          label: 'Opción 1',
          value: 'opcion1',
          checked: true,
          
        },
        {
          name: 'opcion',
          type: 'radio',
          label: 'Opción 2',
          value: 'opcion2'
        },
        {
          name: 'opcion',
          type: 'radio',
          label: 'Opción 3',
          value: 'opcion3'
        }
      ],
      buttons: [
        {
          text: 'Guardar',
          handler: async (alertData) => {
            await loadingSpinner(this.loadingCtrl)

            let data = {
              firstName: alertData.firstName,
              lastName: alertData.lastName,
              email: alertData.email,
              password: alertData.password
            }

            this.authService.call(data, `updateUser/${id}`, 'PATCH', false).subscribe({
              next: (response) => {
                if (response.status === 'SUCCESS') {
                  this.loadingCtrl.dismiss()
                } else {
                  this.loadingCtrl.dismiss()
                  alert({
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

                alert({
                  title: 'Error',
                  text: 'Falla en el servidor',
                  button: ['Cerrar'],
                  alertController: this.alertController
                })
              }
            })
          }
        },
        {
          text: 'Cancelar'
        }
      ],
    });

    await alertInput.present();
  }
}
