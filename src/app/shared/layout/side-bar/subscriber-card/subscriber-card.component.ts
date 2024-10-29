import {Component, Input} from '@angular/core';
import {ProfileType} from '../../../../../../types/profile-type';
import {ImgUrlPipe} from '../../../pipes/img-url.pipe';

@Component({
  selector: 'subscriber-card',
  standalone: true,
  imports: [
    ImgUrlPipe
  ],
  templateUrl: './subscriber-card.component.html',
  styleUrl: './subscriber-card.component.scss'
})
export class SubscriberCardComponent {

  @Input() profile!: ProfileType;

}
