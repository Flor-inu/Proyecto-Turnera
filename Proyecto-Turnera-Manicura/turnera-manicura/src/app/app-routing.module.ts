// Importa NgModule para declarar módulos en Angular
import { NgModule } from '@angular/core';

// Importa RouterModule y Routes para configurar rutas de la aplicación
import { RouterModule, Routes } from '@angular/router';

// Define las rutas de la aplicación
// Por ahora está vacío, se puede agregar rutas más adelante
const routes: Routes = [];

// Decorador @NgModule: define un módulo de Angular
@NgModule({
  // Importa RouterModule configurado con nuestras rutas
  // forRoot() se usa solo en el módulo principal para inicializar el enrutador
  imports: [RouterModule.forRoot(routes)],

  // Exporta RouterModule para que las rutas estén disponibles en toda la app
  exports: [RouterModule]
})
export class AppRoutingModule { } // Clase del módulo de enrutamiento