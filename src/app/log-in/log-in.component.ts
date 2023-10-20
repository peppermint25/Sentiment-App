import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthService, private router: Router) {
  }

  logIn() {
    const user = {
      email: this.email,
      password: this.password
    };
    this.authService.login(user).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/']); // navigate to '/' route
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
