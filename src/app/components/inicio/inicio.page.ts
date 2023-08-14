import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Chart, ChartItem } from 'chart.js/auto';
import { AuthService } from 'src/app/services/auth.service';
import { loadingSpinner } from 'src/app/shared/loading/loading.component';
import { alertModal } from 'src/app/shared/alert/alert.component';
import { title } from 'process';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  sliders = [
    {
      img: 'assets/icon/statistics.jpg',
      title: 'Estadísticas',
      description: 'The ionic conference app is a practical preview of the ionic framework in action, and a demonstration of proper code use.',
      route: '/statistics',
    },
    {
      img: 'assets/icon/add.jpg',
      title: 'Equipo',
      description: 'Ionic Framework is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.',
      route: '/add-team',
    },
    {
      img: 'assets/icon/add.jpg',
      title: 'Jugador',
      description: 'Ionic Framework is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.',
      route: '/add-player',
    },
    {
      img: 'assets/icon/user.jpg',
      title: 'Usuario',
      description: 'Ionic Framework is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.',
      route: '/users',
    },
  ]

  constructor(
    private authService: AuthService,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public form: FormBuilder,
    private ref: ChangeDetectorRef,
    public alertController: AlertController,
  ) {
  }

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
          this.authService.setModelSesionInSession(this.authService.modelSession);
          this.navCtrl.navigateRoot('login');
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
