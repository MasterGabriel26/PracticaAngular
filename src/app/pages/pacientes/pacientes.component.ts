import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { PacientesModalComponent } from 'src/app/DefaultsComponents/pacientes-modal/pacientes-modal.component';
import { Router } from '@angular/router';
import { IndexedDbService } from 'src/app/indexed-db.service';

export interface Pasientes {
  paciente_id?: string;
  nombre: string;
  direccion: string;
  ciudad: string;
  pais: string;
  telefono: string;
  fecha_nacimiento: string;
}
@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss'],
})
export class PacientesComponent implements OnInit {
  pasientes: Pasientes[] = [];
  token_idb: any;

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private router: Router,
    private indexedDbService: IndexedDbService // Agrega el servicio aquí
  ) {}

  ngOnInit() {
    this.getDataFromIndexedDB();
    this.getPasientes();
    setInterval(() => {
      this.getDataFromIndexedDB();
    }, 3000);
  }
  getPasientes() {
    fetch('http://localhost:8000/api/pacientes', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    })
      .then((response) => response.json())
      .then((data: Pasientes[]) => {
        this.pasientes = data;
      })
      .catch((error) => {
        if (error.status === 401) {
          this.router.navigate(['/login']);
        } else {
        }
      });
  }
  openCreateModal() {
    const dialogRef = this.dialog.open(PacientesModalComponent, {
      data: { action: 'create' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const nuevoPasiente: Pasientes = {
          nombre: result.nombre,
          direccion: result.direccion,
          ciudad: result.ciudad,
          pais: result.pais,
          telefono: result.telefono,
          fecha_nacimiento: result.fecha_nacimiento,
        };
        fetch('http://localhost:8000/api/pacientes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
          body: JSON.stringify(nuevoPasiente),
        })
          .then((response) => response.json())
          .then((response: Pasientes) => {
            this.pasientes.push(response);
          });
      }
    });
  }

  openEditModal(pasientes: Pasientes) {
    console.log('Medico ID:', pasientes.paciente_id);
    const dialogRef = this.dialog.open(PacientesModalComponent, {
      data: {
        action: 'edit',
        paciente_id: pasientes.paciente_id,
        nombre: pasientes.nombre,
        direccion: pasientes.direccion,
        ciudad: pasientes.ciudad,
        pais: pasientes.pais,
        telefono: pasientes.telefono,
        fecha_nacimiento: pasientes.fecha_nacimiento,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const pasienteEditado: Pasientes = {
          paciente_id: result.paciente_id,
          nombre: result.nombre,
          direccion: result.direccion,
          ciudad: result.ciudad,
          pais: result.pais,
          telefono: result.telefono,
          fecha_nacimiento: result.fecha_nacimiento,
        };
        fetch(`http://localhost:8000/api/pacientes/${pasientes.paciente_id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
          body: JSON.stringify(pasienteEditado),
        })
          .then((response) => response.json())
          .then((response: Pasientes) => {
            const index = this.pasientes.findIndex(
              (p) => p.paciente_id === response.paciente_id
            );
            if (index !== -1) {
              this.pasientes[index] = response;
            }
            dialogRef.close();
          });
      }
    });
  }

  deletePasiente(pasientes: Pasientes) {
    this.http
      .delete(`http://localhost:8000/api/pacientes/${pasientes.paciente_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      })
      .subscribe(() => {
        this.pasientes = this.pasientes.filter(
          (p) => p.paciente_id !== pasientes.paciente_id
        );
      });
  }

  getDataFromIndexedDB(): void {
    this.indexedDbService.getDataFromIndexedDB().then(
      (data: any) => {
        this.token_idb = data.token;
        //console.log('token almacenado en IndexedDB:', this.token_idb);
        const token_ls: any = localStorage.getItem('access_token');
        if (this.token_idb !== token_ls) {
          this.router.navigate(['/login']);
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
