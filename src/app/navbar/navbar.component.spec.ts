import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { of } from 'rxjs';
import { NavbarComponent } from './navbar.component';
import { AuthService } from '../services/auth.service';
import { AlertService, AlertContext } from '../services/alert.service';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authService: AuthService;
  let alertService: AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, FontAwesomeModule],
      providers: [AuthService, AlertService]
    });
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    alertService = TestBed.inject(AlertService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should logout successfully', () => {
    const logoutSpy = spyOn(authService, 'logout').and.returnValue(of(null));
    const addAlertSpy = spyOn(alertService, 'addAlert');
    const navigateSpy = spyOn(component.router, 'navigate');
    const removeItemSpy = spyOn(sessionStorage, 'removeItem');

    component.logout();

    expect(logoutSpy).toHaveBeenCalled();
    expect(addAlertSpy).toHaveBeenCalledWith('Logged out successfully.', AlertContext.Success);
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
    expect(removeItemSpy).toHaveBeenCalledWith('token');
  });
});