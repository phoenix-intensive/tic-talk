import {Component, inject, OnInit} from '@angular/core';
import {SubscriberCardComponent} from '../subscriber-card/subscriber-card.component';
import {ProfileService} from '../../../services/profile.service';
import {AsyncPipe, JsonPipe, NgForOf, NgIf} from '@angular/common';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {firstValueFrom} from 'rxjs';
import {ImgUrlPipe} from '../../../pipes/img-url.pipe';


@Component({
  selector: 'side-bar',
  standalone: true,
  imports: [
    RouterLink,
    SubscriberCardComponent,
    AsyncPipe,
    NgForOf,
    JsonPipe,
    NgIf,
    ImgUrlPipe,
    RouterLinkActive
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent implements OnInit {

  private profileService = inject(ProfileService);

  subscribers$ =  this.profileService.getSubscribersList()
  me = this.profileService.me;

  ngOnInit() {
    firstValueFrom(this.profileService.getUser());
  }

}
