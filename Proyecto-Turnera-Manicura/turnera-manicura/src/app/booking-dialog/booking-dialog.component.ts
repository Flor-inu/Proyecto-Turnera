// Importaciones necesarias desde Angular
import { Component, Input, Output, EventEmitter } from '@angular/core';

// Importa la interfaz o clase 'Turno', que define la estructura de un turno
import { Turno } from '../model/turno';

// Decorador @Component: define los metadatos del componente
@Component({
  selector: 'app-booking-dialog',                 // Nombre del selector para usar este componente en HTML
  templateUrl: './booking-dialog.component.html', // Archivo de plantilla HTML asociado
  styleUrls: ['./booking-dialog.component.css']   // Archivo(s) de estilos CSS asociados
})
export class BookingDialogComponent {
  // Recibe un objeto 'turno' desde el componente padre (por ejemplo, el turno seleccionado)
  @Input() turno!: Turno;

  // Evento que se emite al confirmar una reserva
  // 'Omit<Turno, "id">' indica que el objeto emitido tendrá todas las propiedades de 'Turno' excepto 'id'
  @Output() confirm = new EventEmitter<Omit<Turno, 'id'>>();

  // Evento que se emite al cerrar el cuadro de diálogo (sin devolver datos)
  @Output() close = new EventEmitter<void>();

  // Método que se ejecuta al presionar el botón "Confirmar"
  submit() {
    // Emite el evento 'confirm' con los datos del turno actual (sin incluir el id)
    this.confirm.emit({
      servicio: this.turno.servicio,
      nombre: this.turno.nombre,
      apellido: this.turno.apellido,
      fecha: this.turno.fecha,
      hora: this.turno.hora,
      conQuien: this.turno.conQuien
    });
  }
}