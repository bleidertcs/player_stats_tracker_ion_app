import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdministradorGuard implements CanLoad {

 constructor(private authService: AuthService){}

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
    const allowedRoles = route.data?.['allowedRoles'];
    
    return this.authService.user$.pipe (
    
      map ((user) => Boolean (user && allowedRoles.includes(user.role))),
      tap ((hasrole)=> hasrole === false && alert ('Acceso Denegado'))
)

}
}
