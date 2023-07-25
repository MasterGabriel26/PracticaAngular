import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DefaultModalComponent } from '../DefaultsComponents/default-modal/default-modal.component';
import { Router } from '@angular/router';
import { IndexedDbService } from '../indexed-db.service';


export interface Medico {
  medico_id?: string;
  nombre: string;
  especialidad: string;
}

@Component({
  selector: 'app-persona-lista',
  templateUrl: './persona-lista.component.html',
  styleUrls: ['./persona-lista.component.scss'],
})
export class PersonaListaComponent implements OnInit {
  medicos: Medico[] = [];
  token_idb : any;

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private router: Router,
    private indexedDbService: IndexedDbService // Agrega el servicio aquí
  ) {}
  
  ngOnInit() {
    this.getDataFromIndexedDB();
    this.getMedicos();
    

    setInterval(() => {
      this.getDataFromIndexedDB();
    }, 3000);
  }

  getMedicos() {
    fetch('http://localhost:8000/api/medicos', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    })
      .then((response) => response.json())
      .then((data: Medico[]) => {
        this.medicos = data;
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
    const dialogRef = this.dialog.open(DefaultModalComponent, {
      data: { action: 'create' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const nuevoMedico: Medico = {
          nombre: result.nombre,
          especialidad: result.especialidad,
        };
        fetch('http://localhost:8000/api/medicos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
          body: JSON.stringify(nuevoMedico),
        })
          .then((response) => response.json())
          .then((response: Medico) => {
            this.medicos.push(response);
          });
      }
    });
  }

  openEditModal(medico: Medico) {
    console.log('Medico ID:', medico.medico_id);
    const dialogRef = this.dialog.open(DefaultModalComponent, {
      data: {
        action: 'edit',
        id: medico.medico_id,
        nombre: medico.nombre,
        especialidad: medico.especialidad,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const medicoEditado: Medico = {
          medico_id: result.medico_id,
          nombre: result.nombre,
          especialidad: result.especialidad,
        };
        fetch(`http://localhost:8000/api/medicos/${medico.medico_id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
          body: JSON.stringify(medicoEditado),
        })
          .then((response) => response.json())
          .then((response: Medico) => {
            const index = this.medicos.findIndex((m) => m.medico_id === response.medico_id);
            if (index !== -1) {
              this.medicos[index] = response;
            }
            dialogRef.close();
          });
      }
    });
  }

  deleteMedico(medico: Medico) {
    this.http
      .delete(`http://localhost:8000/api/medicos/${medico.medico_id}`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        }
      })
      .subscribe(() => {
        this.medicos = this.medicos.filter((m) => m.medico_id !== medico.medico_id);
      });
    
    }

  getDataFromIndexedDB(): void {
    this.indexedDbService.getDataFromIndexedDB().then(
      (data: any) => {
        this.token_idb = data.token;
        //console.log('token almacenado en IndexedDB:', this.token_idb);
        const token_ls: any = localStorage.getItem('access_token');
        if(this.token_idb !== token_ls){
          this.router.navigate(['/login']);
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}