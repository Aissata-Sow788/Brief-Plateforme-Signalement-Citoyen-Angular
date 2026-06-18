import { Routes } from '@angular/router';
import { FormulaireIncident } from './formulaire-incident/formulaire-incident';
import { ListeIncident } from './liste-incident/liste-incident';
import { DetailIncident } from './detail-incident/detail-incident';

export const routes: Routes = [
  { path: '', component: ListeIncident },
  { path: 'formulaire', component: FormulaireIncident },
  { path: 'modifier/:id', component: FormulaireIncident }, 
  { path: 'detail/:id', component: DetailIncident }
];
