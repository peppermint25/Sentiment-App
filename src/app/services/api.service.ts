import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private backend_url = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  scrapeArticle(articleUrl: string){

    return this.http.post(`${this.backend_url}/api/scrape-article`, {article_url: articleUrl});
  }
}
