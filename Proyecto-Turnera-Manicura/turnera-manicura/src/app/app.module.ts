import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms'; 

import { AppComponent } from './app.component';

// ✅ Ruta Correcta y Nombre Correcto
import { TurnoComponent } from './component/turno/turno.component'; 

@NgModule({
  declarations: [
    AppComponent,
    TurnoComponent // ✅ CORREGIDO: Ya no es TurnoComponentent
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