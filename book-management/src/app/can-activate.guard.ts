import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './authService';

@Injectable()
export class CanActivateGuard implements CanActivate {
  constructor (private authService: AuthService, private router: Router) {}
  canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const bool = this.authService.isAuthenticated();
    if (bool === true) {
      return true;
    } if (bool === false) {
      this.router.navigate( ['']);
      return false;
    } else {
      this.router.navigate( ['']);
      return null;
    }
  }
}
