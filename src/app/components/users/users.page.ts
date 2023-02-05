import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { loadingSpinner } from 'src/app/shared/loading/loading.component';
import { alert } from 'src/app/shared/alert/alert.component';

interface Users {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
}

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  emailPattern = /^(([a-zA-Z0-9]([\.\-\_]){1})|([a-zA-Z0-9]))+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4}|[a-zA-Z]{1,3}\.[a-zA-Z]{1,3})$/;
  passwordPattern = /^(?=(?:.*\d){1})(?=(?:.*[A-Z]){1})(?=(?:.*[a-z]){1})\S{5,20}$/;

  users: Users[] = [];
  // updateForm: FormGroup;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public form: FormBuilder,
    public alertController: AlertController,
  ) {
    // this.updateForm = this.form.group({
    //   firstName: new FormControl('', [Validators.required,]),
    //   lastName: new FormControl('', [Validators.required,]),
    //   email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
    //   password: new FormControl('', [Validators.required, Validators.pattern(this.passwordPattern)])
    // })
  }

  ngOnInit() {
    this.getUsers()
  }

  getUsers() {
    this.authService.call(null, 'users', 'GET', false).subscribe({
      next: (response) => {
        if (response.status === 'SUCCESS') {
          response.data.map((e: { id: any; firstName: any; lastName: any; email: any; password: any }) => {
            this.users.push({
              id: e.id,
              firstName: e.firstName,
              lastName: e.lastName,
              email: e.email,
              password: e.password
            })
          })
          this.authService.setUsersList(this.users)
          this.authService.setModelUsers(this.authService.modelUsers)
          this.users.sort((a, b) => (a.firstName < b.firstName) ? -1 : 1)
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
      this.authService.call(null, `user/${id}`, 'GET', false).subscribe({
        next: (response) => {
          if (response.status === 'SUCCESS') {
            response.data.map((e: { firstName: string; lastName: string; email: string; password: string; }) => {
              this.firstName = e.firstName,
                this.lastName = e.lastName,
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

    this.authService.call(null, `delete/${id}`, 'DELETE', false).subscribe({
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

    const alertTest = await this.alertController.create({
      header: 'Actualizar información usuario',
      inputs: [
        {
          placeholder: 'Nombre',
          name: 'firstName',
          value: this.firstName
        },
        {
          placeholder: 'Apellido',
          name: 'lastName',
          value: this.lastName
        },
        {
          placeholder: 'Correo Electrónico',
          name: 'email',
          value: this.email
        },
        {
          placeholder: 'Contraseña',
          name: 'password',
        },
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

            this.authService.call(data, `update/${id}`, 'PATCH', false).subscribe({
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

    await alertTest.present();
  }
}
