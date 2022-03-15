import { RecordDetail } from './../shared/record-detail';
import { ApiService } from './api.service';
import { PopupService } from './popup.service';
import { StationDetail } from '../shared/station-detail';
import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { HttpErrorResponse } from '@angular/common/http';


const blueIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});


@Injectable({
  providedIn: 'root',
})
export class MarkerService {
  stations!: StationDetail[];
  error!: HttpErrorResponse;


  constructor(
    private as: ApiService,
    private pus: PopupService
  ) { }

  async makeCarsharingMarkers(map: L.map): Promise<void> {
    await this.as.getAllStationDetails()
        .then(cache => this.stations = cache)
        .catch(error => this.error = error);

    if(!this.error){
      for (var i = 0, j = this.stations.length; i < j; i++) {
        const lon = this.stations[i].longitude;
        const lat = this.stations[i].latitude;

        var cacheData!: RecordDetail;

        await this.as.getNewestRecord(this.stations[i].id)
          .then(response => cacheData = response)
          .catch(error => this.error = error);


        var marker: any;
        if (cacheData.value == 0) {
          marker = L.marker([lat, lon], {icon: redIcon});
        } else {
          marker = L.marker([lat, lon], {icon: blueIcon});
        }


        marker.bindPopup(this.pus.makeStationPopup(this.stations[i], cacheData.value, cacheData.timestamp));

        marker.addTo(map);
      }
    } else {
      console.log(this.error)
    }
  }
}
