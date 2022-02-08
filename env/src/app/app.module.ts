import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { ToastrModule } from "ngx-toastr";

import { SidebarModule } from './sidebar/sidebar.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AppRoutes } from "./app.routing";


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent
  ],
  imports: [
    BrowserAnimationsModule,
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FixedPluginModule,
    RouterModule.forRoot(AppRoutes)

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
