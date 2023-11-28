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

  constructor(private AuthService: AuthService, private router: Router, private AlertService: AlertService) { }

  ngOnInit(): void {
    // Retrieve the theme preference from localStorage, if it exists
    const storedTheme = localStorage.getItem('theme');

    if (storedTheme) {
      // Use the theme from localStorage
      this.isLightTheme = storedTheme === 'light';
    } else {
      // Fallback to the body attribute if localStorage is empty
      this.isLightTheme = document.body.getAttribute('data-theme') === 'light';
    }

    // Apply the theme to the body
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
