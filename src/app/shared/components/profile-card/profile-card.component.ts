import {Component, Input} from '@angular/core';
import {ProfileType} from '../../../../../types/profile-type';
import {CommonModule} from '@angular/common';
import {ImgUrlPipe} from '../../pipes/img-url.pipe';

@Component({
  selector: 'profile-card',
  standalone: true,
  imports: [
    CommonModule,
    ImgUrlPipe
  ],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss'
})


export class ProfileCardComponent {

  @Input() profile!: ProfileType;
}
