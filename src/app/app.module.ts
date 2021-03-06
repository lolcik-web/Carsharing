import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { ToastrModule } from "ngx-toastr";
import { ApiService } from "./services/api.service"
import { MarkerService } from "./services/marker.service";
import { PopupService } from './services/popup.service';

import { SidebarModule } from './sidebar/sidebar.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AppRoutes } from "./app.routing";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TimeFactory } from './shared/time-factory';

import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FixedPluginModule,
    RouterModule.forRoot(AppRoutes),
    HttpClientModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  providers: [
    ApiService,
    MarkerService,
    PopupService,
    TimeFactory,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
