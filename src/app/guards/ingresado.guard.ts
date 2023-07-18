import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngresadoGuard implements CanActivate {

  constructor(
    public navCtrl: NavController,
    private authService: AuthService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let token = this.authService.getToken();
    console.log(token)

    if (token === null || token === undefined) {
      this.navCtrl.navigateRoot('login');
      return false;
    } else {
      return true;
    }
  }

}
