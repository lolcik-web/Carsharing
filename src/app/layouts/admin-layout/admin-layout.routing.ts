import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { AnalyticsComponent } from './../../pages/analytics/analytics.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'analytics',      component: AnalyticsComponent},
];
