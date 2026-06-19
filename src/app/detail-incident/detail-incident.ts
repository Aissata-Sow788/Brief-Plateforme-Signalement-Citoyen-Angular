import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IncidentCarte, IncidentService } from '../services/incident.service';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-detail-incident',
  imports: [NgClass],
  templateUrl: './detail-incident.html',
  styleUrl: './detail-incident.css',
})
export class DetailIncident implements OnInit {

  incident: IncidentCarte | undefined;

  cpt = 0;
  textcontent="Signaler";

  constructor(
    private route: ActivatedRoute,
    private incidentService: IncidentService,
    private router: Router
  ) {}

  ngOnInit(): void {

    // 1. Lire l'id dans l'URL
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(id);
  this.incident = this.incidentService.getId(id);
  this.liked = this.incidentService.estSignale(id);



    // 2. Récupérer l'incident dans le service
    this.incident = this.incidentService.getId(id);
  }
// Badge de coukeur pour les categories
getCatBadge(categorie: string): string {
  const map: Record<string, string> = {
    'Urgence':       'bg-danger',
    'Voirie':        'bg-primary',
    'Éclairage':     'bg-warning text-dark',
    'Environnement': 'bg-success',
  };
  return map[categorie] ?? 'bg-secondary';
}

liked = false;

// Compteur de soutenir cette cause

compter(): void {
  if (!this.incident) return;

  this.liked = !this.liked;
  this.incidentService.toggleSignalement(this.incident.id, this.liked);

  // Ne plus modifier signalements ici
}
// Retour a la page d'acceuil
    retour(): void {
  this.router.navigateByUrl('/');
}
}
