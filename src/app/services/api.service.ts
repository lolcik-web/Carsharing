import { StationDetail } from '../shared/station-detail';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

const URL = 'https://mobility.api.opendatahub.bz.it/v1/carsharing/rest/'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getAllStations(): Promise<Array<string>>{
    return this.http.get<Array<string>>(`${URL}get-stations`).toPromise()
  }

  getAllStationDetails(): Promise<StationDetail[]>{
    return this.http.get<StationDetail[]>(`${URL}get-station-details`).toPromise()
  }
}
