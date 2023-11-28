import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AlertService, AlertContext } from '../services/alert.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  oldpassword: string = '';
  newpassword: string = '';
  confirmPassword: string = '';
  isLightTheme: boolean = true;
  showModal: boolean = false;

  constructor(private apiService: ApiService, private alertService: AlertService) { }

  deleteAccount() {
    this.apiService.deleteAccount().subscribe((data: any) => {
      console.log(data);
      this.showModal = false;
      this.alertService.addAlert('Account deleted successfully.', AlertContext.Success);
      sessionStorage.removeItem('token');
      window.location.href = '/login';
    });
  }

  changePassword() {
    if (!this.validatePassword()) {
      return;
    }

    const user = {
      old_password: this.oldpassword,
      new_password: this.newpassword
    };

    this.apiService.changePassword(user).subscribe(
      (response) => {
        console.log(response);
        this.oldpassword = '';
        this.newpassword = '';
        this.confirmPassword = '';
        this.alertService.addAlert('Password changed successfully.', AlertContext.Success);
      }
    );
  }

  validatePassword(): boolean {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

    if (!passwordRegex.test(this.newpassword)) {
      if (this.newpassword.length < 8) {
        this.alertService.addAlert('Password must be at least 8 characters long', AlertContext.Warning);
        return false;
      }
      if (!/\d/.test(this.newpassword)) {
        this.alertService.addAlert('Password must contain at least one number', AlertContext.Warning);
        return false;
      }
      if (!/[a-z]/.test(this.newpassword)) {
        this.alertService.addAlert('Password must contain at least one lowercase letter', AlertContext.Warning);
        return false;
      }
      if (!/[A-Z]/.test(this.newpassword)) {
        this.alertService.addAlert('Password must contain at least one uppercase letter', AlertContext.Warning);
        return false;
      }
      if (!/[!@#$%^&*()|/]/.test(this.newpassword)) {
        this.alertService.addAlert('Password must contain at least one special symbol (!@#$%^&*()|/)', AlertContext.Warning);
        return false;
      }
    }

    if (this.newpassword !== this.confirmPassword) {
      this.alertService.addAlert('Passwords do not match', AlertContext.Error);
      return false;
    }

    return true;
  }

  toggleTheme(theme: 'light' | 'dark') {
    this.isLightTheme = theme === 'light';

    // Store the theme preference in localStorage
    localStorage.setItem('theme', this.isLightTheme ? 'light' : 'dark');

    // Apply the theme to the body
    document.body.setAttribute('data-theme', this.isLightTheme ? 'light' : 'dark');
  }
}
