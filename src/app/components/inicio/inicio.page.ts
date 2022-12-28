import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { loadingSpinner } from 'src/app/shared/loading/loading.component';

interface selectTeam {
  value: number;
  viewValue: string;
}

interface selectSquad {
  value: number;
  viewValue: string;
}
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  teams: selectTeam[] = []
  squads: selectSquad[] = []
  formTeams: FormGroup;

  constructor(
    private authService: AuthService,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public form: FormBuilder
  ) {
    this.formTeams = this.form.group({
      idTeams: new FormControl('', [Validators.required]),
      idSquad: new FormControl('', [Validators.required])
    })
  }

  ngOnInit() {
    this.footballTeams()
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

  footballTeams() {
    this.authService.call(null, 'teams', 'GET', false).subscribe({
      next: (response) => {
        if (response.status === 'SUCCESS') {
          response.data.map((e: { teamID: any; name: any; }) => {
            this.teams.push({
              value: e.teamID,
              viewValue: e.name,
            })
          })

          console.log(this.teams)
        } else {
          console.log(response)
        }
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  squad(teamID: any) {
    loadingSpinner(this.loadingCtrl)

    this.authService.call(null, `squad/${teamID}`, 'GET', false).subscribe({
      next: (response) => {
        if (response.status === 'SUCCESS') {
          response.data.players.map((e: { id: any; name: any; }) => {
            this.squads.push({
              value: e.id,
              viewValue: e.name,
            })
          })
        } else {
          console.log(response)
          this.loadingCtrl.dismiss();
        }
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  player(playerId: any) {
    loadingSpinner(this.loadingCtrl);

    this.authService.call(null, `player/${playerId}/2022/299`, 'GET', false).subscribe({
      next: (response) => {
        console.log(response)
        this.loadingCtrl.dismiss()
      },
      error: (error) => {
        console.log(error);
        this.loadingCtrl.dismiss()
      }
    })
  }
}
