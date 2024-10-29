import {Component, inject, input, OnInit, signal} from '@angular/core';
import {ChatWorkspaceMessageComponent} from './chat-workspace-message/chat-workspace-message.component';
import {MessageInputComponent} from '../../../../shared/components/message-input/message-input.component';
import {ChatsService} from '../../../../shared/services/chats.service';
import {ChatsType, MessageType} from '../../../../../../types/chats-type';
import {NgForOf} from '@angular/common';
import {firstValueFrom} from 'rxjs';

@Component({
  selector: 'chat-workspace-messages-wrapper',
  standalone: true,
  imports: [
    ChatWorkspaceMessageComponent,
    MessageInputComponent,
    NgForOf
  ],
  templateUrl: './chat-workspace-messages-wrapper.component.html',
  styleUrl: './chat-workspace-messages-wrapper.component.scss'
})
export class ChatWorkspaceMessagesWrapperComponent {
  private chatsService = inject(ChatsService);
  chat = input.required<ChatsType>();
  messages = this.chatsService.activeChatMessages;


  async onSendMessage(messageText: string) {
    await firstValueFrom(this.chatsService.sendMessage(this.chat()?.id, messageText));
    await firstValueFrom(this.chatsService.getMyChatById(this.chat()?.id));
  }
}
