import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

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

  constructor(private authService: AuthService, private router: Router) { }

  register(){

    if (this.email.length === 0 || this.password.length === 0 || this.confirmPassword.length === 0) {
      alert('Please fill in all fields');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const user = {
      email: this.email,
      password: this.password
    };



    this.authService.register(user).subscribe(
      (response) => {
        console.log(response);
        if (response.message){
          if (response.message === 'User created successfully.'){
            alert('You have successfully registered!');
            this.router.navigate(['/login']);
          }
          this.errorMessage = response.message;
          console.log(this.errorMessage);
          if (this.errorMessage === 'An account with this email already exists.') {
            this.emailError = true;
            console.log(this.emailError);
          }
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
