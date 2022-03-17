import { Router } from '@angular/router';
import { User } from './../../models/user';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user:User = JSON.parse(localStorage.getItem('user'));
    if (user) {
      return true;
    }
    this.router.navigateByUrl(`/login`)
    return false;
  }
}
