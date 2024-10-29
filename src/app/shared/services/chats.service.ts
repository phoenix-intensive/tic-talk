import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {ChatsType, MessageResponseType, MessageType} from '../../../../types/chats-type';
import {ProfileService} from './profile.service';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  private http = inject(HttpClient);
  me = inject(ProfileService).me;

  activeChatMessages = signal<MessageType[]>([])


  createChats(userId: number): Observable<ChatsType> {
    return this.http.post<ChatsType>(environment.api + `chat/${userId}`, {})
  }


  getMyChats(): Observable<MessageResponseType[]> {
    return this.http.get<MessageResponseType[]>(environment.api + `chat/get_my_chats/`)
  }


  getMyChatById(chatId: number) {
    return this.http.get<ChatsType>(environment.api + `chat/${chatId}`)
      .pipe(map(chat => {
            const pathMessages = chat.messages.map(message => {
              return {
                ...message,
                user: chat.userFirst.id === message.userFromId ? chat.userFirst : chat.userSecond,
                isMine: message.userFromId === this.me()?.id
              }
            })
            this.activeChatMessages.set(pathMessages)
            return {
              ...chat,
              companion: chat.userFirst.id === this.me()?.id ? chat.userSecond : chat.userFirst,
              messages: pathMessages
            }
          }
        )
      )
  }


  sendMessage(chatId: number, message: string): Observable<MessageType> {
    return this.http.post<MessageType>(environment.api + `message/send/${chatId}`, {}, {
      params: {
        message
      }
    })
  }
}
