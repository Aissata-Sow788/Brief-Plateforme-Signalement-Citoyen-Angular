import { Output, EventEmitter } from '@angular/core';
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
  cpt = 0;
  textcontent="Signaler";
  indexModification!: null;

    // Catégorie sélectionnée
  categorieSelectionnee: string = 'Tous';
  
    // Liste complète (non modifiée)
  listeComplete: IncidentCarte[] = [];


  constructor(
    private router: Router,
    private incidentservice: IncidentService
  ){}

  ngOnInit(): void {

    this.listeComplete = this.incidentservice.getListe();

    this.listeincident = [...this.listeComplete];
  }

  // Aller au formulaire
  forms(){
    this.router.navigateByUrl('/formulaire')
  }

  // Badge de couleur
getCatBadge(categorie: string): string {
  const map: Record<string, string> = {
    'Urgence':       'bg-danger',
    'Voirie':        'bg-primary',
    'Éclairage':     'bg-warning text-dark',
    'Environnement': 'bg-success',
  };
  return map[categorie] ?? 'bg-secondary';
}

  // Nombre d'incidents par catégorie
countCat(cat: string): number {
  return this.listeincident.filter(i => i.categorie === cat).length;
}

  // Bouton soutenir
compter(){
    if(this.cpt < 1){
      this.cpt++;
      this.textcontent= 'Cause signler';
    }else if(this.cpt >= 1) {
      this.cpt--;
      this.textcontent= 'Signaler';
    }

  }

  // Filtrer les incidents
  filtrerCategorie(categorie: string): void {

    this.categorieSelectionnee = categorie;

    if (categorie === 'Tous') {

      this.listeincident = [...this.listeComplete];

    } else {

      this.listeincident = this.listeComplete.filter(
        incident => incident.categorie === categorie
      );

    }

  }

  // Methode supprimer
  supprimer(id: number): void {
  if (confirm('Voulez-vous vraiment supprimer cet incident ?')) {
    this.incidentservice.deleteIncident(id);
    this.listeComplete = this.incidentservice.getListe();
    this.listeincident = [...this.listeComplete];
  }
}


}

