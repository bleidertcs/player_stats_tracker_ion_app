import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { alertModal } from 'src/app/shared/alert/alert.component';
import { loadingSpinner } from 'src/app/shared/loading/loading.component';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.page.html',
  styleUrls: ['./add-player.page.scss'],
})
export class AddPlayerPage implements OnInit {

  addPlayerForm: FormGroup;
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

  textPattern = /^[a-zA-ZñÑáÁéÉíÍóÓúÚ ]+$/;

  validateText(event: KeyboardEvent) {
    let regex = RegExp(this.textPattern);
    return regex.test(event.key);
  }

  constructor(
    public fb: FormBuilder,
    public alertController: AlertController,
    private authService: AuthService,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController
  ) {
    this.addPlayerForm = this.fb.group({
      player: new FormGroup({
        name: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern(this.textPattern)]),
        firstname: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern(this.textPattern)]),
        lastname: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern(this.textPattern)]),
        age: new FormControl('', [Validators.required, Validators.maxLength(2)]),
        birth: new FormControl('', [Validators.required]),
        nationality: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.pattern(this.textPattern)]),
        height: new FormControl('', [Validators.required, Validators.maxLength(4)]),
        weight: new FormControl('', [Validators.required, Validators.maxLength(3)]),
        photo: new FormControl(''),
        id_team: new FormControl('', [Validators.required]),
      }),
      game: new FormGroup({
        appearences: new FormControl('', [Validators.required, Validators.maxLength(3)]),
        lineups: new FormControl('', [Validators.required, Validators.maxLength(3)]),
        minutes: new FormControl('', [Validators.required, Validators.maxLength(5)]),
        number: new FormControl('', [Validators.required, Validators.maxLength(2)]),
        position: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.pattern(this.textPattern)]),
        rating: new FormControl('', [Validators.required, Validators.maxLength(10)]),
        captain: new FormControl('', [Validators.required])
      }),
      substitute: new FormGroup({
        in: new FormControl('', [Validators.required, Validators.maxLength(2)]),
        out: new FormControl('', [Validators.required, Validators.maxLength(2)]),
        bench: new FormControl('', [Validators.required, Validators.maxLength(2)])
      }),
      shot: new FormGroup({
        total: new FormControl('', [Validators.required, Validators.maxLength(3)]),
        on: new FormControl('', [Validators.required, Validators.maxLength(3)])
      }),
      goal: new FormGroup({
        total: new FormControl('', [Validators.required, Validators.maxLength(3)]),
        conceded: new FormControl('', [Validators.required, Validators.maxLength(3)]),
        assists: new FormControl('', [Validators.required, Validators.maxLength(3)]),
        saves: new FormControl('', [Validators.required, Validators.maxLength(3)])
      }),
      passe: new FormGroup({
        total: new FormControl('', [Validators.required, Validators.maxLength(3)]),
        key: new FormControl('', [Validators.required, Validators.maxLength(3)]),
        accuracy: new FormControl('', [Validators.required, Validators.maxLength(3)])
      }),
      tackle: new FormGroup({
        total: new FormControl('', [Validators.required, Validators.maxLength(3)]),
        blocks: new FormControl('', [Validators.required, Validators.maxLength(3)]),
        interceptions: new FormControl('', [Validators.required, Validators.maxLength(3)])
      }),
      duel: new FormGroup({
        total: new FormControl('', [Validators.required, Validators.maxLength(3)]),
        won: new FormControl('', [Validators.required, Validators.maxLength(3)])
      }),
      dribble: new FormGroup({
        attempts: new FormControl('', [Validators.required, Validators.maxLength(3)]),
        success: new FormControl('', [Validators.required, Validators.maxLength(3)]),
        past: new FormControl('', [Validators.required, Validators.maxLength(3)])
      }),
      foul: new FormGroup({
        drawn: new FormControl('', [Validators.required, Validators.maxLength(3)]),
        committed: new FormControl('', [Validators.required, Validators.maxLength(3)])
      }),
      card: new FormGroup({
        yellow: new FormControl('', [Validators.required, Validators.maxLength(2)]),
        yellowred: new FormControl('', [Validators.required, Validators.maxLength(2)]),
        red: new FormControl('', [Validators.required, Validators.maxLength(2)])
      }),
      penalty: new FormGroup({
        won: new FormControl('', [Validators.required, Validators.maxLength(2)]),
        committed: new FormControl('', [Validators.required, Validators.maxLength(2)]),
        scored: new FormControl('', [Validators.required, Validators.maxLength(2)]),
        missed: new FormControl('', [Validators.required, Validators.maxLength(2)]),
        saved: new FormControl('', [Validators.required, Validators.maxLength(2)])
      }),
    })
  }

  ngOnInit() {
    this.getAllTeams()
  }

  limitInput(maxLength: any, formControl: any) {
    if (formControl.length > maxLength) {
      formControl = Number(formControl.slice(0, maxLength));
    }
  }

  getAllTeams() {
    this.authService.call(null, 'getAllTeams', 'GET', true).subscribe({
      next: (response) => {
        if (response.status === 'SUCCESS') {
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
        }
      },
      error: (error) => {
        console.log(error)

        alertModal({
          title: 'Error',
          text: 'Falla en el servidor',
          button: ['Cerrar'],
          alertController: this.alertController
        })
      }
    })
  }

  async addPlayer() {
    await loadingSpinner(this.loadingCtrl)

    let data = {
      appearences: this.addPlayerForm.controls['game'].value.appearences,
      lineups: this.addPlayerForm.controls['game'].value.lineups,
      minutes: this.addPlayerForm.controls['game'].value.minutes,
      number: this.addPlayerForm.controls['game'].value.number,
      position: this.addPlayerForm.controls['game'].value.position,
      rating: this.addPlayerForm.controls['game'].value.rating,
      captain: this.addPlayerForm.controls['game'].value.captain,
      in: this.addPlayerForm.controls['substitute'].value.in,
      out: this.addPlayerForm.controls['substitute'].value.out,
      bench: this.addPlayerForm.controls['substitute'].value.bench,
      shotTotal: this.addPlayerForm.controls['shot'].value.total,
      shotOn: this.addPlayerForm.controls['shot'].value.on,
      goalTotal: this.addPlayerForm.controls['goal'].value.total,
      conceded: this.addPlayerForm.controls['goal'].value.conceded,
      assists: this.addPlayerForm.controls['goal'].value.assists,
      saves: this.addPlayerForm.controls['goal'].value.save,
      passeTotal: this.addPlayerForm.controls['passe'].value.total,
      key: this.addPlayerForm.controls['passe'].value.key,
      accuracy: this.addPlayerForm.controls['passe'].value.accuracy,
      tackleTotal: this.addPlayerForm.controls['tackle'].value.total,
      blocks: this.addPlayerForm.controls['tackle'].value.blocks,
      interceptions: this.addPlayerForm.controls['tackle'].value.interceptions,
      duelTotal: this.addPlayerForm.controls['duel'].value.total,
      duelWon: this.addPlayerForm.controls['duel'].value.won,
      attempts: this.addPlayerForm.controls['dribble'].value.attempts,
      success: this.addPlayerForm.controls['dribble'].value.success,
      past: this.addPlayerForm.controls['dribble'].value.past,
      drawn: this.addPlayerForm.controls['foul'].value.drawn,
      foulCommitted: this.addPlayerForm.controls['foul'].value.committed,
      yellow: this.addPlayerForm.controls['card'].value.yellow,
      yellowred: this.addPlayerForm.controls['card'].value.yellowred,
      red: this.addPlayerForm.controls['card'].value.red,
      penaltyWon: this.addPlayerForm.controls['penalty'].value.won,
      penaltyCommitted: this.addPlayerForm.controls['penalty'].value.committed,
      scored: this.addPlayerForm.controls['penalty'].value.scored,
      missed: this.addPlayerForm.controls['penalty'].value.missed,
      saved: this.addPlayerForm.controls['penalty'].value.saved,
      name: this.addPlayerForm.controls['player'].value.name,
      firstname: this.addPlayerForm.controls['player'].value.firstname,
      lastname: this.addPlayerForm.controls['player'].value.lastname,
      age: this.addPlayerForm.controls['player'].value.age,
      birth: this.addPlayerForm.controls['player'].value.birth,
      nationality: this.addPlayerForm.controls['player'].value.nationality,
      height: this.addPlayerForm.controls['player'].value.height,
      weight: this.addPlayerForm.controls['player'].value.weight,
      photo: this.addPlayerForm.controls['player'].value.photo,
      id_team: this.addPlayerForm.controls['player'].value.id_team
    }

    console.log(data);
    
    this.loadingCtrl.dismiss();
    // this.authService.call(data, 'addPlayer', 'POST', true).subscribe({
    //   next: async (response) => {
    //     if (response.status === 'SUCCESS') {
    //       alertModal({
    //         title: response.status,
    //         text: response.data,
    //         button: ['Cerrar'],
    //         alertController: this.alertController
    //       })

    //       this.loadingCtrl.dismiss();
    //     } else if (response.status === 'ERROR') {
    //       console.log(response);
    //       this.loadingCtrl.dismiss();

    //       alertModal({
    //         title: response.status,
    //         text: response.data,
    //         button: ['Cerrar'],
    //         alertController: this.alertController
    //       })
    //     }
    //   },
    //   error: (error) => {
    //     console.log(error);
    //     this.loadingCtrl.dismiss();

    //     alertModal({
    //       title: 'Error',
    //       text: 'Falla en el servidor',
    //       button: ['Cerrar'],
    //       alertController: this.alertController
    //     })
    //   }
    // })
  }
}
