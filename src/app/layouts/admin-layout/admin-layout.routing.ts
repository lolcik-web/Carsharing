import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { MapComponent } from '../../pages/map/maps.component';
import { AnalyticsComponent } from './../../pages/analytics/analytics.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'map',           component: MapComponent },
    { path: 'analytics',      component: AnalyticsComponent},
];
