import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medico } from '../persona-lista/persona-lista.component';

@Injectable({
  providedIn: 'root',
})
export class MedicosService {
  private baseUrl = 'http://localhost:8000/api/medicos';
  
  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    if (token) {
      return new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  getMedicos(): Observable<Medico[]> {
    const headers = this.getHeaders();
    return this.http.get<Medico[]>(this.baseUrl, { headers });
  }

  createMedico(medico: Medico): Observable<Medico> {
    const headers = this.getHeaders();
    return this.http.post<Medico>(this.baseUrl, medico, { headers });
  }

  updateMedico(medico: Medico): Observable<Medico> {
    const url = `${this.baseUrl}/${medico.medico_id}`;
    const headers = this.getHeaders();
    return this.http.put<Medico>(url, medico, { headers });
  }

  deleteMedico(medicoId: string): Observable<any> {
    const url = `${this.baseUrl}/${medicoId}`;
    const headers = this.getHeaders();
    return this.http.delete(url, { headers });
  }
}
