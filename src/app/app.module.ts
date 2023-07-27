import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { PersonaListaComponent } from './persona-lista/persona-lista.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModalComponent } from './DefaultsComponents/default-modal/default-modal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard'; // Importa AuthGuard aquí
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NavbarComponent } from './navbar/navbar.component';
import { HospitalesComponent } from './pages/hospitales/hospitales.component';
import { HospitalModalComponent } from './DefaultsComponents/hospital-modal/hospital-modal.component';
import { DepartamentosComponent } from './pages/departamentos/departamentos.component';
import { DepartamentosModalComponent } from './DefaultsComponents/departamentos-modal/departamentos-modal.component';
import { ConsultasModalComponent } from './DefaultsComponents/consultas-modal/consultas-modal.component';
import { PacientesModalComponent } from './DefaultsComponents/pacientes-modal/pacientes-modal.component';
import { ConsultasComponent } from './pages/consultas/consultas.component';
import { PacientesComponent } from './pages/pacientes/pacientes.component';
// Agrega los siguientes módulos de Angular Material
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [
    AppComponent,
    PersonaListaComponent,
    DefaultModalComponent,
    LoginComponent,
    NavbarComponent,
    HospitalesComponent,
    HospitalModalComponent,
    DepartamentosComponent,
    DepartamentosModalComponent,
    ConsultasModalComponent,
    PacientesModalComponent,
    ConsultasComponent,
    PacientesComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatDialogModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  providers: [
    AuthGuard, // Agrega AuthGuard como un proveedor aquí
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
