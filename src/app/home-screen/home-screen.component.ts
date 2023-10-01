import { Component, ElementRef, ViewChild } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss']
})
export class HomeScreenComponent {

  faMagnifyingGlass = faMagnifyingGlass;
  selectedInputType: string = 'url';
  textarea= document.getElementById('textInput');

  articleSubject: string = '';
  articleUrl: string = '';
  articleText: string = '';
  scrapedData: any = null;
  showResults = false;
  responseMessage: any = null;
  aiResult: any = null;
  sentimentResults: any = null;

  isLoading: boolean = false;

  constructor(private http: HttpClient, private apiService: ApiService) { }

  selectInputType(inputType: string) {
    this.selectedInputType = inputType;
  }

  analyzeUrl() {
    this.isLoading = true;
    if (this.selectedInputType === 'url' && this.articleUrl && this.articleSubject) {
      const requestData = {
        article_url: this.articleUrl,
        article_subject: this.articleSubject
      };
      this.apiService.analyzeArticleByUrl(requestData).subscribe(
        (response) => {
          this.isLoading = false;
          this.aiResult = response;
          console.log(this.aiResult);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  analyzeText(){
    this.isLoading = true;
    if (this.selectedInputType === 'text' && this.articleText && this.articleSubject) {
      const requestData = {
        article_text: this.articleText,
        article_subject: this.articleSubject
      };
      this.apiService.analyzeArticleByCopy(requestData).subscribe(
        (response) => {
          this.isLoading = false;
          this.aiResult = response;
          console.log(this.aiResult);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}
