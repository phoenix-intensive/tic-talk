import {AfterViewInit, Component, ElementRef, HostListener, inject, OnInit, Renderer2} from '@angular/core';
import {ProfileCardComponent} from "../../shared/components/profile-card/profile-card.component";
import {ProfileService} from '../../shared/services/profile.service';
import {ProfileType} from '../../../../types/profile-type';
import {CommonModule} from '@angular/common';
import {SearchFilterComponent} from './search-filter/search-filter.component';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    ProfileCardComponent,
    SearchFilterComponent
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements AfterViewInit {

  private profileService = inject(ProfileService);

  profiles = this.profileService.searchedFilter;

  hostElement = inject(ElementRef);
  r2 = inject(Renderer2);

  @HostListener('window.resize')
  onWindowResize() {
    this.resizeFeed();
  }


  trackById(index: number, profile: ProfileType): number {
    return profile.id;
  }

  ngAfterViewInit() {
    this.resizeFeed();
  }


  resizeFeed() {
    const {top} = this.hostElement.nativeElement.getBoundingClientRect();
    const height = window.innerHeight - top - 24 - 24;

    // Устанавливаем высоту только для .profile-card-wrapper
    const wrapper = this.hostElement.nativeElement.querySelector('.profile-card-wrapper');
    if (wrapper) {
      this.r2.setStyle(wrapper, 'height', `${height}px`);
    }
  }

}
