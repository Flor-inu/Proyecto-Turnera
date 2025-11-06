// src/app/app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// 1. Importa este módulo
import { HttpClientModule } from '@angular/common/http'; 

import { AppComponent } from './app.component';
// Importa tus componentes si los tienes
// import { TurnosComponent } from './turnos/turnos.component'; 

@NgModule({
  declarations: [
    AppComponent,
    // TurnosComponent 
  ],
  // 2. Agrega HttpClientModule a los imports
  imports: [
    BrowserModule,
    HttpClientModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }