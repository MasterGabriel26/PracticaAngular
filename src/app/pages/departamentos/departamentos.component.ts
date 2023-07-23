import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DepartamentosModalComponent } from 'src/app/DefaultsComponents/departamentos-modal/departamentos-modal.component';
import { Router } from '@angular/router';

export interface Departamentos {
  departamento_id?: string;
  nombre: string;
  descripcion: string;
}

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.scss']
})
export class DepartamentosComponent implements OnInit{
  departamentos: Departamentos[] = [];
  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private router: Router
  ) {}
  ngOnInit() {
    this.getDepartamentos();
  }
  getDepartamentos() {
    fetch('http://localhost:8000/api/departamentos', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    })
      .then((response) => response.json())
      .then((data: Departamentos[]) => {
        this.departamentos = data;
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
  openCreateModal() {
    const dialogRef = this.dialog.open(DepartamentosModalComponent, {
      data: { action: 'create' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const nuevoDepartamento: Departamentos = {
          nombre: result.nombre,
          descripcion: result.descripcion
        };
        fetch('http://localhost:8000/api/departamentos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
          body: JSON.stringify(nuevoDepartamento),
        })
          .then((response) => response.json())
          .then((response: Departamentos) => {
            this.departamentos.push(response);
          });
      }
    });
  }
  openEditModal(departamentos: Departamentos) {
    console.log('Hospital ID:', departamentos.departamento_id);
    const dialogRef = this.dialog.open(DepartamentosModalComponent, {
      data: {
        action: 'edit',
        departamento_id: departamentos.departamento_id,
        nombre: departamentos.nombre,
        descripcion: departamentos.descripcion,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const departamentoEditado: Departamentos = {
          departamento_id: result.departamento_id,
          nombre: result.nombre,
          descripcion: result.descripcion,
        };
        fetch(`http://localhost:8000/api/departamentos/${departamentos.departamento_id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
          body: JSON.stringify(departamentoEditado),
        })
          .then((response) => response.json())
          .then((response: Departamentos) => {
            const index = this.departamentos.findIndex(
              (d) => d.departamento_id === response.departamento_id
            );
            if (index !== -1) {
              this.departamentos[index] = response;
            }
            dialogRef.close();
          });
      }
    });
  }

  deleteDepartamento(departamentos: Departamentos) {
    this.http
      .delete(`http://localhost:8000/api/departamentos/${departamentos.departamento_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      })
      .subscribe(() => {
        this.departamentos = this.departamentos.filter(
          (d) => d.departamento_id !== departamentos.departamento_id
        );
      });
  }
}
