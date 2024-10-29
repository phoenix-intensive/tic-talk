import {Component, inject, OnInit} from '@angular/core';
import {ChatsBtnComponent} from '../chats-btn/chats-btn.component';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {ChatsService} from '../../../shared/services/chats.service';
import {map,  startWith, switchMap} from 'rxjs';
import {AsyncPipe, CommonModule, NgForOf} from '@angular/common';

@Component({
  selector: 'chats-list',
  standalone: true,
  imports: [
    CommonModule,
    ChatsBtnComponent,
    ReactiveFormsModule,
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './chats-list.component.html',
  styleUrls: ['./chats-list.component.scss'] // Исправлено на styleUrls
})

export class ChatsListComponent implements OnInit {

  private chatsService = inject(ChatsService);

  filterChartsControl = new FormControl('');


  //Поиск чатов по имени и фамилии filterChartsControl.valueChanges
  chats$ = this.chatsService.getMyChats().pipe(
    switchMap((chats) => {
      return this.filterChartsControl.valueChanges
        .pipe(
          startWith(''),
          map(inputValue =>
            chats.filter(chat =>
              `${chat.userFrom.firstName} ${chat.userFrom.lastName}`.toLowerCase().includes((inputValue ?? '').toLowerCase())))
        );
    })
  );


  ngOnInit() {
    this.chats$.subscribe(chats => {
    });
  }
}
