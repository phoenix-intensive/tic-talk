import {Route} from '@angular/router';
import {ChatsComponent} from './chats.component';
import {ChatsWorkspaceComponent} from './chat-workspace/chats-workspace.component';

export const chatsRoutes: Route[] = [
  {
    path: '',
    component: ChatsComponent,
    children: [
      {path: ':id', component: ChatsWorkspaceComponent},
    ]
  }
]
