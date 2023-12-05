import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to analyzeArticleByUrl', () => {
    const requestData = { article_url: 'https://example.com', article_subject: 'example' };
    service.analyzeArticleByUrl(requestData).subscribe();
    const req = httpMock.expectOne(`${service['backend_url']}/api/scrape-url`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(requestData);
  });

  it('should send a GET request to getHistory', () => {
    service.getHistory().subscribe();
    const req = httpMock.expectOne(`${service['backend_url']}/api/history`);
    expect(req.request.method).toBe('GET');
  });

  it('should send a GET request to getOneHistory', () => {
    const id = '123';
    service.getOneHistory(id).subscribe();
    const req1 = httpMock.expectOne(`${service['backend_url']}/api/history/${id}`);
    expect(req1.request.method).toBe('GET');
  });

  it('should send a DELETE request to deleteOneHistory', () => {
    const id = '123';
    service.deleteOneHistory(id).subscribe();
    const req2 = httpMock.expectOne(`${service['backend_url']}/api/history/${id}`);
    expect(req2.request.method).toBe('DELETE');
  });

  it('should send a GET request to searchHistory', () => {
    const id = '123';
    service.searchHistory(id).subscribe();
    const req = httpMock.expectOne(`${service['backend_url']}/api/history/search/${id}`);
    expect(req.request.method).toBe('GET');
  });

  it('should send a DELETE request to deleteAccount', () => {
    service.deleteAccount().subscribe();
    const req = httpMock.expectOne(`${service['backend_url']}/api/auth/delete`);
    expect(req.request.method).toBe('DELETE');
  });

  it('should send a POST request to changePassword', () => {
    const data = { old_password: 'oldpass', new_password: 'newpass' };
    service.changePassword(data).subscribe();
    const req = httpMock.expectOne(`${service['backend_url']}/api/auth/change-password`);
    expect(req.request.method).toBe('POST');
  });
});