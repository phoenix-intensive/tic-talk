import {Component, inject, input} from '@angular/core';
import {DatePipe} from '@angular/common';
import {ImgUrlPipe} from '../../../shared/pipes/img-url.pipe';
import {ProfileService} from '../../../shared/services/profile.service';
import {MessageResponseType} from '../../../../../types/chats-type';
import {ChatsService} from '../../../shared/services/chats.service';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'chats-btn',
  standalone: true,
  imports: [
    DatePipe,
    ImgUrlPipe,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './chats-btn.component.html',
  styleUrl: './chats-btn.component.scss'
})
export class ChatsBtnComponent {

  private profileService = inject(ProfileService);
  private chatsService = inject(ChatsService);
  chat = input<MessageResponseType>();

}
