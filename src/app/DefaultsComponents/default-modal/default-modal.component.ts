import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-default-modal',
  templateUrl: './default-modal.component.html',
  styleUrls: ['./default-modal.component.scss']
})

export class DefaultModalComponent {
  formSubmitted = false;
  constructor(
    public dialogRef: MatDialogRef<DefaultModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  formularioContacto = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('[a-zA-Z]+')]),
    especialidad: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100), Validators.pattern('[a-zA-Z]+')]),
  });

  onSave() {
    if (!this.formularioContacto.valid) {
      return;
    }
    this.dialogRef.close({
      nombre: this.formularioContacto.value.nombre,
      especialidad: this.formularioContacto.value.especialidad
    });
  }
}