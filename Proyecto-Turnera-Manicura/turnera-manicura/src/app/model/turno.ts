// src/app/model/turno.ts

export class Turno {
  // ID ahora es de tipo string para coincidir con MongoDB (_id)
  id!: string; 
  nombre!: string;
  apellido!: string;
  fecha!: Date; 
  hora!: string;
  servicio!: string;
  conQuien!: string;
}