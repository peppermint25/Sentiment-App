import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLightTheme: boolean = true;
  faUser = faUser;

  constructor(private AuthService: AuthService, private router: Router) { }

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

  toggleTheme(theme: 'light' | 'dark') {
    this.isLightTheme = theme === 'light';

    // Store the theme preference in localStorage
    localStorage.setItem('theme', this.isLightTheme ? 'light' : 'dark');

    // Apply the theme to the body
    document.body.setAttribute('data-theme', this.isLightTheme ? 'light' : 'dark');
  }
  
  logout() {
    this.AuthService.logout().subscribe(
      (response) => {
        this.router.navigate(['/login']);
        sessionStorage.removeItem('token');
      },
      (error) => {
        console.error(error);
      }
    );
  }


}
