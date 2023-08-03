import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-departamentos-modal',
  templateUrl: './departamentos-modal.component.html',
  styleUrls: ['./departamentos-modal.component.scss']
})
export class DepartamentosModalComponent {
  formSubmitted = false;
  constructor(
    public dialogRef: MatDialogRef<DepartamentosModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  formularioContacto = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('[a-zA-Z]+')]),
    descripcion: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100), Validators.pattern('[a-zA-Z]+')]),
  });
  onSave() {
    if (!this.formularioContacto.valid) {
      return;
    }
    this.dialogRef.close({
      nombre: this.formularioContacto.value.nombre,
      descripcion: this.formularioContacto.value.descripcion,
    });
  }

}
