import {Component, inject, signal} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DndDirective} from '../../directives/dnd.directive';
import {CommonModule} from '@angular/common';


@Component({
  selector: 'avatar-upload',
  standalone: true,
  imports: [
    CommonModule,
    DndDirective
  ],
  templateUrl: './avatar-upload.component.html',
  styleUrl: './avatar-upload.component.scss'
})
export class AvatarUploadComponent {

  private _snackBar = inject(MatSnackBar);

  preview = signal<string>('assets/images/user-avatar.png')
  avatar: File | null = null;


  fileBrowserHandler(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    this.processFile(file);
  }


  onFileDropped(file: File) {
    this.processFile(file);
  }


  processFile(file: File | null | undefined) {
    if (!file || !file.type.match('image')) {
      this._snackBar.open('Нет файла"')
      return;
    }

    const reader = new FileReader();

    reader.onload = event => {
      this.preview.set(event.target?.result?.toString() ?? '');
    }

    reader.readAsDataURL(file);
    this.avatar = file;
  }

}
