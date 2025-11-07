import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms'; 

import { AppComponent } from './app.component';

// ✅ CORREGIDO: Ruta anidada y TurnoComponent
import { TurnoComponentent } from './component/turno/turno.component'; 

@NgModule({
  declarations: [
    AppComponent,
    TurnoComponentent // ✅ CORREGIDO: Nombre de la clase (quitado 'ent')
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