import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { loadingSpinner } from 'src/app/shared/loading/loading.component';

interface selectTeam1 {
  value: number;
  viewValue: string;
}

interface selectTeam2 {
  value: number;
  viewValue: string;
}

interface selectSquad1 {
  value: number;
  viewValue: string;
}

interface selectSquad2 {
  value: number;
  viewValue: string;
}

interface Players1 {
  value: number;
  viewValue: string;
  age: number,
  height: any,
  weight: any,
  league: string,
  position: string,
  shots: {
    total: any,
    on: any
  },
  goals: {
    total: any,
    assists: any
  },
  passes: {
    total: any,
    key: any,
    accuracy: any
  },
  tackles: {
    total: any,
    blocks: any,
    interceptions: any
  },
  dribbles: {
    attempts: any,
    success: any,
    past: any
  },
  fouls: {
    drawn: any,
    committed: any
  },
  cards: {
    yellow: any,
    yellowred: any,
    red: any
  },
}

interface Players2 {
  value: number;
  viewValue: string;
  age: number,
  height: any,
  weight: any,
  league: string,
  position: string,
  shots: {
    total: any,
    on: any
  },
  goals: {
    total: any,
    assists: any
  },
  passes: {
    total: any,
    key: any,
    accuracy: any
  },
  tackles: {
    total: any,
    blocks: any,
    interceptions: any
  },
  dribbles: {
    attempts: any,
    success: any,
    past: any
  },
  fouls: {
    drawn: any,
    committed: any
  },
  cards: {
    yellow: any,
    yellowred: any,
    red: any
  },
}
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  teams1: selectTeam1[] = []
  teams2: selectTeam2[] = []
  squads1: selectSquad1[] = []
  squads2: selectSquad2[] = []
  players1: Players1[] = []
  players2: Players2[] = []
  formTeams: FormGroup;

  constructor(
    private authService: AuthService,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public form: FormBuilder
  ) {
    this.formTeams = this.form.group({
      idTeams1: new FormControl('', [Validators.required, e => this.loadSquads1(e)]),
      idTeams2: new FormControl('', [Validators.required, e => this.loadSquads2(e)]),
      idSquad1: new FormControl('', [Validators.required, e => this.loadPlayers1(e)]),
      idSquad2: new FormControl('', [Validators.required, e => this.loadPlayers2(e)]),
    })
  }

  loadSquads1(control: AbstractControl) {
    if (control.value !== '' && control.value !== null) {
      this.squads1 = [];
      this.players1 = [];
      this.squad1(control.value);
      this.formTeams.controls['idSquad1'].reset()
    }
    return null;
  }

  loadSquads2(control: AbstractControl) {
    if (control.value !== '' && control.value !== null) {
      this.squads2 = [];
      this.players2 = [];
      this.squad2(control.value);
      this.formTeams.controls['idSquad2'].reset()
    }
    return null;
  }

  loadPlayers1(control: AbstractControl) {
    if (control.value !== '' && control.value !== null) {
      this.players1 = [];
      this.player1(control.value);
      console.log(control.value)
    }
    return null;
  }

  loadPlayers2(control: AbstractControl) {
    if (control.value !== '' && control.value !== null) {
      this.players2 = [];
      this.player2(control.value);
      console.log(control.value)
    }
    return null;
  }

  ngOnInit() {
    this.footballTeams1();
    this.footballTeams2();
  }

  logout() {
    loadingSpinner(this.loadingCtrl)

    this.authService.call(null, 'logout', 'POST', false).subscribe({
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
        }
      },
      error: (error) => {
        console.log(error)
        this.loadingCtrl.dismiss()
      }
    })
  }

  footballTeams1() {
    this.authService.call(null, 'teams', 'GET', false).subscribe({
      next: (response) => {
        if (response.status === 'SUCCESS') {
          response.data.map((e: { teamID: any; name: any; }) => {
            this.teams1.push({
              value: e.teamID,
              viewValue: e.name,
            })
          })
        } else {
          console.log(response)
        }
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  footballTeams2() {
    this.authService.call(null, 'teams', 'GET', false).subscribe({
      next: (response) => {
        if (response.status === 'SUCCESS') {
          response.data.map((e: { teamID: any; name: any; }) => {
            this.teams2.push({
              value: e.teamID,
              viewValue: e.name,
            })
          })
        } else {
          console.log(response)
        }
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  squad1(teamID: any) {
    loadingSpinner(this.loadingCtrl)

    this.authService.call(null, `squad/${teamID}`, 'GET', false).subscribe({
      next: (response) => {
        if (response.status === 'SUCCESS') {
          response.data.players.map((e: { id: any; name: any; }) => {
            this.squads1.push({
              value: e.id,
              viewValue: e.name,
            })
          })
          this.loadingCtrl.dismiss();
        } else {
          console.log(response)
          this.loadingCtrl.dismiss();
        }
      },
      error: (error) => {
        console.log(error)
        this.loadingCtrl.dismiss();
      }
    })
  }

  squad2(teamID: any) {
    loadingSpinner(this.loadingCtrl)

    this.authService.call(null, `squad/${teamID}`, 'GET', false).subscribe({
      next: (response) => {
        if (response.status === 'SUCCESS') {
          response.data.players.map((e: { id: any; name: any; }) => {
            this.squads2.push({
              value: e.id,
              viewValue: e.name,
            })
          })
          this.loadingCtrl.dismiss();
        } else {
          console.log(response)
          this.loadingCtrl.dismiss();
        }
      },
      error: (error) => {
        console.log(error)
        this.loadingCtrl.dismiss();
      }
    })
  }

  player1(playerId: any) {
    loadingSpinner(this.loadingCtrl);

    this.authService.call(null, `player/${playerId}/2022/299`, 'GET', false).subscribe({
      next: (response) => {
        console.log(response)
        if (response.status === 'SUCCESS') {
          response.data.statistics?.map((
            e: {
              league: { name: any; };
              games: { position: any; };
              shots: { total: any, on: any },
              goals: { total: any; assists: any; };
              passes: { total: any; key: any; accuracy: any; };
              tackles: { total: any; blocks: any; interceptions: any; };
              dribbles: { attempts: any; success: any; past: any };
              fouls: { drawn: any; committed: any; };
              cards: { yellow: any, yellowred: any; red: any; };
            }) => {
            this.players1.push({
              value: response.data.player.id,
              viewValue: response.data.player.name,
              age: response.data.player.age,
              height: response.data.player.height,
              weight: response.data.player.weight,
              league: e.league.name,
              position: e.games.position,
              shots: {
                total: e.shots.total,
                on: e.shots.on
              },
              goals: {
                total: e.goals.total,
                assists: e.goals.assists
              },
              passes: {
                total: e.passes.total,
                key: e.passes.key,
                accuracy: e.passes.accuracy
              },
              tackles: {
                total: e.tackles.total,
                blocks: e.tackles.blocks,
                interceptions: e.tackles.interceptions
              },
              dribbles: {
                attempts: e.dribbles.attempts,
                success: e.dribbles.success,
                past: e.dribbles.past
              },
              fouls: {
                drawn: e.fouls.drawn,
                committed: e.fouls.committed,
              },
              cards: {
                yellow: e.cards.yellow,
                yellowred: e.cards.yellowred,
                red: e.cards.red
              },
            })
          })
          this.loadingCtrl.dismiss()
        } else {
          console.log(response)
          this.loadingCtrl.dismiss()
        }
      },
      error: (error) => {
        console.log(error);
        this.loadingCtrl.dismiss()
      }
    })
  }

  player2(playerId: any) {
    loadingSpinner(this.loadingCtrl);

    this.authService.call(null, `player/${playerId}/2022/299`, 'GET', false).subscribe({
      next: (response) => {
        console.log(response)
        if (response.status === 'SUCCESS') {
          response.data.statistics?.map((
            e: {
              league: { name: any; };
              games: { position: any; };
              shots: { total: any, on: any },
              goals: { total: any; assists: any; };
              passes: { total: any; key: any; accuracy: any; };
              tackles: { total: any; blocks: any; interceptions: any; };
              dribbles: { attempts: any; success: any; past: any };
              fouls: { drawn: any; committed: any; };
              cards: { yellow: any, yellowred: any; red: any; };
            }) => {
            this.players1.push({
              value: response.data.player.id,
              viewValue: response.data.player.name,
              age: response.data.player.age,
              height: response.data.player.height,
              weight: response.data.player.weight,
              league: e.league.name,
              position: e.games.position,
              shots: {
                total: e.shots.total,
                on: e.shots.on
              },
              goals: {
                total: e.goals.total,
                assists: e.goals.assists
              },
              passes: {
                total: e.passes.total,
                key: e.passes.key,
                accuracy: e.passes.accuracy
              },
              tackles: {
                total: e.tackles.total,
                blocks: e.tackles.blocks,
                interceptions: e.tackles.interceptions
              },
              dribbles: {
                attempts: e.dribbles.attempts,
                success: e.dribbles.success,
                past: e.dribbles.past
              },
              fouls: {
                drawn: e.fouls.drawn,
                committed: e.fouls.committed,
              },
              cards: {
                yellow: e.cards.yellow,
                yellowred: e.cards.yellowred,
                red: e.cards.red
              },
            })
          })
          this.loadingCtrl.dismiss()
        } else {
          console.log(response)
          this.loadingCtrl.dismiss()
        }
      },
      error: (error) => {
        console.log(error);
        this.loadingCtrl.dismiss()
      }
    })
  }
}
