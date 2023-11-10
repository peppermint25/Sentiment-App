import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryComponent } from './history/history.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { RegisterComponent } from './register/register.component';
import { LogInComponent } from './log-in/log-in.component';
import { UserComponent } from './user/user.component';

import { authGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: 'history', component: HistoryComponent, canActivate: [authGuard] },
  { path: 'search', component: HomeScreenComponent, canActivate: [authGuard] },
  { path: 'item/:id', component: HomeScreenComponent, canActivate: [authGuard] },
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LogInComponent},
  { path: 'user', component: UserComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
