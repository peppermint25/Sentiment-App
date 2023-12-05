import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { ApiService } from '../services/api.service';
import { AlertService, AlertContext } from '../services/alert.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let apiService: ApiService;
  let alertService: AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserComponent],
      providers: [ApiService, AlertService],
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule]
    });
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    alertService = TestBed.inject(AlertService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete account successfully', () => {
    spyOn(apiService, 'deleteAccount').and.returnValue(of({}));
    spyOn(alertService, 'addAlert');
    spyOn(sessionStorage, 'removeItem');
    spyOn(window.location, 'assign'); // Fix: Corrected the method name

    component.deleteAccount();

    expect(apiService.deleteAccount).toHaveBeenCalled();
    expect(alertService.addAlert).toHaveBeenCalledWith('Account deleted successfully.', AlertContext.Success);
    expect(sessionStorage.removeItem).toHaveBeenCalledWith('token');
    expect(window.location.assign).toHaveBeenCalledWith('/login'); // Fix: Corrected the method call
  });

  it('should change password successfully', () => {
    component.oldpassword = 'oldpassword';
    component.newpassword = 'newpassword';
    component.confirmPassword = 'newpassword';

    spyOn(apiService, 'changePassword').and.returnValue(of({}));
    spyOn(alertService, 'addAlert');

    component.changePassword();

    expect(apiService.changePassword).toHaveBeenCalledWith({ old_password: 'oldpassword', new_password: 'newpassword' });
    expect(alertService.addAlert).toHaveBeenCalledWith('Password changed successfully.', AlertContext.Success);
    expect(component.oldpassword).toBe('');
    expect(component.newpassword).toBe('');
    expect(component.confirmPassword).toBe('');
  });

  it('should validate password correctly', () => {
    component.newpassword = 'password';
    component.confirmPassword = 'password';

    spyOn(alertService, 'addAlert');

    const result = component.validatePassword();

    expect(alertService.addAlert).toHaveBeenCalledWith('Password must contain at least one uppercase letter', AlertContext.Warning);
    expect(result).toBe(false);
  });

  it('should toggle theme to light', () => {
    spyOn(localStorage, 'setItem');
    spyOn(document.body, 'setAttribute');

    component.toggleTheme('light');

    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'light');
    expect(document.body.setAttribute).toHaveBeenCalledWith('data-theme', 'light');
    expect(component.isLightTheme).toBe(true);
  });

  it('should toggle theme to dark', () => {
    spyOn(localStorage, 'setItem');
    spyOn(document.body, 'setAttribute');

    component.toggleTheme('dark');

    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
    expect(document.body.setAttribute).toHaveBeenCalledWith('data-theme', 'dark');
    expect(component.isLightTheme).toBe(false);
  });
});