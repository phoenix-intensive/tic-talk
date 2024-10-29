import {Component, inject, input} from '@angular/core';
import {Comment, PostResponse} from '../../../../../../types/post.type';
import {ImgUrlPipe} from '../../../../shared/pipes/img-url.pipe';
import {ProfileService} from '../../../../shared/services/profile.service';
import {DatePipe, NgForOf} from '@angular/common';
import {PostInputComponent} from '../../post-input/post-input.component';

@Component({
  selector: 'comment',
  standalone: true,
  imports: [
    ImgUrlPipe,
    DatePipe,
    NgForOf,
    PostInputComponent
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {

  private profileService = inject(ProfileService);

  comment = input<Comment>()
  me = this.profileService.me;
  post = input<PostResponse>();
}
