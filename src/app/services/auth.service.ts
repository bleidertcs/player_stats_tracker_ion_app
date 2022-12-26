import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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
}
