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
  errorMessage: string = '';
  emailError: boolean = false;
  passwordError: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  logIn() {
    this.errorMessage = '';
    this.emailError = false;
    this.passwordError = false;

    const user = {
      email: this.email,
      password: this.password
    };
    this.authService.login(user).subscribe(
      response => {
        if (response.token) {
          sessionStorage.setItem('token', response.token);
          this.router.navigate(['/search']);
        }
        if(response.message){
          this.errorMessage = response.message;
          console.log(this.errorMessage);
          if (this.errorMessage === 'No account with this email exists.') {
            this.emailError = true;
            console.log(this.emailError);
          }else if(this.errorMessage === 'Incorrect password.') {
            this.passwordError = true;
            console.log(this.passwordError);
          }
        }
      }
    );
  }

}
