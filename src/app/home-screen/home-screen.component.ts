import { AlertService, AlertContext } from './../services/alert.service';
import { Component} from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';

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
  aiResult: any = null;
  sentimentResults: any = null;

  isLoading: boolean = false;
  url_error: boolean = false;


  postiveSentiments: number = 0;
  neutralSentiments: number = 0;
  negativeSentiments: number = 0;
  totalSentiments: number = 0;

  constructor(private http: HttpClient, private alertService: AlertService ,private apiService: ApiService, private route: ActivatedRoute) {
    this.route.params.subscribe((params) => 
    {
      const itemID = params['id'];
      if (itemID){
        this.apiService.getOneHistory(itemID).subscribe(
          (response) => {
            this.isLoading = false;
            this.aiResult = response;
            this.articleSubject = this.aiResult.subject;

            if (this.aiResult.article) {
              try {
                new URL(this.aiResult.article);
                this.selectInputType('url');
                this.articleUrl = this.aiResult.article;
              } catch (error) {
                this.selectInputType('text');
                this.articleText = this.aiResult.article;
              }
            }
          }
        );
      }
    });
  }

  selectInputType(inputType: string) {
    this.selectedInputType = inputType;
  }

  analyzeUrl() {
    this.url_error = false;
    if (!this.articleSubject) {
      this.alertService.addAlert('Please enter a subject', AlertContext.Error);
      return;
    }
    if (!this.articleUrl) {
      this.alertService.addAlert('Please enter a URL', AlertContext.Error);
      return;
    }
    try {
      new URL(this.articleUrl);
    } catch (error) {
      this.alertService.addAlert('Invalid URL format. URL has to be in format https://www.google.com', AlertContext.Error);
      return;
    }

    this.aiResult = null;
    this.isLoading = true;
    if (this.selectedInputType === 'url' && this.articleUrl && this.articleSubject) {
      const requestData = {
        article_url: this.articleUrl,
        article_subject: this.articleSubject
      };
      this.apiService.analyzeArticleByUrl(requestData).subscribe(
        (response: any) => {
          this.isLoading = false;
          if(response.message || response.msg){
            this.alertService.addAlert(response.message || response.msg, AlertContext.Error);
            this.url_error = true;
            return
          }
          this.aiResult= response;
        }
      );
    }
  }

  analyzeText(){
    if (!this.articleSubject) {
      this.alertService.addAlert('Please enter a subject', AlertContext.Error);
      return;
    }
    if (!this.articleText) {
      this.alertService.addAlert('Please enter text', AlertContext.Error);
      return;
    }
    this.isLoading = true;
    this.aiResult = null;
    if (this.selectedInputType === 'text' && this.articleText && this.articleSubject) {
      const requestData = {
        article_text: this.articleText,
        article_subject: this.articleSubject
      };
      this.apiService.analyzeArticleByCopy(requestData).subscribe(
        (response: any) => {
          
          this.isLoading = false;
          if(response.message){
            this.alertService.addAlert(response.message, AlertContext.Error);
          }
          this.aiResult = response;

        }
      );
    }
  }

  sentimentBarSegments(sentimentType: string): string {
    if (!this.aiResult || !this.aiResult.sentiment) {
      return '0%'; // Default to 0% width if there's no data
    }
  
    // Calculate the count of the specified sentiment type
    const sentimentCount = this.aiResult.sentiment.filter(
      (sentiment: { sentiment: string }) => sentiment.sentiment === sentimentType
    ).length;
  
    // Calculate the total count of all sentiments
    const totalSentiments = this.aiResult.sentiment.length;
  
    // Calculate the width as a percentage of the total width
    const widthPercentage = (sentimentCount / totalSentiments) * 100;
  
    return `${widthPercentage}%`;
  }
  
  
}
