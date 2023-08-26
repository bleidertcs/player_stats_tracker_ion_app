import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Chart, ChartItem } from 'chart.js/auto';
import { AuthService } from 'src/app/services/auth.service';
import { loadingSpinner } from 'src/app/shared/loading/loading.component';
import { alertModal } from 'src/app/shared/alert/alert.component';
import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  sliders = [
    {
      img: 'assets/icon/statistics.jpg',
      title: '¡Bienvenido!',
      description: 'Aprende a aprovechar al máximo nuestra aplicación en este tutorial de introducción. Te guiaremos por las funciones clave para que te familiarices con la experiencia.',
      route: '/statistics',
    },
    {
      img: 'assets/icon/add.jpg',
      title: 'Equipos y Visualización',
      description: 'Aprende a agregar y ver equipos en esta diapositiva. Gestionar tus equipos es clave para aprovechar nuestra aplicación.',
      route: '/add-team',
    },
    {
      img: 'assets/icon/add.jpg',
      title: 'Agregar Jugadores',
      description: 'Descubre cómo añadir jugadores a tus equipos. Obtén un análisis completo de las estadísticas.',
      route: '/add-player',
    },
    {
      img: 'assets/icon/statistics.jpg',
      title: 'Comparación de Estadísticas',
      description: 'Aprende a comparar estadísticas entre jugadores y jugadores. Obtén poderosos análisis en nuestra aplicación.',
      route: '/statistics',
    },
    {
      img: 'assets/icon/user.jpg',
      title: 'Gestión de Usuarios',
      description: 'Explora cómo gestionar usuarios en esta diapositiva. Aprende a configurar cuentas y administrar permisos para una experiencia personalizada.',
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

  goHome() {
    this.authService.setLogged(true)
    this.authService.setModelLog(this.authService.modelLog);
    this.navCtrl.navigateRoot('home');
  }
}
