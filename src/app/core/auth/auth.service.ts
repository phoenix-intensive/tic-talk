import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, tap, throwError} from 'rxjs';
import {LoginResponseType} from '../../../../types/login-response.type';
import {environment} from '../../../environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private _snackBar = inject(MatSnackBar);
  private cookieService = inject(CookieService);
  private router = inject(Router);

  public accessToken: string | null = null;
  private refreshToken: string | null = null;
  private userId: string | null = null;


  get isLoggedIn() {
    if (!this.accessToken) {
      this.accessToken = this.cookieService.get('accessToken');
      this.refreshToken = this.cookieService.get('refreshToken');
    }
    return !!this.accessToken;
  }


  getAccessToken(): string | null {
    if (!this.accessToken) {
      this.accessToken = this.cookieService.get('accessToken');
    }
    return this.accessToken;
  }


  getRefreshToken(): string | null {
    if (!this.refreshToken) {
      this.refreshToken = this.cookieService.get('refreshToken');
    }
    return this.refreshToken;
  }


  login(username: string, password: string): Observable<LoginResponseType> {
    const fd = new FormData()

    fd.append('username', username)
    fd.append('password', password)
    return this.http.post<LoginResponseType>(environment.api + 'auth/token', fd)
      .pipe(
        tap((response: LoginResponseType) => {
          const loginResponse: LoginResponseType = response as LoginResponseType;

          if (loginResponse.access_token && loginResponse.refresh_token) {
            this.accessToken = loginResponse.access_token;
            this.refreshToken = loginResponse.refresh_token;
            this.userId = loginResponse.token_type;

            this.cookieService.set('accessToken', this.accessToken);
            this.cookieService.set('refreshToken', this.refreshToken);

          } else {
            this._snackBar.open('Ошибка при авторизации');
            throw new Error('Ошибка при авторизации');
          }
        })
      );
  }

  refreshTokenProcess(): Observable<LoginResponseType> {
    return this.http.post<LoginResponseType>(environment.api + 'auth/refresh', {refresh_token: this.refreshToken})
      .pipe(
        catchError(err => {
          return throwError(() => err);
        })
      );
  }


  logout() {
    this.cookieService.deleteAll();
    this.accessToken = null;
    this.refreshToken = null;
    this.router.navigate(['/login']);
  }
}
