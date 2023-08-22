import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http'; // Importa HttpErrorResponse

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  name: string = "";
  email: string = "";
  password: string = "";
  errorMessage: string = ""; // Variable para almacenar mensajes de error
  loading: boolean = false;
  error: string = "";
  constructor(private authService: AuthService, private router: Router) {}


  register(): void {
    
    this.loading = true;
    this.authService.register(this.name, this.email, this.password)
      .subscribe(
        response => {
          window.location.href = '/login';
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
  
}
