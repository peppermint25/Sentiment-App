import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HomeScreenComponent } from './home-screen.component';
import { AlertService, AlertContext } from '../services/alert.service';
import { ApiService } from '../services/api.service';

describe('HomeScreenComponent', () => {
  let component: HomeScreenComponent;
  let fixture: ComponentFixture<HomeScreenComponent>;
  let alertService: AlertService;
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeScreenComponent],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [
        AlertService,
        ApiService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '123' })
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeScreenComponent);
    component = fixture.componentInstance;
    alertService = TestBed.inject(AlertService);
    apiService = TestBed.inject(ApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should analyze URL', () => {
    spyOn(alertService, 'addAlert');
    spyOn(apiService, 'analyzeArticleByUrl').and.returnValue(of({}));

    component.articleSubject = 'Test Subject';
    component.articleUrl = 'https://www.example.com';

    component.analyzeUrl();
    
    expect(component.isLoading).toBe(true);
    expect(alertService.addAlert).not.toHaveBeenCalled();
    expect(apiService.analyzeArticleByUrl).toHaveBeenCalledWith({
      article_url: 'https://www.example.com',
      article_subject: 'Test Subject'
    });
  });

  it('should handle error when analyzing invalid URL', () => {
    spyOn(alertService, 'addAlert');
    spyOn(apiService, 'analyzeArticleByUrl');

    component.articleSubject = 'Test Subject';
    component.articleUrl = 'invalid-url';

    component.analyzeUrl();

    expect(alertService.addAlert).toHaveBeenCalledWith('Invalid URL format. URL has to be in format https://www.google.com', AlertContext.Error);
    expect(apiService.analyzeArticleByUrl).not.toHaveBeenCalled();
    expect(component.isLoading).toBe(false);
  });

  it('should analyze text', () => {
    spyOn(alertService, 'addAlert');
    spyOn(apiService, 'analyzeArticleByCopy').and.returnValue(of({}));

    component.articleSubject = 'Test Subject';
    component.articleText = 'Sample text';

    component.analyzeText();

    expect(alertService.addAlert).not.toHaveBeenCalled();
    expect(apiService.analyzeArticleByCopy).toHaveBeenCalledWith({
      article_text: 'Sample text',
      article_subject: 'Test Subject'
    });
    expect(component.isLoading).toBe(true);
  });

  it('should handle error when analyzing text without subject', () => {
    spyOn(alertService, 'addAlert');
    spyOn(apiService, 'analyzeArticleByCopy');

    component.articleSubject = '';
    component.articleText = 'Sample text';

    component.analyzeText();

    expect(alertService.addAlert).toHaveBeenCalledWith('Please enter a subject', AlertContext.Error);
    expect(apiService.analyzeArticleByCopy).not.toHaveBeenCalled();
    expect(component.isLoading).toBe(false);
  });

  it('should handle error when analyzing empty text', () => {
    spyOn(alertService, 'addAlert');
    spyOn(apiService, 'analyzeArticleByCopy');

    component.articleSubject = 'Test Subject';
    component.articleText = '';

    component.analyzeText();

    expect(alertService.addAlert).toHaveBeenCalledWith('Please enter text', AlertContext.Error);
    expect(apiService.analyzeArticleByCopy).not.toHaveBeenCalled();
    expect(component.isLoading).toBe(false);
  });

  it('should calculate sentiment bar segments', () => {
    component.aiResult = {
      sentiment: [
        { sentiment: 'positive' },
        { sentiment: 'neutral' },
        { sentiment: 'positive' },
        { sentiment: 'negative' },
        { sentiment: 'positive' }
      ]
    };

    expect(component.sentimentBarSegments('positive')).toBe('60%');
    expect(component.sentimentBarSegments('neutral')).toBe('20%');
    expect(component.sentimentBarSegments('negative')).toBe('20%');
  });
});