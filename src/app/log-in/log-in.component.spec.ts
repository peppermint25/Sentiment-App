import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { of } from 'rxjs';

import { LogInComponent } from './log-in.component';
import { AuthService } from '../services/auth.service';
import { AlertService, AlertContext } from '../services/alert.service';

describe('LogInComponent', () => {
  let component: LogInComponent;
  let fixture: ComponentFixture<LogInComponent>;
  let authService: AuthService;
  let alertService: AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogInComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [AuthService, AlertService]
    });
    fixture = TestBed.createComponent(LogInComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    alertService = TestBed.inject(AlertService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display an alert if any field is empty', () => {
    component.email = '';
    component.password = '';

    const alertSpy = spyOn(component['alertService'], 'addAlert');

    component.logIn();

    expect(alertSpy).toHaveBeenCalledWith('Please fill out all fields.', AlertContext.Warning);
    expect(component.emailError).toBe(true);
    expect(component.passwordError).toBe(true);
  });

  it('should display an alert if email is invalid', () => {
    component.email = 'invalid email';
    component.password = 'password';

    const spy = spyOn(component['alertService'], 'addAlert');


    component.logIn();

    expect(spy).toHaveBeenCalledWith('Please enter a valid email address.', AlertContext.Warning);
    expect(component.emailError).toBe(true);
  });

  it('should display an alert if login is successful', () => {
    component.email = 'test@example.com';
    component.password = 'Password1!';
    const user = {
      email: 'test@example.com',
      password: 'Password1!'
    };
    const authServiceSpy = spyOn(component['authService'], 'login').and.returnValue(of({ message: 'Logged in successfully.' }));
    const alertSpy = spyOn(component['alertService'], 'addAlert');
    const navigateSpy = spyOn(component['router'], 'navigate').and.callThrough();


    component.logIn();

    expect(alertSpy).toHaveBeenCalledWith('Logged in successfully.', AlertContext.Success);
    expect(navigateSpy).toHaveBeenCalledWith(['/search']);
    expect(sessionStorage.getItem('token')).toBe('test-token');
  });

  it('should display an alert if login fails', () => {
    component.email = 'test@example.com';
    component.password = 'Password1!';
    const user = {
      email: 'test@example.com',
      password: 'Password1!'
    };
    const authServiceSpy = spyOn(component['authService'], 'login').and.returnValue(of({ message: 'Invalid credentials.' }));
    const alertSpy = spyOn(component['alertService'], 'addAlert');

    component.logIn();

    expect(alertSpy).toHaveBeenCalledWith('Invalid credentials.', AlertContext.Warning);
    expect(component.emailError).toBe(true);
    expect(component.passwordError).toBe(true);
  });
});