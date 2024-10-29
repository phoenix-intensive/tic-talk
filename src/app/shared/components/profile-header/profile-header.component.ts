import {Component, input} from '@angular/core';
import {ProfileType} from '../../../../../types/profile-type';
import {NgIf} from '@angular/common';
import {ImgUrlPipe} from '../../pipes/img-url.pipe';

@Component({
  selector: 'profile-header',
  standalone: true,
  imports: [
    NgIf,
    ImgUrlPipe
  ],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss'
})
export class ProfileHeaderComponent {

  profile = input<ProfileType>();

}
