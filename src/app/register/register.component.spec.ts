import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { of } from 'rxjs';
import { AlertContext} from '../services/alert.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [HttpClientModule, FormsModule, RouterTestingModule],
    });
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display an alert if any field is empty', () => {
    component.email = '';
    component.password = '';
    component.confirmPassword = '';

    const spy = spyOn(component.alertService, 'addAlert'); // create a spy for the alert function

    component.register();

    expect(spy).toHaveBeenCalledWith('Please fill out all fields', AlertContext.Warning); // replace 'Email field is empty' with the expected alert message
  });

  it('should display an alert if passwords do not match', () => {
    component.email = 'test@example.com';
    component.password = 'password1';
    component.confirmPassword = 'password2';
  
    const spy = spyOn(component.alertService, 'addAlert'); // create a spy for the addAlert method
  
    component.register();
  
    expect(spy).toHaveBeenCalledWith('Passwords do not match', AlertContext.Warning); // replace 'Passwords do not match' with the expected alert message
  });

  it('should display an alert if email is invalid', () => {
    component.email = 'invalid email';
    component.password = 'password';
    component.confirmPassword = 'password';
  
    const spy = spyOn(component.alertService, 'addAlert'); // create a spy for the addAlert method
  
    component.register();
  
    expect(spy).toHaveBeenCalledWith('Please enter a valid email address', AlertContext.Warning); // replace 'Invalid email' with the expected alert message
  });

  it('should display an alert if password does not meet the requirements', () => {
    component.email = 'test@example.com';
    component.password = 'weakpassword'; // replace 'weakpassword' with a password that doesn't meet the requirements
    component.confirmPassword = 'weakpassword'; // replace 'weakpassword' with a password that doesn't meet the requirements
  
    const spy = spyOn(component.alertService, 'addAlert'); // create a spy for the addAlert method
  
    component.register();
  
    expect(spy).toHaveBeenCalledWith('Password must contain at least one uppercase letter', AlertContext.Warning);
    expect(spy).toHaveBeenCalledWith('Password must contain at least one number', AlertContext.Warning);
    expect(spy).toHaveBeenCalledWith('Password must contain at least one special character', AlertContext.Warning);
  });

  it('should display an alert if registration is successful', () => {
    component.email = 'test@example.com';
    component.password = 'Password1!';
    component.confirmPassword = 'Password1!';
    const user = {
      email: 'test@example.com',
      password: 'Password1!',
      confirmPassword: 'Password1!'
    };
    spyOn(component.authService, 'register').and.returnValue(of({ message: 'User created successfully.' }));
    
    const alertSpy = spyOn(component.alertService, 'addAlert'); // create a spy for the addAlert method
    const navigateSpy = spyOn(component.router, 'navigate'); // create a spy for the navigate method
  
    component.register();
  
    expect(alertSpy).toHaveBeenCalledWith('Account created successfully.', AlertContext.Success);
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });

  it('should display an alert if registration fails due to existing email', () => {
    component.email = 'test@example.com';
    component.password = 'Password1!';
    component.confirmPassword = 'Password1!';
    const user = {
      email: 'test@example.com',
      password: 'Password1!',
      confirmPassword: 'Password1!'
    };
    spyOn(component.authService, 'register').and.returnValue(of({ message: 'An account with this email already exists.' }));
    
    const alertSpy = spyOn(component.alertService, 'addAlert'); // create a spy for the addAlert method
  
    component.register();
  
    expect(alertSpy).toHaveBeenCalledWith('An account with this email already exists.', AlertContext.Error);
  });
});