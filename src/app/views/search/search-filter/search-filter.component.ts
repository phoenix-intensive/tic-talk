import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {AvatarUploadComponent} from '../../../shared/components/avatar-upload/avatar-upload.component';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {ProfileService} from '../../../shared/services/profile.service';
import {debounceTime, startWith, Subscription, switchMap} from 'rxjs';


@Component({
  selector: 'search-filter',
  standalone: true,
  imports: [
    AvatarUploadComponent,
    ReactiveFormsModule
  ],
  templateUrl: './search-filter.component.html',
  styleUrl: './search-filter.component.scss'
})
export class SearchFilterComponent implements OnInit, OnDestroy {

  private fb = inject(FormBuilder);
  private profileService = inject(ProfileService);

  formSearchFilter!: Subscription

  searchForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    stack: ['']
  })

  ngOnInit() {
    this.formSearchFilter = this.searchForm.valueChanges
      .pipe(
        startWith({}),
        debounceTime(300),
        switchMap(formValue => {
          return this.profileService.searchFilter(formValue)
        })
      )
      .subscribe()
  }

  ngOnDestroy() {
    this.formSearchFilter.unsubscribe();
  }

}
