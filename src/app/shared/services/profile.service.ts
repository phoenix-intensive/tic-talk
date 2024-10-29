import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ProfileType} from '../../../../types/profile-type';
import {map, Observable, tap} from 'rxjs';
import {SubscribersType} from '../../../../types/subscribers-type';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private http = inject(HttpClient);

  me = signal<ProfileType | null>(null);
  searchedFilter = signal<ProfileType[]>([]);


  getTestAccounts(): Observable<ProfileType[]> {
    return this.http.get<ProfileType[]>(environment.api + 'account/test_accounts')
  }

  getUser(): Observable<ProfileType> {
    return this.http.get<ProfileType>(environment.api + 'account/me')
      .pipe(
        tap((res: ProfileType): void => {
          this.me.set(res);
        })
      )
  }

  getAccount(id: string): Observable<ProfileType> {
    return this.http.get<ProfileType>(environment.api + `account/${id}`)
  }

  getSubscribersList(subsAmount: number = 3): Observable<SubscribersType> {
    return this.http.get<SubscribersType>(environment.api + 'account/subscribers/')
      .pipe(
        map((res: SubscribersType) => {
          return {
            ...res,
            items: res.items.slice(0, subsAmount) || []
          };
        })
      );
  }


  updateProfile(profile: Partial<ProfileType>): Observable<ProfileType> {
    return this.http.patch<ProfileType>(environment.api + 'account/me', profile)
  }


  uploadAvatar(file: File): Observable<ProfileType> {
    const fd = new FormData()
    fd.append('image', file, `${Date.now()}_${file.name}`);
    return this.http.post<ProfileType>(environment.api + 'account/upload_image', fd)
  }

  searchFilter(params: Record<string, any>): Observable<SubscribersType> {
    return this.http.get<SubscribersType>(environment.api + 'account/accounts', {params})
      .pipe(
        tap(res => this.searchedFilter.set(res.items))
      )
  }

}

