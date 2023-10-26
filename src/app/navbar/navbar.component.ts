import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  public isLightTheme: boolean = true;
  faUser = faUser;

  constructor(private AuthService: AuthService, private router: Router) { }

  toggleTheme(theme: 'light' | 'dark') {
    this.isLightTheme = theme === 'light';
    document.body.setAttribute('data-theme', this.isLightTheme ? 'light' : 'dark');
  }
  

  logout() {
    this.AuthService.logout().subscribe(
      (response) => {
        console.log(response);
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error(error);
      }
    );
  }


}
