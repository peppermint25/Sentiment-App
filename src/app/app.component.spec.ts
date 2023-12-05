import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, NavigationStart } from '@angular/router';
import { AppComponent } from './app.component';
import { Subject } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AlertComponent } from './alert/alert.component';


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  let events: Subject<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, AlertComponent],
      imports: [RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    const originalEvents = router.events; // store the original events property
    events = new Subject(); // initialize events
    const customEvents = events.asObservable(); // create a new property with the events subject

    

    });

    it('should hide header on login page', () => {
      const navigationStartEvent = new NavigationStart(1, '/login');
      events.next(navigationStartEvent); // call next on the Subject

      expect(component.showHeader).toBeFalse();
    });

});
