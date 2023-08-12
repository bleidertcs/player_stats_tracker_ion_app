import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonModal, LoadingController, ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { loadingSpinner } from 'src/app/shared/loading/loading.component';
import { alertModal } from 'src/app/shared/alert/alert.component';
import { UserInformationPage } from '../../user-information/user-information.page';

interface Users {
  id: number,
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  idProfile: number
}

interface User {
  id: number,
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  idProfile: number
}

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  users: Users[] = [];
  user: User[] = [];

  constructor(
    private authService: AuthService,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public form: FormBuilder,
    public alertController: AlertController,
    private modalCtrl: ModalController
  ) {
  }

  ngOnInit() {
    this.getUsers()
  }

  async openModal(idUser: any) {
    await this.getUser(idUser)
    console.log('users', this.user);

    const modal = await this.modalCtrl.create({
      component: UserInformationPage,
      componentProps: {
        user: this.user
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role) {
      this.getUsers()
    }
  }

  async getUsers() {
    await loadingSpinner(this.loadingCtrl)

    this.authService.call(null, 'getUsers', 'GET', false).subscribe({
      next: (response) => {
        this.users = []
        if (response.status === 'SUCCESS') {
          response.data.map((e: {
            profile: any; id: any; firstname: any; lastname: any; email: any; password: any
          }) => {
            this.users.push({
              id: e.id,
              firstname: e.firstname,
              lastname: e.lastname,
              email: e.email,
              password: e.password,
              idProfile: e.profile.id
            })
          })
          this.authService.setUsersList(this.users)
          this.authService.setModelUsers(this.authService.modelUsers)
          this.users.sort((a, b) => (a.firstname < b.firstname) ? -1 : 1)
          this.loadingCtrl.dismiss()
        } else {
          console.log(response)
          this.loadingCtrl.dismiss()

          alertModal({
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

        alertModal({
          title: 'Error',
          text: 'Falla en el servidor',
          button: ['Cerrar'],
          alertController: this.alertController
        })
      }
    })
  }

  async getUser(id: any) {
    await loadingSpinner(this.loadingCtrl)
    return new Promise<void>((resolve, reject) => {
      this.authService.call(null, `getUser/${id}`, 'GET', false).subscribe({
        next: (response) => {
          if (response.status === 'SUCCESS') {
            this.user = []
            response.data.map((e: {
              id: number;
              profile: any; firstname: string; lastname: string; email: string; password: string;
            }) => {
              this.user.push({
                id: e.id,
                firstname: e.firstname,
                lastname: e.lastname,
                email: e.email,
                password: e.password,
                idProfile: e.profile.id
              })
            })
          }
          resolve();
          this.loadingCtrl.dismiss()
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
        },
      })
    })
  }

  async deleteUser(id: any) {
    await loadingSpinner(this.loadingCtrl)

    this.authService.call(null, `deleteUser/${id}`, 'DELETE', true).subscribe({
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
