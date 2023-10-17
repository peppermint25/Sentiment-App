import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {
  history: any;

  constructor(private apiService: ApiService) {
    this.apiService.getHistory().subscribe((data: any) => {
      this.history = data;
    });
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
      });
    });
  }
  
    
    
}
