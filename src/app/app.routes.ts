import {Routes} from '@angular/router';
import {SearchComponent} from './views/search/search.component';
import {LoginComponent} from './views/user/login/login.component';
import {LayoutComponent} from './shared/layout/layout.component';
import {ProfileComponent} from './views/profile/profile.component';
import {AuthGuard} from './core/auth/auth.guard';
import {SettingsComponent} from './views/settings/settings.component';
import {chatsRoutes} from './views/chats/chatRoutes';

export const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      {path: '', redirectTo: 'profile/me', pathMatch: "full"},
      {path: 'profile/:id', component: ProfileComponent},
      {path: 'settings', component: SettingsComponent},
      {path: 'search', component: SearchComponent},
      {
        path: 'chats',
        loadChildren: () => chatsRoutes
      },
    ], canActivate: [AuthGuard]
  },
  {path: 'login', component: LoginComponent},
];
