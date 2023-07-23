import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-departamentos-modal',
  templateUrl: './departamentos-modal.component.html',
  styleUrls: ['./departamentos-modal.component.scss']
})
export class DepartamentosModalComponent {
  constructor(
    public dialogRef: MatDialogRef<DepartamentosModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onSave(): void {
    this.dialogRef.close({
      nombre: this.data.nombre,
      descripcion: this.data.descripcion,
    });
  }

}
