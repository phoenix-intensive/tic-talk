import {AfterViewInit, Component, ElementRef, HostListener, inject, OnInit, Renderer2} from '@angular/core';
import {PostInputComponent} from '../post-input/post-input.component';
import {PostComponent} from '../post/post.component';
import {PostService} from '../../../shared/services/post.service';
import {NgForOf} from '@angular/common';
import {firstValueFrom} from 'rxjs';

@Component({
  selector: 'post-feed',
  standalone: true,
  imports: [
    PostInputComponent,
    PostComponent,
    NgForOf
  ],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss'
})
export class PostFeedComponent implements OnInit, AfterViewInit {


  hostElement = inject(ElementRef);
  r2 = inject(Renderer2);

  private postService = inject(PostService);
  feed = inject(PostService).posts;

  @HostListener('window.resize')
  onWindowResize() {
    this.resizeFeed();
  }


  ngOnInit() {
    firstValueFrom(this.postService.fetchPost());
  }


  ngAfterViewInit() {
    this.resizeFeed();
  }

  resizeFeed() {
    const {top} = this.hostElement.nativeElement.getBoundingClientRect();
    const height = window.innerHeight - top - 24 - 24
    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`)
  }

}
