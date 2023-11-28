import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router} from '@angular/router';
import { AlertService, AlertContext } from '../services/alert.service';

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

  constructor(private authService: AuthService, private router: Router, private alertService: AlertService) {
  }

  logIn() {
    this.errorMessage = '';
    this.emailError = false;
    this.passwordError = false;

    if (this.email === '' || this.password === '') {
      this.emailError = true;
      this.passwordError = true;
      this.alertService.addAlert('Please fill out all fields.', AlertContext.Warning);
      setTimeout(() => {
        this.emailError = false;
        this.passwordError = false;
      }, 15000); 
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(this.email)) {
      this.alertService.addAlert('Please enter a valid email address.', AlertContext.Warning);
      this.emailError = true;
      setTimeout(() => {
        this.emailError = false;
      }, 5000);
      
      return;

    }

    const user = {
      email: this.email,
      password: this.password
    };
    this.authService.login(user).subscribe(
      response => {
        if (response.token) {
          sessionStorage.setItem('token', response.token);
          this.alertService.addAlert('Logged in successfully.', AlertContext.Success);
          this.router.navigate(['/search']);
        }
        if (response.message) {
          this.alertService.addAlert(response.message, AlertContext.Warning);
          this.emailError = true;
          this.passwordError = true;
        }
      }
    );
  }

}
