import {Component, inject} from '@angular/core';
import {ChatWorkspaceHeaderComponent} from './chat-workspace-header/chat-workspace-header.component';
import {
  ChatWorkspaceMessagesWrapperComponent
} from './chat-workspace-messages-wrapper/chat-workspace-messages-wrapper.component';
import {MessageInputComponent} from '../../../shared/components/message-input/message-input.component';
import {ChatsService} from '../../../shared/services/chats.service';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs';
import {AsyncPipe, NgIf} from '@angular/common';


@Component({
  selector: 'chats-workspace',
  standalone: true,
  imports: [
    ChatWorkspaceHeaderComponent,
    ChatWorkspaceMessagesWrapperComponent,
    MessageInputComponent,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './chats-workspace.component.html',
  styleUrl: './chats-workspace.component.scss'
})
export class ChatsWorkspaceComponent {
  private route = inject(ActivatedRoute)
  private chatsService = inject(ChatsService);

  activeChat$ = this.route.params
    .pipe(
      switchMap(({id}) => this.chatsService.getMyChatById(id))
    )

}
