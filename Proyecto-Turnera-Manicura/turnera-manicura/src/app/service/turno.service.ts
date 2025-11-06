// src/app/services/turno.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
// RUTA CORREGIDA: Sube un nivel (..) y entra a 'model'
import { Turno } from '../model/turno'; 

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  // 🛑 CORRECCIÓN CLAVE: La URL debe incluir el prefijo '/api'
  // URL: Base de Render + /api/turnos
  private apiUrl: string = 'https://proyecto-turnera.onrender.com/api/turnos'; 

  constructor(private http: HttpClient) { }

  // -------------------- MÉTODOS CRUD --------------------

  // 📘 GET: Devuelve todos los turnos
  getTurnos(): Observable<Turno[]> {
    return this.http.get<Turno[]>(this.apiUrl);
  }
  
  // (Debes incluir aquí el resto de tus métodos: getTurnoByID, addTurno, updateTurno, deleteTurno)
  
  // 📘 GET: Devuelve un turno según su ID
  getTurnoByID(id: number): Observable<Turno> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Turno>(url);
  }

  // ➕ POST: Agrega un nuevo turno
  addTurno(turno: Turno): Observable<Turno> {
    return this.http.post<Turno>(this.apiUrl, turno);
  }

  // ✏️ PUT: Actualiza un turno existente
  updateTurno(turno: Turno): Observable<any> {
    const url = `${this.apiUrl}/${turno.id}`;
    return this.http.put<any>(url, turno); 
  }

  // ❌ DELETE: Elimina un turno según su ID
  deleteTurno(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }
}