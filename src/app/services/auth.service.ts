import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiCalled } from '../models/api-called.models';
import { FootballPlayers, FootballSquads, FootballTeams } from '../models/football.models';
import { Session } from '../models/login.models';
import { Users } from '../models/users.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public modelSession: Session = {
    token: this.getToken(),
    idUser: this.getIdUser(),
    profile: this.getProfile(),
    email: this.getEmail(),
  };

  public modelUsers: Users = {
    userList: this.getUsersList(),
  }

  public modelFootballTeams: FootballTeams = {
    team1: this.getListFootballTeams1(),
    team2: this.getListFootballTeams2()
  }

  public modelFootballSquads: FootballSquads = {
    squad1: this.getListFootballSquads1(),
    squad2: this.getListFootballSquads2()
  }

  public modelFootballPlayers: FootballPlayers = {
    player1: this.getListFootballPlayers1(),
    player2: this.getListFootballPlayers2()
  }

  public modelApiCalled: ApiCalled = {
    band: this.getApiCalled(),
  }

  private headers = new HttpHeaders();
  private json: any;

  constructor(private httpClient: HttpClient) { }

  call(data: any, route: any, method: any, status: boolean): Observable<any> {
    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
    // if (route.startsWith('squad') || route.startsWith('player')) {
    //   this.headers = this.headers.set('x-rapidapi-host', 'v3.football.api-sports.io');
    //   this.headers = this.headers.set('x-rapidapi-key', '2a6ba7f0f274a12f31b69e85b7a28db3');
    // }
    switch (method.toUpperCase()) {
      case 'GET':
        if (status === true) {
          this.headers = this.headers.set('auth-token', this.modelSession.token);
          return this.httpClient.get(environment.apiUrl + route, { headers: this.headers });
        } else {
          return this.httpClient.get(environment.apiUrl + route, { headers: this.headers });
        }
      case 'POST':
        if (data != null) {
          if (status === true) {
            this.headers = this.headers.set('auth-token', this.modelSession.token);
            this.json = JSON.stringify(data);
            return this.httpClient.post(environment.apiUrl + route, this.json, { headers: this.headers });
          } else {
            this.json = JSON.stringify(data);
            return this.httpClient.post(environment.apiUrl + route, this.json, { headers: this.headers });
          }
        } else {
          if (status === true) {
            this.headers = this.headers.set('auth-token', this.modelSession.token);
            this.json = {};
            return this.httpClient.post(environment.apiUrl + route, this.json, { headers: this.headers });
          } else {
            this.json = {};
            return this.httpClient.post(environment.apiUrl + route, this.json, { headers: this.headers });
          }
        }
      case 'PATCH':
        if (data != null) {
          if (status === true) {
            this.headers = this.headers.set('auth-token', this.modelSession.token);
            this.json = JSON.stringify(data);
            return this.httpClient.patch(environment.apiUrl + route, this.json, { headers: this.headers });
          } else {
            this.json = JSON.stringify(data);
            return this.httpClient.patch(environment.apiUrl + route, this.json, { headers: this.headers });
          }
        } else {
          if (status === true) {
            this.headers = this.headers.set('auth-token', this.modelSession.token);
            this.json = {};
            return this.httpClient.patch(environment.apiUrl + route, this.json, { headers: this.headers });
          } else {
            this.json = {};
            return this.httpClient.patch(environment.apiUrl + route, this.json, { headers: this.headers });
          }
        }
      case 'DELETE':
        if (status === true) {
          this.headers = this.headers.set('auth-token', this.modelSession.token);
          return this.httpClient.get(environment.apiUrl + route, { headers: this.headers });
        } else {
          return this.httpClient.get(environment.apiUrl + route, { headers: this.headers });
        }

    }

    return this.httpClient.post(environment.apiUrl + route, this.json, { headers: this.headers });
  }

  setModelSesionInSession(modelSession: Session) {
    sessionStorage.setItem('modelSession', JSON.stringify(modelSession));
  }
  setModelUsers(modelUsers: Users) {
    sessionStorage.setItem('modelUsers', JSON.stringify(modelUsers));
  }
  setModelFootballTeams(modelFootballTeams: FootballTeams) {
    sessionStorage.setItem('modelFootballTeams', JSON.stringify(modelFootballTeams))
  }
  setModelFootballSquads(modelFootballSquads: FootballSquads) {
    sessionStorage.setItem('modelFootballSquads', JSON.stringify(modelFootballSquads))
  }
  setModelFootballPlayers(modelFootballPlayers: FootballPlayers) {
    sessionStorage.setItem('modelFootballPlayers', JSON.stringify(modelFootballPlayers))
  }
  setModelApiCalled(modelApiCalled: ApiCalled) {
    sessionStorage.setItem('modelApiCalled', JSON.stringify(modelApiCalled))
  }



  getModelSesion() {
    return sessionStorage.getItem('modelSession') === null ? null : JSON.parse(sessionStorage.getItem('modelSession') || '')
  }
  getModelUsers() {
    return sessionStorage.getItem('modelUsers') === null ? null : JSON.parse(sessionStorage.getItem('modelUsers') || '')
  }
  getModelFootballTeams() {
    return sessionStorage.getItem('modelFootballTeams') === null ? null : JSON.parse(sessionStorage.getItem('modelFootballTeams') || '');
  }
  getModelFootballSquads() {
    return sessionStorage.getItem('modelFootballSquads') === null ? null : JSON.parse(sessionStorage.getItem('modelFootballSquads') || '');
  }
  getModelFootballPlayers() {
    return sessionStorage.getItem('modelFootballPlayers') === null ? null : JSON.parse(sessionStorage.getItem('modelFootballPlayers') || '');
  }
  getModelApiCalled() {
    return sessionStorage.getItem('modelApiCalled') === null ? null : JSON.parse(sessionStorage.getItem('modelApiCalled') || '');
  }


  setToken(token: any) { this.modelSession.token = token }
  setIdUser(idUser: number) { this.modelSession.idUser = idUser }
  setProfile(profile: any) { this.modelSession.profile = profile }
  setEmail(email: string) { this.modelSession.email = email }
  setUsersList(list: object[]) { this.modelUsers.userList = list }
  setListFootballTeams1(list: object[]) { this.modelFootballTeams.team1 = list }
  setListFootballTeams2(list: object[]) { this.modelFootballTeams.team2 = list }
  setListFootballSquads1(list: object[]) { this.modelFootballSquads.squad1 = list }
  setListFootballSquads2(list: object[]) { this.modelFootballSquads.squad2 = list }
  setListFootballPlayers1(list: object[]) { this.modelFootballPlayers.player1 = list }
  setListFootballPlayers2(list: object[]) { this.modelFootballPlayers.player2 = list }
  setApiCalled(band: Boolean) { this.modelApiCalled.band = band }

  getToken() { return this.getModelSesion() === null || this.getModelSesion() === undefined ? null : this.getModelSesion().token }
  getIdUser() { return this.getModelSesion() === null || this.getModelSesion() === undefined ? null : this.getModelSesion().idUser }
  getProfile() { return this.getModelSesion() === null || this.getModelSesion() === undefined ? null : this.getModelSesion().profile }
  getEmail() { return this.getModelSesion() === null || this.getModelSesion() === undefined ? null : this.getModelSesion().email }
  getUsersList() { return this.getModelUsers() === null || this.getModelUsers() === undefined ? null : this.getModelUsers().userList }
  getListFootballTeams1() { return this.getModelFootballTeams() === null || this.getModelFootballTeams() === undefined ? null : this.getModelFootballTeams().teams1 }
  getListFootballTeams2() { return this.getModelFootballTeams() === null || this.getModelFootballTeams() === undefined ? null : this.getModelFootballTeams().teams2 }
  getListFootballSquads1() { return this.getModelFootballSquads() === null || this.getModelFootballSquads() === undefined ? null : this.getModelFootballSquads().squad1 }
  getListFootballSquads2() { return this.getModelFootballSquads() === null || this.getModelFootballSquads() === undefined ? null : this.getModelFootballSquads().squad2 }
  getListFootballPlayers1() { return this.getModelFootballPlayers() === null || this.getModelFootballPlayers() === undefined ? null : this.getModelFootballPlayers().player1 }
  getListFootballPlayers2() { return this.getModelFootballPlayers() === null || this.getModelFootballPlayers() === undefined ? null : this.getModelFootballPlayers().player2 }
  getApiCalled() { return this.getModelApiCalled() === null || this.getModelApiCalled() === undefined ? null : this.getModelApiCalled().band }
}