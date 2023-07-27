import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonaListaComponent } from './persona-lista/persona-lista.component';
import { LoginComponent } from './login/login.component';
import { HospitalesComponent } from './pages/hospitales/hospitales.component';
import { DepartamentosComponent } from './pages/departamentos/departamentos.component';
import { ConsultasComponent } from './pages/consultas/consultas.component';
import { PacientesComponent } from './pages/pacientes/pacientes.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, data: { showHeader: false }},
  { path: 'personalista', component: PersonaListaComponent, canActivate: [AuthGuard] },
  { path: 'hospitales', component: HospitalesComponent, canActivate: [AuthGuard] },
  { path: 'departamentos', component: DepartamentosComponent, canActivate: [AuthGuard] },
  { path: 'consultas', component: ConsultasComponent, canActivate: [AuthGuard] },
  { path: 'pasientes', component: PacientesComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
