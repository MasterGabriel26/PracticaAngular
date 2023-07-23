import { Component, Inject, OnInit  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface Consulta {
  consulta_id?: string;
  paciente_id?: string;
  nombre: string;
  email: string;
  mensaje: string;
  medico_id?: string;
  fecha: string;
  diagnostico: string;
  tratamiento: string;
}

@Component({
  selector: 'app-consultas-modal',
  templateUrl: './consultas-modal.component.html',
  styleUrls: ['./consultas-modal.component.scss']
})

export class ConsultasModalComponent {
  pacientes: any[] = []; // Aquí almacenaremos la lista de pacientes
  medicos: any[] = []; 

  constructor(
    public dialogRef: MatDialogRef<ConsultasModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    // Cargar la lista de pacientes y médicos en los arreglos correspondientes
    this.getPacientes();
    this.getMedicos();
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
  
  onSave() {
    this.dialogRef.close({
      nombre: this.data.nombre,
      email: this.data.email,
      mensaje: this.data.mensaje,
      consulta_id: this.data.consulta_id,
      paciente_id: this.data.paciente_id,
      medico_id: this.data.medico_id,
      fecha: this.data.fecha,
      diagnostico: this.data.diagnostico,
      tratamiento: this.data.tratamiento,
    });
  }
}
