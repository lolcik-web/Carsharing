import { TimeFactory } from './../../shared/time-factory';
import { TimeFormat } from './../../shared/time';
import { RecordDetail } from './../../shared/record-detail';
import { HttpErrorResponse } from '@angular/common/http';
import { StationDetail } from './../../shared/station-detail';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

const period = 600;

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

  stationId!: string;
  stations!: StationDetail[];
  station!: StationDetail;
  error!: HttpErrorResponse;
  chartData!: RecordDetail[];
  loading!: boolean;

  stationSelect!: string;
  timeSelect!: string;

  timeAllStation!: TimeFormat[];
  timeSingleStaion!: TimeFormat[];

  currentTime!: string;
  maxAvailable: number = 0;
  lastRecord!: string;

  public canvas : any;
  public ctx;
  public chartColor;
  public chartStatistic;
  public chartHours;

  constructor(private as: ApiService, private tf: TimeFactory) { }

  async ngOnInit() {
    this.timeAllStation = this.tf.makeTimeFormatStaions();
    this.timeSingleStaion = this.tf.makeTimeFormatSingleStaion();

    this.stationSelect = 'all';
    this.timeSelect = '86400';
    this.currentTime = this.toDate(Math.floor(new Date().getTime()))

    this.loading = true;
    await this.as.getAllStationDetails()
      .then(response => this.stations = response)
      .catch(error => this.error = error);

    this.onClick('all', this.timeSelect);
  }

  async onClick(station: string, time: string) {
    if (station != 'all') {
      this.loading = true;
      this.chartData = null;
      this.maxAvailable = 0;
      this.currentTime = this.toDate(Math.floor(new Date().getTime()))

      await this.fillChartData(station, time)
        .then(response => this.chartData = response)
        .catch(error => this.error = error);

      this.station = this.stations.find(element => element.id = station);
      this.maxAvailable = this.station.availableVehicles;

      this.lastRecord = this.toDate(this.chartData[this.chartData.length -1].timestamp)

      this.makeStatisticPie(this.maxAvailable);

      this.makeAvailability();
      this.loading = false;
    } else {
      this.loading = true;
      this.chartData = null;
      this.maxAvailable = 0;
      this.currentTime = this.toDate(Math.floor(new Date().getTime()))

      await this.fillChartDataAll(this.stations, time)
        .then(response => this.chartData = response)
        .catch(error => this.error = error);

      for (let n = 0, m = this.stations.length; n < m; n++) {
        this.maxAvailable = this.maxAvailable + this.stations[n].availableVehicles;
      }

      this.lastRecord = this.toDate(this.chartData[this.chartData.length -1].timestamp)

      this.makeStatisticPie(this.maxAvailable);

      this.makeAvailability();
      this.loading = false;
    }
  }

  makeStatisticPie(maxValue: number) {
    this.canvas = document.getElementById("chartStatistic");
    this.ctx = this.canvas.getContext("2d");
    this.chartStatistic = new Chart(this.ctx, {
        type: 'pie',
        data: {
          labels: ['available', 'unavailable'],
          datasets: [{
            label: "Station",
            pointRadius: 0,
            pointHoverRadius: 0,
            backgroundColor: [
              '#4acccd',
              '#ef8157',
            ],
            borderWidth: 0,
            data: [this.chartData[this.chartData.length - 1].value, maxValue - this.chartData[this.chartData.length - 1].value]
          }]
        },

        options: {

          legend: {
            display: false
          },

          pieceLabel: {
            render: 'percentage',
            fontColor: ['white'],
            precision: 2
          },

          tooltips: {
            enabled: true
          },

          scales: {
            yAxes: [{

              ticks: {
                display: false
              },
              gridLines: {
                drawBorder: false,
                zeroLineColor: "transparent",
                color: 'rgba(255,255,255,0.05)'
              }

            }],

            xAxes: [{
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: 'rgba(255,255,255,0.1)',
                zeroLineColor: "transparent"
              },
              ticks: {
                display: false,
              }
            }]
          },
        }
    });
  }

  makeAvailability() {
    var speedCanvas = document.getElementById("speedChart");

    var dataFirst = {
      data: this.chartData.map(a => a.value),
      fill: false,
      borderColor: '#4acccd',
      backgroundColor: 'transparent',
      pointBorderColor: '#4acccd',
      pointRadius: 0,
      pointHoverRadius: 4,
      pointBorderWidth: 8,
    };

    var dateLable: string[] = [];

    for (let i = 0, j = this.chartData.length; i < j; i++) {
      dateLable[i] = this.toDate(this.chartData[i].timestamp);
    }

    var speedData = {
      labels: dateLable,
      datasets: [dataFirst]
    };

    var chartOptions = {
      legend: {
        display: false,
        position: 'top'
      }
    };

    var lineChart = new Chart(speedCanvas, {
      type: 'line',
      hover: false,
      data: speedData,
      options: chartOptions
    });

    this.loading = false
    dateLable = null
  }

  toDate(timestamp: number): string {
    var time: Date = new Date(timestamp);
    return  time.getDate() + '/' + time.getMonth() + '/' + time.getFullYear() + ' ' + ("0" + time.getHours()).slice(-2) + ':' + ("0" + time.getMinutes()).slice(-2);
  }

  sorting(sortKey: string): string {
    if (sortKey != 'all') {
      for (var i = 1, j = this.stations.length; i < j; i++) {
        if (this.stations[i].id == sortKey) {
          return this.stations[i].name;
        }
      }
      return '???';
    } else {
      return 'Alle Stationen';
    }
  }

  async fillChartDataAll(stations: StationDetail[], seconds: string): Promise<RecordDetail[]> {
    let collectedChartData: RecordDetail[];

    await this.as.getRecords(stations[0].id, 'number-available', seconds)
      .then(response => collectedChartData = response)
      .catch(error => this.error = error);

    for (var i = 1, j = stations.length; i < j; i++) {
      let cacheChartData: RecordDetail[];

      await this.as.getRecords(stations[i].id, 'number-available', seconds)
        .then(response => {cacheChartData = response})
        .catch(error => this.error = error);

      for (var n = 0, m = cacheChartData.length; n < m; n++) {
        collectedChartData[n].value = collectedChartData[n].value + cacheChartData[n].value;
      }
    }

    return collectedChartData;
  }

  async fillChartData(station: string, seconds: string): Promise<RecordDetail[]>{
    let cacheChartData: RecordDetail[];

    await this.as.getRecords(station, 'number-available', seconds)
      .then(response => cacheChartData = response)
      .catch(error => this.error = error);

    return cacheChartData;
  }

}
