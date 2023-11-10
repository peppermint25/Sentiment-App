import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  oldpassword: string = '';
  newpassword: string = '';
  confirmPassword: string = '';


  constructor(private apiService: ApiService) { }

  deleteAccount() {
    this.apiService.deleteAccount().subscribe((data: any) => {
      console.log(data);
      alert('Your account has been deleted!');
      sessionStorage.removeItem('token');
      window.location.href = '/login';
    });
  }

  changePassword(){
    if (this.oldpassword.length === 0 || this.newpassword.length === 0 || this.confirmPassword.length === 0) {
      console.log(this.oldpassword.length, this.newpassword.length, this.confirmPassword.length);

      alert('Please fill in all fields');
      return;
    }

    if (this.newpassword !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const user = {
      old_password: this.oldpassword,
      new_password: this.newpassword
    };

    this.apiService.changePassword(user).subscribe(
      (response) => {
        console.log(response);
        alert('Your password has been changed!');
      },
      (error) => {
        console.error(error);
      }
    );
  }


}
