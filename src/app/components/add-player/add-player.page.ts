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

  constructor(
    public fb: FormBuilder,
    public alertController: AlertController,
    private authService: AuthService,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController
  ) {
    this.addPlayerForm = this.fb.group({
      player: new FormGroup({
        name: new FormControl('', [Validators.required]),
        firstname: new FormControl('', [Validators.required]),
        lastname: new FormControl('', [Validators.required]),
        age: new FormControl('', [Validators.required]),
        birth: new FormControl('', [Validators.required]),
        nationality: new FormControl('', [Validators.required]),
        height: new FormControl('', [Validators.required]),
        weight: new FormControl('', [Validators.required]),
        photo: new FormControl(''),
        id_team: new FormControl('', [Validators.required]),
      }),
      game: new FormGroup({
        appearences: new FormControl('', [Validators.required]),
        lineups: new FormControl('', [Validators.required]),
        minutes: new FormControl('', [Validators.required]),
        number: new FormControl('', [Validators.required]),
        position: new FormControl('', [Validators.required]),
        rating: new FormControl('', [Validators.required]),
        captain: new FormControl('', [Validators.required])
      }),
      substitute: new FormGroup({
        in: new FormControl('', [Validators.required]),
        out: new FormControl('', [Validators.required]),
        bench: new FormControl('', [Validators.required])
      }),
      shot: new FormGroup({
        total: new FormControl('', [Validators.required]),
        on: new FormControl('', [Validators.required])
      }),
      goal: new FormGroup({
        total: new FormControl('', [Validators.required]),
        conceded: new FormControl('', [Validators.required]),
        assists: new FormControl('', [Validators.required]),
        save: new FormControl('', [Validators.required])
      }),
      passe: new FormGroup({
        total: new FormControl('', [Validators.required]),
        key: new FormControl('', [Validators.required]),
        accuracy: new FormControl('', [Validators.required])
      }),
      tackle: new FormGroup({
        total: new FormControl('', [Validators.required]),
        blocks: new FormControl('', [Validators.required]),
        interceptions: new FormControl('', [Validators.required])
      }),
      duel: new FormGroup({
        total: new FormControl('', [Validators.required]),
        won: new FormControl('', [Validators.required])
      }),
      dribble: new FormGroup({
        attempts: new FormControl('', [Validators.required]),
        success: new FormControl('', [Validators.required]),
        past: new FormControl('', [Validators.required])
      }),
      foul: new FormGroup({
        drawn: new FormControl('', [Validators.required]),
        committed: new FormControl('', [Validators.required])
      }),
      card: new FormGroup({
        yellow: new FormControl('', [Validators.required]),
        yellowred: new FormControl('', [Validators.required]),
        red: new FormControl('', [Validators.required])
      }),
      penalty: new FormGroup({
        won: new FormControl('', [Validators.required]),
        committed: new FormControl('', [Validators.required]),
        scored: new FormControl('', [Validators.required]),
        missed: new FormControl('', [Validators.required]),
        saved: new FormControl('', [Validators.required])
      }),
    })
  }

  ngOnInit() {
    this.getAllTeams()
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
      save: this.addPlayerForm.controls['goal'].value.save,
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

    this.authService.call(data, 'addPlayer', 'POST', true).subscribe({
      next: async (response) => {
        if (response.status === 'SUCCESS') {
          alertModal({
            title: response.status,
            text: response.data,
            button: ['Cerrar'],
            alertController: this.alertController
          })

          this.loadingCtrl.dismiss();
        } else if (response.status === 'ERROR') {
          console.log(response);
          this.loadingCtrl.dismiss();

          alertModal({
            title: response.status,
            text: response.data,
            button: ['Cerrar'],
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
          button: ['Cerrar'],
          alertController: this.alertController
        })
      }
    })
  }
}
