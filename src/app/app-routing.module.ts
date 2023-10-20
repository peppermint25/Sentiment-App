import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryComponent } from './history/history.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { RegisterComponent } from './register/register.component';
import { LogInComponent } from './log-in/log-in.component';


const routes: Routes = [
  { path: 'history', component: HistoryComponent },
  { path: 'home', component: HomeScreenComponent },
  { path: 'item/:id', component: HomeScreenComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LogInComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
