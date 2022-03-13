import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  constructor() { }

  makeStationPopup(data: any): string {
    return `` +
      `<div>Name: ${ data.name }</div>` +
      `<div>Id: ${ data.id }</div>` +
      `<div>Latitude: ${ data.latitude }</div>` +
      `<div>Longitude: ${ data.longitude }</div>` +
      `<div>Retail Price: ${ data.retailPrice }</div>` +
      `<div>Available Vehicles: ${ data.availableVehicles }</div>` +
      `<div>Book ahead: ${ data.bookahead }</div>`
  }
}
