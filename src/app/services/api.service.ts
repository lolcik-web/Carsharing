import { RecordDetail } from './../shared/record-detail';
import { StationDetail } from '../shared/station-detail';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

const URL = 'https://mobility.api.opendatahub.bz.it/v1/carsharing/rest'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getAllStations(): Promise<Array<string>> {
    return this.http.get<Array<string>>(`${URL}/get-stations`).toPromise();
  }

  getAllStationDetails(): Promise<StationDetail[]> {
    return this.http.get<StationDetail[]>(`${URL}/get-station-details`).toPromise();
  }

  getDataTypes(station: string): Promise<any> {
    return this.http.get<any>(`${URL}/get-data-types?station=${station}`).toPromise();
  }

  getDateOfLastRecord(station: string): Promise<any> {
    return this.http.get(`${URL}/get-date-of-last-record?station=${station}`).toPromise();
  }

  getNewestRecord(station: string): Promise<RecordDetail> {
    return this.http.get<RecordDetail>(`${URL}/get-newest-record?station=${station}`).toPromise();
  }

  getRecords(station: string, dataType: string, seconds: string): Promise<RecordDetail[]> {
    return this.http.get<RecordDetail[]>
      (`${URL}/get-records?station=${station}&name=${dataType}&seconds=${seconds}`)
      .toPromise();
  }

  getRecordsInTimeFrame(station: string, dataType: string, seconds: number, from: number, to: number): Promise<RecordDetail[]> {
    return this.http.get<RecordDetail[]>
      (`${URL}/get-records-in-timeframe?station=${station}&name=${dataType}&seconds=${seconds}&from=${from}&to=${to}`)
      .toPromise();
  }
}
