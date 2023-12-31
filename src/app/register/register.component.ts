import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router} from '@angular/router';
import { AlertService, AlertContext } from '../services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  emailError: boolean = false;
  passwordError: boolean = false;
  confirmPasswordError: boolean = false;

  constructor(public authService: AuthService, public router: Router, public alertService: AlertService) { }

  register() {
    if (this.email.length === 0 || this.password.length === 0 || this.confirmPassword.length === 0) {
      this.alertService.addAlert('Please fill out all fields', AlertContext.Warning);
      if (this.email.length === 0) {
        this.emailError = true;
      }
      if (this.password.length === 0) {
        this.passwordError = true;
      }
      if (this.confirmPassword.length === 0) {
        this.confirmPasswordError = true;
      }

      setTimeout(() => {
        this.emailError = false;
        this.passwordError = false;
        this.confirmPasswordError = false;
      }, 5000);

      return;
    }

    

    if (this.password !== this.confirmPassword) {
      this.alertService.addAlert('Passwords do not match', AlertContext.Warning);
      this.passwordError = true;
      this.confirmPasswordError = true;
      setTimeout(() => {
        this.passwordError = false;
        this.confirmPasswordError = false;
      }, 5000);
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(this.email)) {
      this.alertService.addAlert('Please enter a valid email address', AlertContext.Warning);
      this.emailError = true;

      setTimeout(() => {
        this.emailError = false;
      }, 5000);
      
      return;
    }
    
    // Password difficulty requirements
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*|/]).{8,}$/;
    if (!passwordRegex.test(this.password)) {
      this.passwordError = true;



      // Password requirements
      if (this.password.length < 8) {
        this.alertService.addAlert('Password must be at least 8 characters long', AlertContext.Warning);

      }
      if (!/[a-z]/.test(this.password)) {
        this.alertService.addAlert('Password must contain at least one lowercase letter', AlertContext.Warning);
      }
      if (!/[A-Z]/.test(this.password)) {
        this.alertService.addAlert('Password must contain at least one uppercase letter', AlertContext.Warning);
      }
      if (!/\d/.test(this.password)) {
        this.alertService.addAlert('Password must contain at least one number', AlertContext.Warning);
      }
      if (!/[@$!%*?&)(/|]/.test(this.password)) {
        this.alertService.addAlert('Password must contain at least one special character', AlertContext.Warning);
      };
      setTimeout(() => {
        this.passwordError = false;
      }, 5000);
      return;
    }

    const user = {
      email: this.email,
      password: this.password
    };

    this.authService.register(user).subscribe(
      (response) => {
        if (response.message) {
          if (response.message === 'User created successfully.') {
            this.alertService.addAlert('Account created successfully.', AlertContext.Success);
            this.router.navigate(['/login']);
          }
          this.errorMessage = response.message;
          if (this.errorMessage === 'An account with this email already exists.') {
            this.emailError = true;
            this.alertService.addAlert('An account with this email already exists.', AlertContext.Error);

            setTimeout(() => {
              this.emailError = false;
            }, 5000);
          }
        }
      }
    );
  }
}