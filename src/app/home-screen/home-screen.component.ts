import { Component } from '@angular/core';
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

  articleUrl: string = '';
  articleText: string = '';
  scrapedData: any = null;
  showResults = false;

  constructor(private http: HttpClient, private apiService: ApiService) { }

  scrapeArticle() {
    // if (this.articleUrl) {
    //   this.apiService.scrapeArticle(this.articleUrl).subscribe(
    //     (response) => {
    //       this.scrapedData = response;
    //       this.showResults = true;
    //     },
    //     (error) => {
    //       console.log(error);
    //     }
    //   );
    // }
  }
  

}
