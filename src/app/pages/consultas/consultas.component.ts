import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { ConsultasModalComponent } from 'src/app/DefaultsComponents/consultas-modal/consultas-modal.component';
import { Router } from '@angular/router';

export interface Consulta {
  consulta_id?: string;
  paciente_id?: string;
  medico_id?: string;
  fecha: string;
  diagnostico: string;
  tratamiento: string;
  nombre_paciente?: string; // Nuevo campo para almacenar el nombre del paciente
  nombre_medico?: string;
}

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.scss'],
})
export class ConsultasComponent implements OnInit {
  consultas: Consulta[] = [];
  pacientes: any[] = [];
  medicos: any[] = [];

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.getConsultas();
    this.getPacientes();
    this.getMedicos();
  }

  getConsultas() {
    fetch('http://localhost:8000/api/consultas', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    })
      .then((response) => response.json())
      .then((data: Consulta[]) => {
        this.consultas = data.map((consulta) => {
          const paciente = this.pacientes.find(
            (p) => p.paciente_id === consulta.paciente_id
          );
          const medico = this.medicos.find(
            (m) => m.medico_id === consulta.medico_id
          );
          return {
            ...consulta,
            nombre_paciente: paciente ? paciente.nombre : '',
            nombre_medico: medico ? medico.nombre : '',
          };
        });
      })
      .catch((error) => {
        if (error.status === 401) {
          // Redireccionar a la página de inicio de sesión
          this.router.navigate(['/login']);
        } else {
          // Otro manejo de errores
        }
      });
  }

  getPacientes() {
    fetch('http://localhost:8000/api/pacientes', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    })
      .then((response) => response.json())
      .then((data: any[]) => {
        this.pacientes = data;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getMedicos() {
    fetch('http://localhost:8000/api/medicos', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    })
      .then((response) => response.json())
      .then((data: any[]) => {
        this.medicos = data;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getNombrePaciente(pacienteId: string | undefined): string {
    if (!pacienteId) return ''; // Verificación adicional para evitar errores
    const paciente = this.pacientes.find(p => p.paciente_id === pacienteId);
    return paciente ? paciente.nombre : '';
  }

  getNombreMedico(medicoId: string | undefined): string {
    if (!medicoId) return ''; // Verificación adicional para evitar errores
    const medico = this.medicos.find(m => m.medico_id === medicoId);
    return medico ? medico.nombre : '';
  }

  openCreateModal() {
    const dialogRef = this.dialog.open(ConsultasModalComponent, {
      data: { action: 'create' },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const nuevaConsulta: Consulta = {
          paciente_id: result.paciente_id,
          medico_id: result.medico_id,
          fecha: result.fecha,
          diagnostico: result.diagnostico,
          tratamiento: result.tratamiento,
        };
  
        const url = 'http://localhost:8000/api/consultas';
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          }),
        };
  
        this.http.post<Consulta>(url, nuevaConsulta, httpOptions)
          .pipe(
            catchError((error) => {
              console.error(error);
              return throwError('Something went wrong with the POST request.');
            })
          )
          .subscribe((response) => {
            this.consultas.push(response);
          });
      }
    });
  }
  
  
  

  openEditModal(consultas: Consulta) {
    console.log('Consulta ID:', consultas.consulta_id);
    const dialogRef = this.dialog.open(ConsultasModalComponent, {
      data: {
        action: 'edit',
        consulta_id: consultas.consulta_id,
        paciente_id: consultas.paciente_id,
        medico_id: consultas.medico_id,
        fecha: consultas.fecha,
        diagnostico: consultas.diagnostico,
        tratamiento: consultas.tratamiento,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const consultaEditado: Consulta = {
          consulta_id: result.consulta_id,
          paciente_id: result.paciente_id,
          medico_id: result.medico_id,
          fecha: result.fecha,
          diagnostico: result.diagnostico,
          tratamiento: result.tratamiento
        };
        fetch(`http://localhost:8000/api/consultas/${consultas.consulta_id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
          body: JSON.stringify(consultaEditado),
        })
          .then((response) => response.json())
          .then((response: Consulta) => {
            const index = this.consultas.findIndex(
              (c) => c.consulta_id === response.consulta_id
            );
            if (index !== -1) {
              this.consultas[index] = response;
            }
            dialogRef.close();
          });
      }
    });
  }

  deleteConsulta(consultas: Consulta) {
    this.http
      .delete(`http://localhost:8000/api/consultas/${consultas.consulta_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      })
      .subscribe(() => {
        this.consultas = this.consultas.filter(
          (c) => c.consulta_id !== consultas.consulta_id
        );
      });
  }
}
