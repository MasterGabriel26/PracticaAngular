import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pacientes-modal',
  templateUrl: './pacientes-modal.component.html',
  styleUrls: ['./pacientes-modal.component.scss'],
})
export class PacientesModalComponent {
  constructor(
    public dialogRef: MatDialogRef<PacientesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onSave(): void {
    this.dialogRef.close({
      nombre: this.data.nombre,
      direccion: this.data.direccion,
      ciudad: this.data.ciudad,
      pais: this.data.pais,
      telefono: this.data.telefono,
      fecha_nacimiento: this.data.fecha_nacimiento,
    });
  }
}
