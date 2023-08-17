import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { alertModal } from 'src/app/shared/alert/alert.component';
import { loadingSpinner } from 'src/app/shared/loading/loading.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private authService: AuthService,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public form: FormBuilder,
    private ref: ChangeDetectorRef,
    public alertController: AlertController,
  ) { }

  ngOnInit() {
  }

  async logout() {
    await loadingSpinner(this.loadingCtrl)

    let data = {
      idUser: this.authService.getIdUser()
    }

    this.authService.call(data, 'logout', 'POST', true).subscribe({
      next: (response) => {
        console.log(response)
        if (response.status === 'SUCCESS') {
          this.authService.setToken(null);
          this.authService.setLogged(false)
          this.authService.setModelSesionInSession(this.authService.modelSession);
          this.navCtrl.navigateRoot('login');
          console.log(this.authService.getLogged());
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
}
