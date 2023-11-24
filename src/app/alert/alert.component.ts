import { Component, OnInit } from '@angular/core';
import { AlertService, AlertContext } from '../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  alerts: { message: string; context: AlertContext }[] = [];

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.alertService.alerts$.subscribe((alerts) => {
      this.alerts = alerts;
      setTimeout(() => {
        this.clearAlerts();
      }, 15000);
    });
  }

  closeAlert(index: number) {
    this.alerts.splice(index, 1);
  }

  clearAlerts() {
    this.alertService.clearAlerts();
  }

  getAlertClasses(alert: { message: string; context: AlertContext }): string {
    switch (alert.context) {
      case AlertContext.Success:
        return 'success';
      case AlertContext.Error:
        return 'error';
      case AlertContext.Warning:
        return 'warning';
      case AlertContext.Info:
        return 'info';
      default:
        return '';
    }
  }
}
