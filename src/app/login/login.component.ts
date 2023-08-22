import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  
})

export class LoginComponent {
  email: string = "";
  password: string = "";
  error: string = "";
  loading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    
    this.loading = true;
    this.authService.login(this.email, this.password)
      .subscribe(
        response => {
          console.log('Access Token:', response.token);
          localStorage.setItem('access_token', response.token);
          const token: any = localStorage.getItem('access_token');
          this.guardarDatosEnIndexedDB(token);
          this.router.navigate(['/dashboardSensors']);
        },
        error => {
          // Mostrar el mensaje de error en caso de fallar el inicio de sesión
          this.error = error.error.message;
        }
      )
      .add(() => {
        this.loading = false; // Ocultar el spinner cuando se complete el registro
      });
  }
  
  logout(): void {
    // Remover el token de acceso del almacenamiento local
    localStorage.removeItem('access_token');
    // Redirigir al usuario a la página de inicio de sesión
    this.router.navigate(['/login']);
  }


  guardarDatosEnIndexedDB(data: any) {
    const request = indexedDB.open('token', 1);

    request.onerror = (event: Event) => {
      console.log('Error al abrir la base de datos');
    };

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;
      db.createObjectStore('db_token', { keyPath: 'id' });
    };

    request.onsuccess = (event: Event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction('db_token', 'readwrite');
      const objectStore = transaction.objectStore('db_token');

      const dataToStore = { id: 1, token: data };
      const putRequest = objectStore.put(dataToStore);

      putRequest.onsuccess = (event: Event) => {
        //console.log('Datos guardados en IndexedDB');
        // Emitir evento de actualización para notificar a otras pestañas
        this.emitirEventoActualizacion();
      };

      putRequest.onerror = (event: Event) => {
        console.log('Error al guardar los datos en IndexedDB');
      };

      transaction.oncomplete = (event: Event) => {
        db.close();
      };
    };
  }

  emitirEventoActualizacion() {
    const eventData = { type: 'actualizacionDatos' };
    const messageChannel = new MessageChannel();
    messageChannel.port1.start();
    messageChannel.port2.start();
    messageChannel.port1.postMessage(eventData);
  }
}

