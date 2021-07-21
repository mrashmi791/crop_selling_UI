import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean |
    UrlTree {
    if (this.authService.isUserLoggedIn()) {
      return true;
    } else {
      sessionStorage.setItem("isLoggedIn", "false");
      return this.router.parseUrl("/login");
    }
    // return this.authService.isAuthenticate;
  }

}