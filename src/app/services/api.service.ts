import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  headers = new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  });

  requestOptions = {
    headers: this.headers
  }

  private backend_url = 'http://localhost:5000';

  constructor(private http: HttpClient) {}
  
  analyzeArticleByUrl(requestData: { article_url: string; article_subject: string }) {
    return this.http.post(`${this.backend_url}/api/scrape-url`, requestData, this.requestOptions);
  }
  

  analyzeArticleByCopy(requestData: { article_text: string; article_subject: string }){
    return this.http.post(`${this.backend_url}/api/scrape-text`,  requestData, this.requestOptions);
  }

  getHistory() {
    return this.http.get(`${this.backend_url}/api/history`, this.requestOptions);
  }

  getOneHistory(id: string) {
    return this.http.get(`${this.backend_url}/api/history/${id}`, this.requestOptions);
  }

  deleteOneHistory(id: string) {
    return this.http.delete(`${this.backend_url}/api/history/${id}`, this.requestOptions);
  }

  deleteAllHistory(id: string) {
    return this.http.delete(`${this.backend_url}/api/history`, this.requestOptions);
  }
}
