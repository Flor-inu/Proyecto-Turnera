// Importa platformBrowserDynamic, que permite iniciar la aplicación Angular en el navegador
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// Importa el módulo principal de la aplicación
import { AppModule } from './app/app.module';

// Inicializa la aplicación Angular cargando el módulo principal
platformBrowserDynamic().bootstrapModule(AppModule)
  // Captura cualquier error durante el arranque y lo muestra en la consola
  .catch(err => console.error(err));