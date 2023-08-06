import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Chart, ChartItem } from 'chart.js/auto';
import { AuthService } from 'src/app/services/auth.service';
import { loadingSpinner } from 'src/app/shared/loading/loading.component';
import { alert } from 'src/app/shared/alert/alert.component';

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
  number: number
}

interface selectSquad2 {
  value: number;
  viewValue: string;
  number: number
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
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit {

  teams1: selectTeam1[] = []
  teams2: selectTeam2[] = []
  squads1: selectSquad1[] = []
  squads2: selectSquad2[] = []
  players1: Players1[] = []
  players2: Players2[] = []
  formTeams: FormGroup;
  chart1!: Chart
  chart2!: Chart

  constructor(
    private authService: AuthService,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public form: FormBuilder,
    private ref: ChangeDetectorRef,
    public alertController: AlertController,
  ) {
    this.formTeams = this.form.group({
      idTeams1: new FormControl('', [Validators.required, e => this.loadSquads1(e)]),
      idTeams2: new FormControl('', [Validators.required, e => this.loadSquads2(e)]),
      idSquad1: new FormControl('', [Validators.required, e => this.loadPlayers1(e)]),
      idSquad2: new FormControl('', [Validators.required, e => this.loadPlayers2(e)]),
    });
  }

  ngOnInit() {
    this.footballTeams1();
    this.footballTeams2();
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

  generateChartPlayer1() {
    const ctx = document.getElementById('chart1') as ChartItem;

    let dataChart = [
      this.players1.map(e => e.shots.total === null ? 3 : e.shots.total)[0],
      this.players1.map(e => e.goals.total === null ? 1 : e.goals.total)[0],
      this.players1.map(e => e.passes.total === null ? 5 : e.passes.total)[0],
      this.players1.map(e => e.tackles.total === null ? 4 : e.tackles.total)[0],
      this.players1.map(e => e.dribbles.success === null ? 2 : e.dribbles.success)[0]
    ]

    console.log(dataChart)

    this.chart1 = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Tiros', 'Goles', 'Pases', 'Entradas', 'Regates'],
        datasets: [{
          label: this.players1.map(e => e.viewValue)[0],
          data: dataChart,
          // borderWidth: 1
        }]
      },
    });

    // this.chart1 = new Chart(ctx, {
    //   type: 'doughnut',
    //   data: {
    //     labels: ['Tiros', 'Goles', 'Pases', 'Entradas', 'Regates'],
    //     datasets: [{
    //       // label: '# of Votes',
    //       data: dataChart,
    //       borderWidth: 1
    //     }]
    //   },
    // });
  }

  generateChartPlayer2() {
    const ctx = document.getElementById('chart2') as ChartItem;

    let dataChart2 = [
      this.players2.map(e => e.shots.total === null ? 6 : e.shots.total)[0],
      this.players2.map(e => e.goals.total === null ? 2 : e.goals.total)[0],
      this.players2.map(e => e.passes.total === null ? 4 : e.passes.total)[0],
      this.players2.map(e => e.tackles.total === null ? 5 : e.tackles.total)[0],
      this.players2.map(e => e.dribbles.success === null ? 3 : e.dribbles.success)[0]
    ]

    this.chart2 = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Tiros', 'Goles', 'Pases', 'Entradas', 'Regates'],
        datasets: [{
          label: this.players2.map(e => e.viewValue)[0],
          data: dataChart2,
          // borderWidth: 1
        }]
      },
    });

    // this.chart2 = new Chart(ctx, {
    //   type: 'doughnut',
    //   data: {
    //     labels: ['Tiros', 'Goles', 'Pases', 'Entradas', 'Regates'],
    //     datasets: [{
    //       // label: '# of Votes',
    //       data: dataChart2,
    //       borderWidth: 1
    //     }]
    //   },
    // });
  }

  selectDisabled(list1: any, list2: any) {
    console.log('lista1', list1);
    console.log('lista2', list2);
    if (list1[0] === undefined || list1[0] === null || list2[0] === undefined || list2[0] === null) {
      this.formTeams.get('idSquad1')?.disable()
      this.formTeams.get('idSquad2')?.disable()
    } else {
      this.formTeams.get('idSquad1')?.enable()
      this.formTeams.get('idSquad2')?.enable()
    }
  }

  test() {
    this.navCtrl.navigateRoot('statistics');
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

  footballTeams1() {
    this.authService.call(null, 'teams', 'GET', true).subscribe({
      next: (response) => {
        if (response.status === 'SUCCESS') {
          response.data.map((e: { id: any; name: any; }) => {
            this.teams1.push({
              value: e.id,
              viewValue: e.name,
            })
          })
          this.teams1.sort((a, b) => (a.viewValue < b.viewValue) ? -1 : 1)
        } else {
          console.log(response)
        }
      },
      error: (error) => {
        console.log(error)

        alert({
          title: 'Error',
          text: 'Falla en el servidor',
          button: ['Cerrar'],
          alertController: this.alertController
        })
      }
    })
  }

  footballTeams2() {
    this.authService.call(null, 'teams', 'GET', true).subscribe({
      next: (response) => {
        if (response.status === 'SUCCESS') {
          response.data.map((e: { id: any; name: any; }) => {
            this.teams2.push({
              value: e.id,
              viewValue: e.name,
            })
          })
          this.teams2.sort((a, b) => (a.viewValue < b.viewValue) ? -1 : 1)
        } else {
          console.log(response)
        }
      },
      error: (error) => {
        console.log(error)

        alert({
          title: 'Error',
          text: 'Falla en el servidor',
          button: ['Cerrar'],
          alertController: this.alertController
        })
      }
    })
  }

  async squad1(teamID: any) {
    await loadingSpinner(this.loadingCtrl)

    this.authService.call(null, `squad/${teamID}`, 'GET', true).subscribe({
      next: (response) => {
        if (response.status === 'SUCCESS') {
          response.data.players.map((e: { id: any; name: any; number: any }) => {
            this.squads1.push({
              value: e.id,
              viewValue: e.name,
              number: e.number
            })
          })
          this.squads1.sort((a, b) => (a.number < b.number) ? -1 : 1)
          this.loadingCtrl.dismiss();

          // this.selectDisabled(this.squads1, this.squads2)
        } else {
          console.log(response)
          this.loadingCtrl.dismiss();
        }
      },
      error: (error) => {
        console.log(error)
        this.loadingCtrl.dismiss();

        alert({
          title: 'Error',
          text: 'Falla en el servidor',
          button: ['Cerrar'],
          alertController: this.alertController
        })
      }
    })
  }

  async squad2(teamID: any) {
    await loadingSpinner(this.loadingCtrl)

    this.authService.call(null, `squad/${teamID}`, 'GET', true).subscribe({
      next: (response) => {
        if (response.status === 'SUCCESS') {
          response.data.players.map((e: { id: any; name: any; number: any }) => {
            this.squads2.push({
              value: e.id,
              viewValue: e.name,
              number: e.number
            })
          })
          this.squads2.sort((a, b) => (a.number < b.number) ? -1 : 1)
          this.loadingCtrl.dismiss();

          // this.selectDisabled(this.squads1, this.squads2)
        } else {
          console.log(response)
          this.loadingCtrl.dismiss();
        }
      },
      error: (error) => {
        console.log(error)
        this.loadingCtrl.dismiss();

        alert({
          title: 'Error',
          text: 'Falla en el servidor',
          button: ['Cerrar'],
          alertController: this.alertController
        })
      }
    })
  }

  async player1(playerId: any) {
    await loadingSpinner(this.loadingCtrl);

    this.authService.call(null, `player/${playerId}/2022/299`, 'GET', true).subscribe({
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
          this.ref.detectChanges()
          this.generateChartPlayer1()
        } else {
          console.log(response)
          this.loadingCtrl.dismiss()
        }
      },
      error: (error) => {
        console.log(error);
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

  async player2(playerId: any) {
    await loadingSpinner(this.loadingCtrl);

    this.authService.call(null, `player/${playerId}/2022/299`, 'GET', true).subscribe({
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
            this.players2.push({
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
          this.ref.detectChanges()
          this.generateChartPlayer2()
        } else {
          console.log(response)
          this.loadingCtrl.dismiss()
        }
      },
      error: (error) => {
        console.log(error);
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

  /********************************************************* ****/
  public active:boolean = false;
  
setActive():void {

this.active =!this.active  
}
 /********************************************************* ****/

}
