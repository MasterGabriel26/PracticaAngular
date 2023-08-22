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
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardSensorsComponent } from './Sensor/dashboard-sensors/dashboard-sensors.component';
import { LeftMenuComponent } from './Sensor/left-menu/left-menu.component';
import { TemperaturaComponent } from './Sensor/temperatura/temperatura.component';
import { HumedadComponent } from './Sensor/humedad/humedad.component';
import { PrecisionComponent } from './Sensor/precision/precision.component';
import { HumoComponent } from './Sensor/humo/humo.component';
import { GasesComponent } from './Sensor/gases/gases.component';
import { MovimientoComponent } from './Sensor/movimiento/movimiento.component';
import { RuidoComponent } from './Sensor/ruido/ruido.component';
import { NgChartsModule } from 'ng2-charts';
import { DatePipe } from '@angular/common';
import { faThermometerHalf, faTint, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { RegisterComponent } from './register/register.component';
library.add(faThermometerHalf, faTint, faVolumeUp);

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
    DashboardSensorsComponent,
    LeftMenuComponent,
    TemperaturaComponent,
    HumedadComponent,
    PrecisionComponent,
    HumoComponent,
    GasesComponent,
    MovimientoComponent,
    RuidoComponent,
    RegisterComponent,
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
    ReactiveFormsModule,
    MatIconModule,
    NgChartsModule,
    FontAwesomeModule,
  ],
  providers: [
    AuthGuard, 
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
