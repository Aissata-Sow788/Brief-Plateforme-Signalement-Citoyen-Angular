import { IncidentCarte } from './../services/incident.service';
import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IncidentService } from '../services/incident.service';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-liste-incident',
  imports: [NgClass, RouterLink],
  templateUrl: './liste-incident.html',
  styleUrl: './liste-incident.css',
})
export class ListeIncident implements OnInit{
  listeincident: IncidentCarte[] = [];
  indexModification!: null;

  constructor(
    private router: Router,
    private incidentservice: IncidentService
  ){}

  ngOnInit(): void {
    this.listeincident = this.incidentservice.getListe()
  }


  forms(){
    this.router.navigateByUrl('/formulaire')
  }

getCatBadge(categorie: string): string {
  const map: Record<string, string> = {
    'Urgence':       'bg-danger',
    'Voirie':        'bg-primary',
    'Éclairage':     'bg-warning text-dark',
    'Environnement': 'bg-success',
  };
  return map[categorie] ?? 'bg-secondary';
}

countCat(cat: string): number {
  return this.listeincident.filter(i => i.categorie === cat).length;
}



}

