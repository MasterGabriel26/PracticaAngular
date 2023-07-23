import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-default-modal',
  templateUrl: './default-modal.component.html',
  styleUrls: ['./default-modal.component.scss']
})

export class DefaultModalComponent {
  //creamos un consttructor
  constructor(
    public dialogRef: MatDialogRef<DefaultModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  
  //funcion para guardar
  onSave() {
    this.dialogRef.close({
      nombre: this.data.nombre,
      especialidad: this.data.especialidad
    });
  }
  
}
