import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [animate(300)]),
    ]),
  ],
})
export class LoginComponent {
  email: string = "";
  password: string = "";
  error: string = "";

  // Agrega propiedades para el registro
  // showLogin: boolean = true;
  showRegister: boolean = false;
  loading: boolean = false;
  registerEmail: string = "";
  registerPassword: string = "";
  registerName: string = ""; 
  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.loading = true;
    this.authService.login(this.email, this.password)
      .subscribe(
        response => {
          // Mostrar el token de acceso en la consola
          console.log('Access Token:', response.token);
          // Guardar el token de acceso en el almacenamiento local
          localStorage.setItem('access_token', response.token);
          // Redirigir al usuario a la página principal u otra página deseada
          this.router.navigate(['/personalista']);
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
  register(): void {
    // Lógica para registrar al usuario aquí
    console.log('Registrando usuario...');
    console.log('Name:', this.registerName);
    console.log('Email:', this.registerEmail);
    console.log('Password:', this.registerPassword);

    this.authService.register(this.registerName, this.registerEmail, this.registerPassword)
      .subscribe(
        response => {
          console.log('Usuario registrado exitosamente:', response);
          this.router.navigate(['/personalista']);        
        },
        error => {
          console.error('Error al registrar usuario:', error);
        }
      );
  }
  backToLogin(): void {
    this.showRegister = false;
  }
  logout(): void {
    // Remover el token de acceso del almacenamiento local
    localStorage.removeItem('access_token');
    // Redirigir al usuario a la página de inicio de sesión
    this.router.navigate(['/login']);
  }
}
