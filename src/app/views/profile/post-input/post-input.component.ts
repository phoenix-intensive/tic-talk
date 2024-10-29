import {Component, EventEmitter, HostBinding, inject, input, Output, Renderer2} from '@angular/core';
import {ImgUrlPipe} from '../../../shared/pipes/img-url.pipe';
import {ProfileService} from '../../../shared/services/profile.service';
import {PostService} from '../../../shared/services/post.service';
import {FormsModule} from '@angular/forms';
import {firstValueFrom} from 'rxjs';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'post-input',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ImgUrlPipe
  ],
  templateUrl: './post-input.component.html',
  styleUrl: './post-input.component.scss'
})
export class PostInputComponent {

  private profileService = inject(ProfileService);
  private postService = inject(PostService);
  me = this.profileService.me;
  isCommentInput = input(false);
  postId = input<number>(0);

  r2 = inject(Renderer2);
  postText: string = '';

  @HostBinding('class.comment')
  @Output() created = new EventEmitter();

  get isComment() {
    return this.isCommentInput()
  }

  onTextAreaInput(event: Event) {
    const textArea = event.target as HTMLTextAreaElement

    this.r2.setStyle(textArea, 'height', 'auto');
    this.r2.setStyle(textArea, 'height', textArea.scrollHeight + 'px');
  }

  onCreatePostAndComment() {
    if (!this.postText) return

    if (this.isCommentInput()) {
      // Если это комментарий, создается комментарий для поста
      firstValueFrom(this.postService.createComment({
        text: this.postText,
        authorId: this.me()!.id,
        postId: this.postId()
      })).then(() => {
        this.postText = ''; // Очищаем текст после создания комментария
        this.created.emit();
      });
      return;
    } else
      // иначе создается сам пост
      firstValueFrom(this.postService.createPost({
        title: 'Клевый пост',
        content: this.postText,
        authorId: this.me()!.id,
      })).then(() => {
        this.postText = '';
      })
  }

}
