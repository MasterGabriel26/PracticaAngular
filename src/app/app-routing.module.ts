import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonaListaComponent } from './persona-lista/persona-lista.component';
import { LoginComponent } from './login/login.component';
import { HospitalesComponent } from './pages/hospitales/hospitales.component';
import { DepartamentosComponent } from './pages/departamentos/departamentos.component';
import { ConsultasComponent } from './pages/consultas/consultas.component';
import { PacientesComponent } from './pages/pacientes/pacientes.component';
import { AuthGuard } from './auth.guard';
import { DashboardSensorsComponent } from './Sensor/dashboard-sensors/dashboard-sensors.component';
import { LeftMenuComponent } from './Sensor/left-menu/left-menu.component';
import { TemperaturaComponent } from './Sensor/temperatura/temperatura.component';
import { HumedadComponent } from './Sensor/humedad/humedad.component';
import { PrecisionComponent } from './Sensor/precision/precision.component';
import { HumoComponent } from './Sensor/humo/humo.component';
import { GasesComponent } from './Sensor/gases/gases.component';
import { MovimientoComponent } from './Sensor/movimiento/movimiento.component';
import { RuidoComponent } from './Sensor/ruido/ruido.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, data: { showHeader: false }},
  { path: 'register', component: RegisterComponent, data: { showHeader: false }},
  { path: 'personalista', component: PersonaListaComponent, canActivate: [AuthGuard] },
  { path: 'hospitales', component: HospitalesComponent, canActivate: [AuthGuard] },
  { path: 'departamentos', component: DepartamentosComponent, canActivate: [AuthGuard] },
  { path: 'consultas', component: ConsultasComponent, canActivate: [AuthGuard] },
  { path: 'pasientes', component: PacientesComponent, canActivate: [AuthGuard] },
  { path: 'dashboardSensors', component: DashboardSensorsComponent, canActivate: [AuthGuard] },
  { path: 'leftMenu', component: LeftMenuComponent, canActivate: [AuthGuard] },
  { path: 'temperatura', component: TemperaturaComponent, canActivate: [AuthGuard] },
  { path: 'humedad', component: HumedadComponent, canActivate: [AuthGuard] },
  { path: 'precision', component: PrecisionComponent, canActivate: [AuthGuard] },
  { path: 'humo', component: HumoComponent, canActivate: [AuthGuard] },
  { path: 'gases', component: GasesComponent, canActivate: [AuthGuard] },
  { path: 'movimiento', component: MovimientoComponent, canActivate: [AuthGuard] },
  { path: 'ruidos', component: RuidoComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
