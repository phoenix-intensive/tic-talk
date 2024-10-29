import {Component, effect, inject, ViewChild} from '@angular/core';
import {AsyncPipe, CommonModule, NgIf} from '@angular/common';
import {ProfileHeaderComponent} from '../../shared/components/profile-header/profile-header.component';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {ProfileService} from '../../shared/services/profile.service';
import {firstValueFrom} from 'rxjs';
import {ProfileType} from '../../../../types/profile-type';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AvatarUploadComponent} from '../../shared/components/avatar-upload/avatar-upload.component';
import {ImgUrlPipe} from '../../shared/pipes/img-url.pipe';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    AsyncPipe,
    NgIf,
    ProfileHeaderComponent,
    ReactiveFormsModule,
    AvatarUploadComponent,
    ImgUrlPipe
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {

  private fb = inject(FormBuilder);
  private profileService = inject(ProfileService);
  private _snackBar = inject(MatSnackBar);

  me = this.profileService.me;

  @ViewChild(AvatarUploadComponent) avatarUploader!: AvatarUploadComponent

  form = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    username: [{value: '', disabled: true}, [Validators.required]],
    description: [''],
    stack: ['']
  })

  constructor() {
    effect(() => {
      const profile: ProfileType | null = this.profileService.me();
      this.form.patchValue({
        firstName: profile?.firstName || '',
        lastName: profile?.lastName || '',
        username: profile?.username || '',
        description: profile?.description || '',
        stack: Array.isArray(profile?.stack) ? profile.stack.join(', ') : '', // Преобразуем массив в строку
      });
    });
  }


  onSave(): void {
    if (this.form.invalid) {
      this._snackBar.open('Заполните обязательные поля "Имя" и "Фамилию"')
      return;
    }

    if (this.avatarUploader.avatar) {
      firstValueFrom(this.profileService.uploadAvatar(this.avatarUploader.avatar));
    }

    const profileUpdate: Partial<ProfileType> = {
      firstName: this.form.value.firstName || '', // Установите в пустую строку, если поле пустое
      lastName: this.form.value.lastName || '',
      username: this.form.value.username || '',
      description: this.form.value.description || '',
      stack: this.form.value.stack && typeof this.form.value.stack === 'string'
        ? this.form.value.stack.split(/[\s,]+/).map(item => item.trim()) // Разделение по пробелам и запятым
        : [], // Установите в пустой массив, если поле пустое
    };

    firstValueFrom(this.profileService.updateProfile(profileUpdate));
    this._snackBar.open('Изменения профиля сохранены');
  }

}
