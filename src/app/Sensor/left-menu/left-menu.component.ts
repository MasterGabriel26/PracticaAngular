import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent {
  constructor(private router: Router) {}

  logout() {
    // Agrega aquí la lógica para cerrar la sesión
    // Por ejemplo, eliminar el token de acceso y redirigir a la página de inicio de sesión
    localStorage.removeItem('access_token'); // Elimina el token de acceso
    this.router.navigate(['/login']); // Redirige a la página de inicio de sesión
  }
}
