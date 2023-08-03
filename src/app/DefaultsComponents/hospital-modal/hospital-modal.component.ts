import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-hospital-modal',
  templateUrl: './hospital-modal.component.html',
  styleUrls: ['./hospital-modal.component.scss'],
})
export class HospitalModalComponent {
  formSubmitted = false;
  constructor(
    public dialogRef: MatDialogRef<HospitalModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  formularioContacto = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('[a-zA-Z]+')]),
    direccion: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100), Validators.pattern('[a-zA-Z]+')]),
    ciudad: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100), Validators.pattern('[a-zA-Z]+')]),
    pais: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100), Validators.pattern('[a-zA-Z]+')]),
    telefono: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100), Validators.pattern('[0-9]+')]),
  });
  onSave(): void {
    if (!this.formularioContacto.valid) {
      return;
    }
    this.dialogRef.close({
      nombre: this.data.nombre,
      direccion: this.data.direccion,
      ciudad: this.data.ciudad,
      pais: this.data.pais,
      telefono: this.data.telefono,
    });
  }
}
