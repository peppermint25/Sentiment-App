import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { Router } from '@angular/router';
import { AlertService, AlertContext } from '../services/alert.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  faUser = faUser;

  constructor(private AuthService: AuthService, public router: Router, private AlertService: AlertService) { }

  
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
