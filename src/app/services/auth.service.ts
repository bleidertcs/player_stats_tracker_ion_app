import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Session } from '../models/login.models';

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

  private headers = new HttpHeaders();
  private json: any;

  constructor(private httpClient: HttpClient) { }

  call(data: any, route: any, method: any, status: boolean): Observable<any> {
    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
    if (route.startsWith('squad') || route.startsWith('player')) {
      this.headers = this.headers.set('x-rapidapi-host', 'v3.football.api-sports.io');
      this.headers = this.headers.set('x-rapidapi-key', '2a6ba7f0f274a12f31b69e85b7a28db3');
    }
    switch (method.toUpperCase()) {
      case 'GET':
        if (status === true) {
          return this.httpClient.get(environment.apiUrl + route, { headers: this.headers });
        } else {
          return this.httpClient.get(environment.apiUrl + route, { headers: this.headers });
        }
      case 'POST':
        if (data != null) {
          if (status === true) {
            this.json = JSON.stringify(data);
            return this.httpClient.post(environment.apiUrl + route, this.json, { headers: this.headers });
          } else {
            this.json = JSON.stringify(data);
            return this.httpClient.post(environment.apiUrl + route, this.json, { headers: this.headers });
          }
        } else {
          if (status === true) {
            this.json = {};
            return this.httpClient.post(environment.apiUrl + route, this.json, { headers: this.headers });
          } else {
            this.json = {};
            return this.httpClient.post(environment.apiUrl + route, this.json, { headers: this.headers });
          }
        }
    }

    return this.httpClient.post(environment.apiUrl + route, this.json, { headers: this.headers });
  }

  setModelSesionInSession(modelSession: Session) {
    sessionStorage.setItem('modelSession', JSON.stringify(modelSession));
  }

  getModelSesion() {
    return sessionStorage.getItem('modelSession') === null ? null : JSON.parse(sessionStorage.getItem('modelSession') || '')
  }

  setToken(token: string) { this.modelSession.token = token }
  setIdUser(idUser: number) { this.modelSession.idUser = idUser }
  setProfile(profile: any) { this.modelSession.profile = profile }
  setEmail(email: string) { this.modelSession.email = email }

  getToken() { return this.getModelSesion() === null || this.getModelSesion() === undefined ? null : this.getModelSesion().token }
  getIdUser() { return this.getModelSesion() === null || this.getModelSesion() === undefined ? null : this.getModelSesion().idUser }
  getProfile() { return this.getModelSesion() === null || this.getModelSesion() === undefined ? null : this.getModelSesion().profile }
  getEmail() { return this.getModelSesion() === null || this.getModelSesion() === undefined ? null : this.getModelSesion().email }
}