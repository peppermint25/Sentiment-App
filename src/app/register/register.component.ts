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

  constructor(public authService: AuthService, public router: Router, public alertService: AlertService) { }

  register() {
    if (this.email.length === 0 || this.password.length === 0 || this.confirmPassword.length === 0) {
      this.alertService.addAlert('Please fill out all fields', AlertContext.Warning);
      return;
    }

    

    if (this.password !== this.confirmPassword) {
      this.alertService.addAlert('Passwords do not match', AlertContext.Warning);
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
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(this.password)) {
      const errors = [];
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
      return;
    }

    const user = {
      email: this.email,
      password: this.password
    };

    this.authService.register(user).subscribe(
      (response) => {
        console.log(response);
        if (response.message) {
          if (response.message === 'User created successfully.') {
            this.alertService.addAlert('Account created successfully.', AlertContext.Success);
            this.router.navigate(['/login']);
          }
          this.errorMessage = response.message;
          console.log(this.errorMessage);
          if (this.errorMessage === 'An account with this email already exists.') {
            this.emailError = true;
            this.alertService.addAlert('An account with this email already exists.', AlertContext.Error);
          }
        }
      }
    );
  }

}
