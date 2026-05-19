import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private _alerts = signal('This is an alert');
  public alerts = this._alerts.asReadonly();

  public addAlert(alert:string, duration:number) {
    this._alerts.set(alert);
  }
}
