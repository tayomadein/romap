import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { MaterialModule } from '@angular/material';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import {LocationService} from './services/location.service';
import {ReportService} from './services/report.service';

import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component'
import { NavbarComponent } from './navbar/navbar.component'
import { ReportComponent } from './report/report.component';
import { ROMapComponent } from './ro-map/ro-map.component';


@NgModule({
  declarations: [
    AppComponent,
    ROMapComponent,
    ReportComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartsModule,
    AppRoutingModule,
    MaterialModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyApx6BnY6kBofX0HFhDGQLJqZ6fdmzs1ts'
    })
  ],
  providers: [LocationService,ReportService],
  bootstrap: [AppComponent]
})
export class AppModule { }
