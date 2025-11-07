import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms'; // Módulo necesario si utilizas ngModel u otras directivas de formularios

import { AppComponent } from './app.component';

// CLAVE: Importa la clase del componente que tu HTML (app.component.html) está usando.
// La ruta es: ./component.turno/turno.component.ts
import { TurnoComponentent } from './component/turno/turno.component';

@NgModule({
  declarations: [
    AppComponent,
    TurnoComponentent // <-- DECLARACIÓN QUE HACE VISIBLE A <app-turno>
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }