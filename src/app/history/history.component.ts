import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { AlertService, AlertContext } from '../services/alert.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {
  history: any[] = [];
  searchQuery: string = '';
  faMagnifyingGlass = faMagnifyingGlass;

  constructor(private apiService: ApiService, private alertService: AlertService) {
    this.fetchHistory();
  }

  fetchHistory() {
    this.apiService.getHistory().subscribe(
      (data: any) => {
        this.history = data;
      }
    );
  }


  calculateWidth(sentimentType: string, item: any): string {
    if (!item || !item.sentiment) {
      return '0%'; // Return 0% width if there's no data.
    }

  
    // Filter sentiments based on sentiment type
    const sentimentsOfType = item.sentiment.filter(
      (sentiment: { sentiment: string }) => sentiment.sentiment === sentimentType
    );

    if (sentimentsOfType.length === 0) {
      return '0%'; // Return 0% width if there are no sentiments of the specified type.
    }
  
    const totalSentiments = item.sentiment.length;
    const widthPercentage = (sentimentsOfType.length / totalSentiments) * 100;
    return `${widthPercentage}%`;
  }

  deleteOne(item: any) {
    this.apiService.deleteOneHistory(item).subscribe((data: any) => {
      this.history = data;
      this.apiService.getHistory().subscribe((data: any) => {
        this.history = data;
        this.alertService.addAlert('Item deleted successfully.', AlertContext.Info);
      });
    });
  }

  deleteAll(){
    this.apiService.deleteAllHistory().subscribe((data: any) => {
      this.history = data;
      this.apiService.getHistory().subscribe((data: any) => {
        this.history = data;
        this.alertService.addAlert('All items deleted successfully', AlertContext.Info);
      });
    });
  }
  
  search() {
    if (this.searchQuery.trim() === '') {
      this.fetchHistory(); // If the search input is empty, get the default history
    } else {
      this.apiService.searchHistory(this.searchQuery).subscribe((data: any) => {
        this.history = data;
      });
    }
  }
    
    
}
