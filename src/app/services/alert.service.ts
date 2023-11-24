// alert.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum AlertContext {
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
}

interface Alert {
  message: string;
  context: AlertContext;
}

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alertSubject = new BehaviorSubject<Alert[]>([]);
  alerts$ = this.alertSubject.asObservable();

  addAlert(message: string, context: AlertContext) {
    const currentAlerts = this.alertSubject.value;
    this.alertSubject.next([...currentAlerts, { message, context }]);
  }

  clearAlerts() {
    this.alertSubject.next([]);
  }
}
