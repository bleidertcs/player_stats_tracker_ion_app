import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ModalController, NavParams } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { alertModal } from 'src/app/shared/alert/alert.component';
import { Constant } from 'src/app/shared/constant/constant.component';
import { MaskitoOptions, MaskitoElementPredicateAsync } from '@maskito/core';
import { loadingSpinner } from 'src/app/shared/loading/loading.component';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.page.html',
  styleUrls: ['./player-details.page.scss'],
})
export class PlayerDetailsPage implements OnInit {
  form: FormGroup;
  teams: any = []
  captainList = [
    {
      id: 1,
      description: 'Si',
    },
    {
      id: 0,
      description: 'No',
    }
  ]

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    public fb: FormBuilder,
    public alertController: AlertController,
    private authService: AuthService,
    public loadingCtrl: LoadingController,
  ) {
    this.form = this.createFormGroup()
  }

  readonly maskitoOptions: MaskitoOptions = {
    mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
  };

  readonly maskPredicate: MaskitoElementPredicateAsync = async (el) => (el as HTMLIonInputElement).getInputElement();


  createFormGroup() {
    return this.fb.group({
      player: new FormGroup({
        name: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern(Constant.Pattern.Form.Name)]),
        firstname: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern(Constant.Pattern.Form.Name)]),
        lastname: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern(Constant.Pattern.Form.Name)]),
        age: new FormControl('', [Validators.required, this.validateMaxDigits(2)]),
        birth: new FormControl('', [Validators.required, this.validateMaxDigits(10)]),
        nationality: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.pattern(Constant.Pattern.Form.Name)]),
        height: new FormControl('', [Validators.required, this.validateMaxDigits(4)]),
        weight: new FormControl('', [Validators.required, this.validateMaxDigits(4)]),
        photo: new FormControl(''),
        id_team: new FormControl('', [Validators.required]),
      }),
      game: new FormGroup({
        appearences: new FormControl('', [Validators.required, this.validateMaxDigits(3)]),
        lineups: new FormControl('', [Validators.required, this.validateMaxDigits(3)]),
        minutes: new FormControl('', [Validators.required, this.validateMaxDigits(5)]),
        number: new FormControl('', [Validators.required, this.validateMaxDigits(2)]),
        position: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.pattern(Constant.Pattern.Form.Name)]),
        rating: new FormControl('', [Validators.required, this.validateMaxDigits(2)]),
        captain: new FormControl('', [Validators.required])
      }),
      substitute: new FormGroup({
        in: new FormControl('', [Validators.required, this.validateMaxDigits(2)]),
        out: new FormControl('', [Validators.required, this.validateMaxDigits(2)]),
        bench: new FormControl('', [Validators.required, this.validateMaxDigits(2)])
      }),
      shot: new FormGroup({
        total: new FormControl('', [Validators.required, this.validateMaxDigits(3)]),
        on: new FormControl('', [Validators.required, this.validateMaxDigits(3)])
      }),
      goal: new FormGroup({
        total: new FormControl('', [Validators.required, this.validateMaxDigits(3)]),
        conceded: new FormControl('', [Validators.required, this.validateMaxDigits(3)]),
        assists: new FormControl('', [Validators.required, this.validateMaxDigits(3)]),
        saves: new FormControl('', [Validators.required, this.validateMaxDigits(3)])
      }),
      passe: new FormGroup({
        total: new FormControl('', [Validators.required, this.validateMaxDigits(3)]),
        key: new FormControl('', [Validators.required, this.validateMaxDigits(3)]),
        accuracy: new FormControl('', [Validators.required, this.validateMaxDigits(3)])
      }),
      tackle: new FormGroup({
        total: new FormControl('', [Validators.required, this.validateMaxDigits(3)]),
        blocks: new FormControl('', [Validators.required, this.validateMaxDigits(3)]),
        interceptions: new FormControl('', [Validators.required, this.validateMaxDigits(3)])
      }),
      duel: new FormGroup({
        total: new FormControl('', [Validators.required, this.validateMaxDigits(3)]),
        won: new FormControl('', [Validators.required, this.validateMaxDigits(3)])
      }),
      dribble: new FormGroup({
        attempts: new FormControl('', [Validators.required, this.validateMaxDigits(3)]),
        success: new FormControl('', [Validators.required, this.validateMaxDigits(3)]),
        past: new FormControl('', [Validators.required, this.validateMaxDigits(3)])
      }),
      foul: new FormGroup({
        drawn: new FormControl('', [Validators.required, this.validateMaxDigits(3)]),
        committed: new FormControl('', [Validators.required, this.validateMaxDigits(3)])
      }),
      card: new FormGroup({
        yellow: new FormControl('', [Validators.required, this.validateMaxDigits(2)]),
        yellowred: new FormControl('', [Validators.required, this.validateMaxDigits(2)]),
        red: new FormControl('', [Validators.required, this.validateMaxDigits(2)])
      }),
      penalty: new FormGroup({
        won: new FormControl('', [Validators.required, this.validateMaxDigits(2)]),
        committed: new FormControl('', [Validators.required, this.validateMaxDigits(2)]),
        scored: new FormControl('', [Validators.required, this.validateMaxDigits(2)]),
        missed: new FormControl('', [Validators.required, this.validateMaxDigits(2)]),
        saved: new FormControl('', [Validators.required, this.validateMaxDigits(2)])
      }),
    })
  }

  validateText(event: KeyboardEvent) {
    let regex = RegExp(Constant.Pattern.Form.Name);
    return regex.test(event.key);
  }

  validateMaxDigits(maxDigits: number) {
    return (control: { value: any; }) => {
      const value = control.value;
      if (value && value.toString().length > maxDigits) {
        return { maxDigitsExceeded: true };
      }
      return null;
    };
  }

  ngOnInit() {
    console.log(this.navParams.get('detailsPlayer'));
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(null, 'confirm');
  }

  setValueForm() {
    this.form.controls['firstname'].setValue(this.navParams.get('user')[0].firstname)
    this.form.controls['lastname'].setValue(this.navParams.get('user')[0].lastname)
    this.form.controls['email'].setValue(this.navParams.get('user')[0].email)
    this.form.controls['idProfile'].setValue(this.navParams.get('user')[0].profile.id)
  }

  getAllTeams() {
    this.authService.call(null, 'getAllTeams', 'GET', true).subscribe({
      next: (response) => {
        if (response.status === Constant.SUCCESS) {
          response.data.map((e: {
            id: any; name: any;
            country: string;
            founded: any;
            logo: string;
          },) => {
            this.teams.push({
              id: e.id,
              name: e.name,
              country: e.country,
              founded: e.founded,
              logo: e.logo,
            })
          })
          this.teams.sort((a: { name: string; }, b: { name: string; }) => (a.name < b.name) ? -1 : 1)
        } else {
          console.log(response)
          alertModal({
            title: 'Error',
            text: response.data,
            button: [
              {
                cssClass: 'alert-button-cancel',
                text: 'Cerrar',
              }
            ],
            alertController: this.alertController
          })
        }
      },
      error: (error) => {
        console.log(error)

        alertModal({
          title: 'Error',
          text: 'Falla en el servidor',
          button: [
            {
              cssClass: 'alert-button-cancel',
              text: 'Cerrar',
            }
          ],
          alertController: this.alertController
        })
      }
    })
  }

  async updatePlayer(form: any) {
    await loadingSpinner(this.loadingCtrl)

    let data = {
      appearences: parseInt(form.appearences),
      lineups: parseInt(form.lineups),
      minutes: parseInt(form.minutes),
      number: parseInt(form.number),
      position: form.position,
      rating: parseInt(form.rating),
      captain: parseInt(form.captain),
      in: parseInt(form.in),
      out: parseInt(form.out),
      bench: parseInt(form.bench),
      shotTotal: parseInt(form.total),
      shotOn: parseInt(form.on),
      goalTotal: parseInt(form.total),
      conceded: parseInt(form.conceded),
      assists: parseInt(form.assists),
      saves: parseInt(form.saves),
      passeTotal: parseInt(form.total),
      key: parseInt(form.key),
      accuracy: parseInt(form.accuracy),
      tackleTotal: parseInt(form.total),
      blocks: parseInt(form.blocks),
      interceptions: parseInt(form.interceptions),
      duelTotal: parseInt(form.total),
      duelWon: parseInt(form.won),
      attempts: parseInt(form.attempts),
      success: parseInt(form.success),
      past: parseInt(form.past),
      drawn: parseInt(form.drawn),
      foulCommitted: parseInt(form.committed),
      yellow: parseInt(form.yellow),
      yellowred: parseInt(form.yellowred),
      red: parseInt(form.red),
      penaltyWon: parseInt(form.won),
      penaltyCommitted: parseInt(form.committed),
      scored: parseInt(form.scored),
      missed: parseInt(form.missed),
      saved: parseInt(form.saved),
      name: form.name,
      firstname: form.firstname,
      lastname: form.lastname,
      age: parseInt(form.age),
      birth: new Date(form.birth),
      nationality: form.nationality,
      height: form.height,
      weight: form.weight,
      photo: form.photo,
      id_team: parseInt(form.id_team)
    }

    console.log(data);

    // this.loadingCtrl.dismiss();
    this.authService.call(data, 'addPlayer', 'POST', true).subscribe({
      next: async (response) => {
        if (response.status === Constant.SUCCESS) {
          alertModal({
            title: response.status,
            text: response.data,
            button: [
              {
                cssClass: 'alert-button-confirm',
                text: 'Aceptar',
              }
            ],
            alertController: this.alertController
          })

          this.loadingCtrl.dismiss();

        } else if (response.status === 'ERROR') {
          console.log(response);
          this.loadingCtrl.dismiss();

          alertModal({
            title: response.status,
            text: response.data,
            button: [
              {
                cssClass: 'alert-button-cancel',
                text: 'Cerrar',
              }
            ],
            alertController: this.alertController
          })
        }
      },
      error: (error) => {
        console.log(error);
        this.loadingCtrl.dismiss();

        alertModal({
          title: 'Error',
          text: 'Falla en el servidor',
          button: [
            {
              cssClass: 'alert-button-cancel',
              text: 'Cerrar',
            }
          ],
          alertController: this.alertController
        })
      }
    })
  }
}
