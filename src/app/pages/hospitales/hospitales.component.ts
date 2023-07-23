import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { HospitalModalComponent } from '../../DefaultsComponents/hospital-modal/hospital-modal.component';
import { Router } from '@angular/router';

export interface Hospitales {
  hospital_id?: string;
  nombre: string;
  direccion: string;
  ciudad: string;
  pais: string;
  telefono: string;
}

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.scss'],
})
export class HospitalesComponent implements OnInit {
  hospitales: Hospitales[] = [];
  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private router: Router
  ) {}
  ngOnInit() {
    this.getHospitales();
  }

  getHospitales() {
    fetch('http://localhost:8000/api/hospitales', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    })
      .then((response) => response.json())
      .then((data: Hospitales[]) => {
        this.hospitales = data;
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
    const dialogRef = this.dialog.open(HospitalModalComponent, {
      data: { action: 'create' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const nuevoHospital: Hospitales = {
          nombre: result.nombre,
          direccion: result.direccion,
          ciudad: result.ciudad,
          pais: result.pais,
          telefono: result.telefono,
        };
        fetch('http://localhost:8000/api/hospitales', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
          body: JSON.stringify(nuevoHospital),
        })
          .then((response) => response.json())
          .then((response: Hospitales) => {
            this.hospitales.push(response);
          });
      }
    });
  }
  openEditModal(hospitales: Hospitales) {
    console.log('Hospital ID:', hospitales.hospital_id);
    const dialogRef = this.dialog.open(HospitalModalComponent, {
      data: {
        action: 'edit',
        hospital_id: hospitales.hospital_id,
        nombre: hospitales.nombre,
        direccion: hospitales.direccion,
        ciudad: hospitales.ciudad,
        pais: hospitales.pais,
        telefono: hospitales.telefono,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const hospitalEditado: Hospitales = {
          hospital_id: result.hospital_id,
          nombre: result.nombre,
          direccion: result.direccion,
          ciudad: result.ciudad,
          pais: result.pais,
          telefono: result.telefono,
        };
        fetch(`http://localhost:8000/api/hospitales/${hospitales.hospital_id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
          body: JSON.stringify(hospitalEditado),
        })
          .then((response) => response.json())
          .then((response: Hospitales) => {
            const index = this.hospitales.findIndex(
              (h) => h.hospital_id === response.hospital_id
            );
            if (index !== -1) {
              this.hospitales[index] = response;
            }
            dialogRef.close();
          });
      }
    });
  }

  deleteHospital(hospital: Hospitales) {
    this.http
      .delete(`http://localhost:8000/api/hospitales/${hospital.hospital_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      })
      .subscribe(() => {
        this.hospitales = this.hospitales.filter(
          (h) => h.hospital_id !== hospital.hospital_id
        );
      });
  }
}
