import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';


export interface Consulta {
  consulta_id?: string;
  paciente_id?: string;
  nombre: string;
  medico_id?: string;
  fecha: string;
  diagnostico: string;
  tratamiento: string;
}

@Component({
  selector: 'app-consultas-modal',
  templateUrl: './consultas-modal.component.html',
  styleUrls: ['./consultas-modal.component.scss'],
})
export class ConsultasModalComponent {
  pacientes: any[] = []; // Aquí almacenaremos la lista de pacientes
  medicos: any[] = [];
  formSubmitted = false;
  constructor(
    public dialogRef: MatDialogRef<ConsultasModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

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
        console.log('pacientes:', this.pacientes);
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
        console.log('Medicos:', this.medicos);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  formularioContacto = new FormGroup({
    paciente_id: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
      Validators.pattern('[0-9]+'),
    ]),
    medico_id: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
      Validators.pattern('[0-9]+'),
    ]),
    fecha: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{4}-\d{2}-\d{2}$/),
    ]),
    diagnostico: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
      Validators.pattern('[a-zA-Z]+'),
    ]),
    tratamiento: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
      Validators.pattern('[a-zA-Z]+'),
    ]),
  });

  onSave() {
    console.log('onSave() called');
    if (this.formularioContacto.invalid) {
      return;
    }
    this.dialogRef.close({
      consulta_id: this.data.consulta_id,
      paciente_id: this.formularioContacto.value.paciente_id,
      medico_id: this.formularioContacto.value.medico_id,
      fecha: this.formularioContacto.value.fecha,
      diagnostico: this.formularioContacto.value.diagnostico,
      tratamiento: this.formularioContacto.value.tratamiento,
    });
    console.log('Formulario values:', this.formularioContacto.value);
    console.log('DialogRef:', this.dialogRef);
  }
}
