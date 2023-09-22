import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private backend_url = 'http://localhost:5000';

  constructor(private http: HttpClient) {}
  
  analyzeArticleByUrl(requestData: { article_url: string; article_subject: string }) {
    return this.http.post(`${this.backend_url}/api/scrape-url`, requestData);
  }
  

  analyzeArticleByCopy(requestData: { article_text: string; article_subject: string }){
    return this.http.post(`${this.backend_url}/api/scrape-text`,  requestData );
  }
}
