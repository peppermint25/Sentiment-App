import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum AlertContext {
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
}

interface Alert {
  id: number;
  message: string;
  context: AlertContext;
  timeoutId?: number | any; // Timeout ID for individual alert
}

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alerts: Alert[] = [];
  private alertSubject = new BehaviorSubject<Alert[]>([]);
  alerts$ = this.alertSubject.asObservable();

  addAlert(message: string, context: AlertContext, duration: number = 5000) {
    const existingAlert = this.alerts.find(alert => alert.message === message);

    if (existingAlert) {
      existingAlert.context = context;
      clearTimeout(existingAlert.timeoutId);
      existingAlert.timeoutId = setTimeout(() => this.removeAlert(existingAlert.id), duration);
    } else {
      const id = new Date().getTime(); // Unique ID for each alert

      const newAlert: Alert = {
        id,
        message,
        context,
      };

      // Update the alerts array and notify subscribers
      this.alerts.push(newAlert);
      this.alertSubject.next([...this.alerts]);

      // Set a timeout to remove the alert after the specified duration
      newAlert.timeoutId = setTimeout(() => this.removeAlert(id), duration);
    }
  }

  private removeAlert(id: number) {
    // Remove the alert with the specified ID
    this.alerts = this.alerts.filter((alert) => alert.id !== id);
    this.alertSubject.next([...this.alerts]);
  }

  clearAlerts() {
    // Clear all alerts and cancel associated timeouts
    this.alerts.forEach((alert) => {
      if (alert.timeoutId && typeof alert.timeoutId === 'number') {
        clearTimeout(alert.timeoutId as number);
      }
    });

    this.alerts = [];
    this.alertSubject.next([]);
  }
}