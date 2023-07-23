import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-hospital-modal',
  templateUrl: './hospital-modal.component.html',
  styleUrls: ['./hospital-modal.component.scss'],
})
export class HospitalModalComponent {
  constructor(
    public dialogRef: MatDialogRef<HospitalModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onSave(): void {
    this.dialogRef.close({
      nombre: this.data.nombre,
      direccion: this.data.direccion,
      ciudad: this.data.ciudad,
      pais: this.data.pais,
      telefono: this.data.telefono,
    });
  }
}
