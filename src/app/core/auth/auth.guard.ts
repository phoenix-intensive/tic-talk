import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "./auth.service";
import {MatSnackBar} from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private authService = inject(AuthService);
  private _snackBar = inject(MatSnackBar);
  private router = inject(Router);


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isLoggedIn: boolean = this.authService.isLoggedIn;
    if (!isLoggedIn) {
      this._snackBar.open('Для доступа необходимо авторизоваться');
      this.router.navigate(['/login']);

    }
    return isLoggedIn;
  }

}
