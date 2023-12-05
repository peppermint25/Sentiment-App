import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to register endpoint', () => {
    const user = {
      email: 'test@example.com',
      password: 'Password1!',
      confirmPassword: 'Password1!'
    };
    const expectedResponse = { message: 'User created successfully.' };

    service.register(user).subscribe(response => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpMock.expectOne('http://localhost:5000/api/auth/register');
    expect(req.request.method).toBe('POST');
    req.flush(expectedResponse);
  });

  it('should send a POST request to login endpoint', () => {
    const user = {
      email: 'test@example.com',
      password: 'Password1!'
    };
    const expectedResponse = { message: 'Login successful.' };

    service.login(user).subscribe(response => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpMock.expectOne('http://localhost:5000/api/auth/login');
    expect(req.request.method).toBe('POST');
    req.flush(expectedResponse);
  });

  it('should send a POST request to logout endpoint', () => {
    const expectedResponse = { message: 'Logout successful.' };

    service.logout().subscribe(response => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpMock.expectOne('http://localhost:5000/api/auth/logout');
    expect(req.request.method).toBe('POST');
    req.flush(expectedResponse);
  });
});