import {Component, HostBinding, input} from '@angular/core';
import {MessageType} from '../../../../../../../types/chats-type';
import {ImgUrlPipe} from '../../../../../shared/pipes/img-url.pipe';
import {CommonModule, DatePipe} from '@angular/common';

@Component({
  selector: 'chat-workspace-message',
  standalone: true,
  imports: [
    CommonModule,
    ImgUrlPipe,
    DatePipe
  ],
  templateUrl: './chat-workspace-message.component.html',
  styleUrl: './chat-workspace-message.component.scss'
})
export class ChatWorkspaceMessageComponent {

  message = input.required<MessageType>();

  @HostBinding('class.is-mine')
  get isMine() {
    return this.message().isMine
  }

}
