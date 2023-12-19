import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { Router } from '@angular/router';
import { AlertService, AlertContext } from '../services/alert.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLightTheme: boolean = true;
  faUser = faUser;

  constructor(private AuthService: AuthService, public router: Router, private AlertService: AlertService) { }

  ngOnInit(): void {
    const storedTheme = localStorage.getItem('theme');

    if (storedTheme) {
      this.isLightTheme = storedTheme === 'light';
    } else {
      this.isLightTheme = document.body.getAttribute('data-theme') === 'light';
    }

    document.body.setAttribute('data-theme', this.isLightTheme ? 'light' : 'dark');
  }

  logout() {
    this.AuthService.logout().subscribe(
      () => {
        this.AlertService.addAlert('Logged out successfully.', AlertContext.Success);
        this.router.navigate(['/login']);
        sessionStorage.removeItem('token');
      }
    );
  }


}
