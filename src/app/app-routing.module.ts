import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryComponent } from './history/history.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { RegisterComponent } from './register/register.component';
import { LogInComponent } from './log-in/log-in.component';


const routes: Routes = [
  { path: 'history', component: HistoryComponent },
  { path: '', component: HomeScreenComponent },
  { path: ':id', component: HomeScreenComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'log-in', component: LogInComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
