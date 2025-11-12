// Importa Component, OnInit y NgForm
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'; 
import { Turno } from '../../model/turno';

@Component({
  selector: 'app-turno',                
  templateUrl: './turno.component.html',  
  styleUrls: ['./turno.component.css']   
})
export class TurnoComponent implements OnInit { 

  // === VARIABLES DE ESTADO ===
  activeTab: 'servicios' | 'misTurnos' = 'servicios';
  showModal: boolean = false; 
  servicioSeleccionado: string = '';
  
  // Título, colores y servicios
  title = 'Flor Nail Beauty';
  colors = {
    primary: '#E8ADA0', primaryDark: '#D9928A', secondary: '#D9B036',
    secondaryDark: '#B8922C', accent: '#A8C5A3', light: '#F2D9D0',
    lighter: '#FFF8F5', text: '#4A3831',
  };

  services = [
    { name: 'Esmaltado Semi Permanente', price: '$22.000' },
    { name: 'Esmaltado Semi Permanente en Pies', price: '$22.000' },
    { name: 'Kapping', price: '$24.000' },
    { name: 'Esculpidas en Acrigel', price: '$34.000' },
    { name: 'Soft Gel', price: '$28.000' },
  ];

  turnos: Turno[] = [];
  private deferredPrompt: any;

  constructor() { }

  ngOnInit(): void {
    // Escucha el evento "beforeinstallprompt"
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      this.deferredPrompt = event;
      console.log('App lista para instalar');
    });
  }

  // === MÉTODOS ===

  abrirModal(serviceName: string): void {
    this.servicioSeleccionado = serviceName;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  reservarTurno(form: NgForm): void {
    if (form.invalid) {
      alert('Por favor, complete todos los campos requeridos.');
      return;
    }

    const nuevoTurno: Turno = {
      id: Math.random().toString(36).substring(2, 9),
      servicio: this.servicioSeleccionado,
      nombre: form.value.name,
      apellido: form.value.lastname,
      telefono: form.value.phone,
      fecha: form.value.date,
      hora: form.value.time,
      conQuien: form.value.staff,
      status: 'pending'
    };

    // === VALIDACIÓN: verificar si ya existe un turno igual ===
    const turnoExistente = this.turnos.find(t =>
      t.fecha === nuevoTurno.fecha &&
      t.hora === nuevoTurno.hora &&
      t.conQuien === nuevoTurno.conQuien
    );

    if (turnoExistente) {
      alert('⚠️ Este turno ya está reservado. Por favor, elija otra hora o profesional.');
      return;
    }

    // Si no existe, guardar el nuevo turno
    this.turnos.push(nuevoTurno);
    alert('✅ ¡Turno reservado con éxito!');
    this.closeModal();
    this.activeTab = 'misTurnos'; 
  }

  deleteTurno(id?: string): void {
    if (!id) return;
    this.turnos = this.turnos.filter(t => t.id !== id);
  }

  hoverEnter(event: Event): void {
    (event.target as HTMLElement).style.backgroundColor = this.colors.secondaryDark;
  }

  hoverLeave(event: Event): void {
    (event.target as HTMLElement).style.backgroundColor = this.colors.secondary;
  }

  instalarApp(): void {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('✅ Usuario instaló la app');
        } else {
          console.log('Usuario canceló la instalación');
        }
        this.deferredPrompt = null;
      });
    } else {
      alert('Esta app ya está instalada o no es compatible.');
    }
  }
}
