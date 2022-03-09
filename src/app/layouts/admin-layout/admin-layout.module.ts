import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { AnalyticsComponent } from './../../pages/analytics/analytics.component';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MapComponent } from 'app/components/map/map.component';
import { MousePositionComponent } from 'app/components/mouse-position/mouse-position.component';
import { ScalelineComponent } from 'app/components/scaleline/scaleline.component';
import { CoordinateFormatterService } from "../../services/coordinate-formatter.service";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule
  ],
  declarations: [
    DashboardComponent,
    MapsComponent,
    AnalyticsComponent,
    MapComponent,
    MousePositionComponent,
    ScalelineComponent,

  ],
  providers: [
    DecimalPipe,
    CoordinateFormatterService,
  ],
})

export class AdminLayoutModule {}
