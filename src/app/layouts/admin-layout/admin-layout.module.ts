import { HttpClient } from '@angular/common/http';
import { ApiService } from './../../services/api.service';
import { MarkerService } from './../../services/marker.service';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { MapComponent } from '../../pages/map/maps.component';
import { AnalyticsComponent } from './../../pages/analytics/analytics.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule
  ],
  declarations: [
    DashboardComponent,
    MapComponent,
    AnalyticsComponent,
  ],
  providers: [
    DecimalPipe,
    MarkerService,
    ApiService,
  ],
})

export class AdminLayoutModule {}
