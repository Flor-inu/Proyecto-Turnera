// Importa las utilidades necesarias para realizar pruebas unitarias en Angular
import { ComponentFixture, TestBed } from '@angular/core/testing';

// Importa el componente que se va a testear
import { BookingDialogComponent } from './booking-dialog.component';

// Bloque principal de pruebas para el componente BookingDialogComponent
describe('BookingDialogComponent', () => {

  // Variables que se usarán durante las pruebas
  let component: BookingDialogComponent; // instancia del componente
  let fixture: ComponentFixture<BookingDialogComponent>; // entorno de prueba (fixture)

  // beforeEach se ejecuta antes de cada prueba individual (it)
  beforeEach(() => {
    // Configura el entorno de prueba para este componente
    TestBed.configureTestingModule({
      // 'declarations' indica qué componentes o directivas se usan en el test
      declarations: [BookingDialogComponent]
    });

    // Crea una instancia del componente dentro del entorno de prueba
    fixture = TestBed.createComponent(BookingDialogComponent);

    // Asigna la instancia real del componente a la variable 'component'
    component = fixture.componentInstance;

    // Detecta los cambios iniciales (como si Angular hiciera el ciclo de vida ngOnInit)
    fixture.detectChanges();
  });

  // Prueba básica: verifica que el componente se haya creado correctamente
  it('should create', () => {
    // Espera que la instancia del componente exista (sea "truthy")
    expect(component).toBeTruthy();
  });
});