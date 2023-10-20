import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sentiment-app';
  showHeader: boolean = true;


  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (event.url === '/login' || event.url === '/register' || event.url === '/') {
          this.showHeader = false;
        } else {
          this.showHeader = true;
        }
      }
    });
  }
}
