import {Component, input} from '@angular/core';
import {ProfileType} from '../../../../../../types/profile-type';
import {ImgUrlPipe} from '../../../../shared/pipes/img-url.pipe';

@Component({
  selector: 'chat-workspace-header',
  standalone: true,
  imports: [
    ImgUrlPipe
  ],
  templateUrl: './chat-workspace-header.component.html',
  styleUrl: './chat-workspace-header.component.scss'
})
export class ChatWorkspaceHeaderComponent {

  profile = input.required<ProfileType>()
}
