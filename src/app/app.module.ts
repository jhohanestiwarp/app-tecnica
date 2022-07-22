import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';  

import { AppComponent } from './app.component';
import { FlightComponent } from './componentes/flight/flight.component';

//importamos el modulo oara trabajar con peticiones http
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';

import{FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FlightComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule
   
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
