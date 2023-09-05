import { Component } from '@angular/core';
import { faUser } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  public isLightTheme: boolean = true;
  faUser = faUser;

  constructor() { }

  toggleTheme() {

    this.isLightTheme = !this.isLightTheme;

    document.body.setAttribute('data-theme', this.isLightTheme ? 'light' : 'dark');
  }


}
