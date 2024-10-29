import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {CommentCreate, PostResponse, PostType, Comment} from '../../../../types/post.type';
import {map, Observable, switchMap, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private http = inject(HttpClient);

  posts = signal<PostResponse[]>([])

  createPost(payload: PostType): Observable<PostResponse[]> {
    return this.http.post<PostResponse>(environment.api + 'post/', payload)
      .pipe(
        switchMap(() => {
          return this.fetchPost();
        })
      )
  }


  fetchPost(): Observable<PostResponse[]> {
    return this.http.get<PostResponse[]>(environment.api + 'post/')
      .pipe(
        tap((res: PostResponse[]): void => {
            this.posts.set(res)
          }
        )
      )
  }


  createComment(payload: CommentCreate): Observable<Comment> {
    return this.http.post<Comment>(environment.api + 'comment/', payload)
  }


  getCommentByPostId(postId: number): Observable<Comment[]> {
    return this.http.get<PostResponse>(environment.api + `post/${postId}`)
      .pipe(
        map((res: PostResponse) => res.comments)
      )
  }
}
