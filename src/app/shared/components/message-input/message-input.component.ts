import {Component, EventEmitter, inject, Output, Renderer2} from '@angular/core';
import {ImgUrlPipe} from '../../pipes/img-url.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProfileService} from '../../services/profile.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'message-input',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ImgUrlPipe,
    ReactiveFormsModule
  ],
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.scss'
})
export class MessageInputComponent {

  private profileService = inject(ProfileService);
  me = this.profileService.me;

  r2 = inject(Renderer2);
  postText: string = '';

  @Output() created = new EventEmitter<string>();


  onTextAreaInput(event: Event) {
    const textArea = event.target as HTMLTextAreaElement

    this.r2.setStyle(textArea, 'height', 'auto');
    this.r2.setStyle(textArea, 'height', textArea.scrollHeight + 'px');
  }

  onCreateMessage() {
    if (!this.postText) return
    this.created.emit(this.postText);
    this.postText = '';
  }

}
