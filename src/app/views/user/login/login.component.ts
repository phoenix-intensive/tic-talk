import {Component, inject, signal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {LoginResponseType} from '../../../../../types/login-response.type';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../../../core/auth/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private _snackBar = inject(MatSnackBar);
  private router = inject(Router);

  isPasswordVisible = signal<boolean>(false);

  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  })


  login(): void {
    if (this.loginForm.valid && this.loginForm.value.username && this.loginForm.value.password) {
      this.authService.login(this.loginForm.value.username, this.loginForm.value.password)
        .subscribe({
          next: (data: LoginResponseType): void => {
            let error = null;

            const loginResponse: LoginResponseType = data as LoginResponseType;

            if (!loginResponse.access_token || !loginResponse.refresh_token || !loginResponse.token_type) {
              error = 'Ошибка при авторизации';
            }

            if (error) {
              this._snackBar.open(error);
              throw new Error(error);
            }


            this._snackBar.open('Вы успешно авторизовались');
            this.router.navigate(['/']);

          },
          error: (errorResponse: HttpErrorResponse): void => {
            if (errorResponse.error && errorResponse.error.message) {
              this._snackBar.open(errorResponse.error.message);
            } else {
              this._snackBar.open('Ошибка при авторизации');
            }
          }
        })
    }
  }
}
