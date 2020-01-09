import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FileDropModule } from 'ngx-file-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { LoginComponent } from './login/login.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { WorkPageComponent } from './work-page/work-page.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WorkPageComponent,
    ChartComponent,
    LineChartComponent,
    PieChartComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FileDropModule,
    FormsModule,
    HttpClientModule,
    NgxChartsModule,
    NgxSpinnerModule,
    TabsModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
