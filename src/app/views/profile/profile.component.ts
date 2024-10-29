import {Component, inject, signal} from '@angular/core';
import {ProfileHeaderComponent} from '../../shared/components/profile-header/profile-header.component';
import {ProfileService} from '../../shared/services/profile.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {firstValueFrom, switchMap} from 'rxjs';
import {toObservable} from '@angular/core/rxjs-interop';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {SubscriberCardComponent} from '../../shared/layout/side-bar/subscriber-card/subscriber-card.component';
import {ImgUrlPipe} from '../../shared/pipes/img-url.pipe';
import {PostFeedComponent} from './post-feed/post-feed.component';
import {ChatsService} from '../../shared/services/chats.service';
import {ChatsType} from '../../../../types/chats-type';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    RouterLink,
    ProfileHeaderComponent,
    NgIf,
    AsyncPipe,
    NgForOf,
    SubscriberCardComponent,
    ImgUrlPipe,
    PostFeedComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  private profileService = inject(ProfileService);
  private chatsService = inject(ChatsService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  isMyPage = signal(false);

  me$ = toObservable(this.profileService.me);
  subscribers$ = this.profileService.getSubscribersList(5)
  profile$ = this.activatedRoute.params
    .pipe(
      switchMap(({id}) => {
        this.isMyPage.set(id === 'me' || id === this.profileService.me()?.id)
        if (id === 'me') return this.me$
        return this.profileService.getAccount(id);
      })
    )


  async sendMessage(userId: number) {
    firstValueFrom(this.chatsService.createChats(userId))
      .then((res: ChatsType): void => {
        this.router.navigate(['/chats', res.id])
      })
  }
}
