import {HttpInterceptorFn, HttpRequest, HttpHandlerFn} from '@angular/common/http';
import {AuthService} from './auth.service';
import {inject} from '@angular/core';
import {catchError, switchMap, throwError} from 'rxjs';
import {LoginResponseType} from '../../../../types/login-response.type';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const cookieService = inject(CookieService);
  const router = inject(Router);

  const token = authService.getAccessToken();
  let authReq = req;

  // Добавляем токен в заголовок запроса, если он есть
  if (token) {
    authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
  }

  return next(authReq).pipe(
    catchError(error => {
      // Обработка ошибки 403
      if (error.status === 403) {
        return handle403Error(authReq, next);
      }
      return throwError(() => error);
    })
  );

  function handle403Error(authReq: HttpRequest<any>, next: HttpHandlerFn) {
    return authService.refreshTokenProcess()
      .pipe(
        switchMap((result: LoginResponseType) => {
          let error: string = '';


          const refreshResult: LoginResponseType = result as LoginResponseType;
          if (!refreshResult.access_token || !refreshResult.refresh_token) {
            return throwError(() => Error(error));
          }


          if (refreshResult && !error && refreshResult.access_token && refreshResult.refresh_token) {
            // Сохраняем новые токены в cookies
            cookieService.set('accessToken', result.access_token);
            cookieService.set('refreshToken', result.refresh_token);

            const newAuthReq = authReq.clone({
              headers: authReq.headers.set('Authorization', `Bearer ${refreshResult.access_token}`)
            });

            return next(newAuthReq); // Pass the new request with the refreshed token
          } else {
            return throwError(() => new Error('Repeat request Error'));
          }
        }),
        catchError(err => {
          router.navigate(['/login']);
          return throwError(() => err);
        })
      );
  }
}
