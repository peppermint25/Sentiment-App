// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { HistoryComponent } from './history.component';
// import { ApiService } from '../services/api.service';
// import { AlertService, AlertContext } from '../services/alert.service';
// import { of } from 'rxjs';

// describe('HistoryComponent', () => {
//   let component: HistoryComponent;
//   let fixture: ComponentFixture<HistoryComponent>;
//   let apiService: ApiService;
//   let alertService: AlertService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [HistoryComponent],
//       providers: [ApiService, AlertService]
//     });
//     fixture = TestBed.createComponent(HistoryComponent);
//     component = fixture.componentInstance;
//     apiService = TestBed.inject(ApiService);
//     alertService = TestBed.inject(AlertService);
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should fetch history on component initialization', () => {
//     const historyData = [{ sentiment: 'positive' }, { sentiment: 'negative' }];
//     spyOn(apiService, 'getHistory').and.returnValue(of(historyData));

//     component.ngOnInit();

//     expect(component.history).toEqual(historyData);
//     expect(apiService.getHistory).toHaveBeenCalled();
//   });

//   it('should calculate width correctly', () => {
//     const item = {
//       sentiment: [
//         { sentiment: 'positive' },
//         { sentiment: 'positive' },
//         { sentiment: 'negative' }
//       ]
//     };

//     const widthPercentage = component.calculateWidth('positive', item);

//     expect(widthPercentage).toBe('66.66666666666666%');
//   });

//   it('should delete one item', () => {
//     const item = { id: 1 };
//     const historyData = [{ id: 2 }, { id: 3 }];
//     spyOn(apiService, 'deleteOneHistory').and.returnValue(of(historyData));
//     spyOn(apiService, 'getHistory').and.returnValue(of(historyData));
//     spyOn(alertService, 'addAlert');

//     component.deleteOne(item);

//     expect(component.history).toEqual(historyData);
//     expect(apiService.deleteOneHistory).toHaveBeenCalledWith(item);
//     expect(apiService.getHistory).toHaveBeenCalled();
//     expect(apiService.getHistory).toHaveBeenCalled();
//     expect(alertService.addAlert).toHaveBeenCalledWith('Item deleted successfully.', AlertContext.Info);
//   });

//   it('should delete all items', () => {
//     const historyData: any[] = []; // Specify the type of historyData

//     spyOn(apiService, 'deleteAllHistory').and.returnValue(of(historyData));
//     spyOn(apiService, 'deleteAllHistory').and.returnValue(of(historyData));
//     spyOn(apiService, 'getHistory').and.returnValue(of(historyData));
//     spyOn(alertService, 'addAlert');

//     component.deleteAll();

//     expect(component.history).toEqual(historyData);
//     expect(apiService.deleteAllHistory).toHaveBeenCalled();
//     expect(apiService.getHistory).toHaveBeenCalled();
//     expect(component.showModal).toBe(false);
//     expect(alertService.addAlert).toHaveBeenCalledWith('All items deleted successfully', AlertContext.Info);
//   });

//   it('should fetch default history when search query is empty', () => {
//     const historyData = [{ sentiment: 'positive' }, { sentiment: 'negative' }];
//     spyOn(apiService, 'getHistory').and.returnValue(of(historyData));

//     component.searchQuery = '';
//     component.search();

//     expect(component.history).toEqual(historyData);
//     expect(apiService.getHistory).toHaveBeenCalled();
//   });

//   it('should search history when search query is not empty', () => {
//     const searchQuery = 'positive';
//     const searchData = [{ sentiment: 'positive' }];
//     spyOn(apiService, 'searchHistory').and.returnValue(of(searchData));

//     component.searchQuery = searchQuery;
//     component.search();

//     expect(component.history).toEqual(searchData);
//     expect(apiService.searchHistory).toHaveBeenCalledWith(searchQuery);
//   });
// });