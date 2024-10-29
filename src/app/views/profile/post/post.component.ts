import {Component, inject, input, OnInit, signal} from '@angular/core';
import {PostResponse, Comment} from '../../../../../types/post.type';
import {ImgUrlPipe} from '../../../shared/pipes/img-url.pipe';
import {ProfileService} from '../../../shared/services/profile.service';
import {DatePipe, NgForOf} from '@angular/common';
import {PostInputComponent} from '../post-input/post-input.component';
import {CommentComponent} from './comment/comment.component';
import {PostService} from '../../../shared/services/post.service';
import {firstValueFrom} from 'rxjs';



@Component({
  selector: 'post',
  standalone: true,
  imports: [
    ImgUrlPipe,
    DatePipe,
    PostInputComponent,
    CommentComponent,
    NgForOf
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {

  private profileService = inject(ProfileService);
  private postService = inject(PostService);

  post = input<PostResponse>();
  me = this.profileService.me;
  comments = signal<Comment[]>([]);


  async ngOnInit() {
    this.comments.set(this.post()!.comments);
  }

  async onCreated() {
    const comments: Comment[]  = await firstValueFrom(this.postService.getCommentByPostId(this.post()!.id));
    this.comments.set(comments);
  }
}
