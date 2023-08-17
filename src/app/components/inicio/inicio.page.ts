import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Chart, ChartItem } from 'chart.js/auto';
import { AuthService } from 'src/app/services/auth.service';
import { loadingSpinner } from 'src/app/shared/loading/loading.component';
import { alertModal } from 'src/app/shared/alert/alert.component';

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
}
