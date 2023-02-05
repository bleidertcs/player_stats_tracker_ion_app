import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { loadingSpinner } from 'src/app/shared/loading/loading.component';
import { alert } from 'src/app/shared/alert/alert.component';

interface Users {
  id: number,
  firstName: string,
  lastName: string,
  email: string
}

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  users: Users[] = []

  constructor(
    private authService: AuthService,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public form: FormBuilder,
    public alertController: AlertController,
  ) { }

  ngOnInit() {
    this.getUsers()
  }

  getUsers() {
    this.authService.call(null, 'users', 'GET', false).subscribe({
      next: (response) => {
        console.log(response)
        if (response.status === 'SUCCESS') {
          response.data.map((e: { id: any; firstName: any; lastName: any; email: any; }) => {
            this.users.push({
              id: e.id,
              firstName: e.firstName,
              lastName: e.lastName,
              email: e.email
            })
          })
          // this.users.sort((a, b) => (a.firstName < b.firstName) ? -1 : 1)
          console.log(this.users)
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

  test() {
    this.users.pop()
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
}
