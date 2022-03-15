import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  constructor() { }

  makeStationPopup(data: any, currentlyAvailable: number, timestamp: number): string {
    var time: Date = new Date(timestamp);
    var date = time.getDate() + '/' + time.getMonth() + ' ' + time.getHours() + ':' + time.getMinutes();

    return `` +
      `<div>Zuletzt Aktulisiert: ${ date }</div>` +
      `<div>Name: ${ data.name }</div>` +
      `<div>Id: ${ data.id }</div>` +
      `<div>Latitude: ${ data.latitude }</div>` +
      `<div>Longitude: ${ data.longitude }</div>` +
      `<div>Retail Price: ${ data.retailPrice }</div>` +
      `<div>Vehicles: ${ data.availableVehicles }</div>` +
      `<div>Available Vehicles: ${ currentlyAvailable }</div>` +
      `<div>Book ahead: ${ data.bookahead }</div>`
  }
}
